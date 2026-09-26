# Offline Data Governance

## Purpose

This policy governs what TeachLink Mobile is allowed to keep on a device, how
that data is protected at rest, and what happens when an offline write and a
server state disagree. It exists because the app is offline-first, and an
offline-first app fails in a specific way: stale data outlives the permission
that justified it, and a silent merge loses a user's work without telling them.

## Scope

This policy covers data persisted on the device by the TeachLink Mobile app on iOS
and Android: the general cache and offline stores
(`@react-native-async-storage/async-storage`, `expo-file-system`), the secure
store (`expo-secure-store`), the per-endpoint freshness configuration in
`src/config/apiCacheConfig.ts`, the queued write path, and the purge behavior on
sign-out and consent withdrawal.

This policy does not describe the technical design of the offline layer, which
lives in `docs/OFFLINE_FIRST_DATA_LAYER.md`, or the technical conflict-resolution
mechanism, which is described in `docs/conflict-resolution-strategy.md`; those are
design documents. This policy owns the limits, the protection requirement, and the
user-facing rule for conflicts. Telemetry content is governed by
[the mobile telemetry policy](MOBILE_TELEMETRY.md), permissions by
[the mobile permissions policy](MOBILE_PERMISSIONS.md), and biometric material by
[the biometric authentication policy](BIOMETRIC_AUTH.md).

## Cached-Data Limits

Caching is **allowlisted, not permissive**. Only resources named in the
allowlist may be persisted; anything not named is fetched on demand.

- **The allowlist is explicit.** Each entry records the resource, the endpoint or
  store it comes from, why it is cacheable, its maximum age, and whether it may
  be written to disk at all. A new cacheable resource is added to the allowlist
  in the same pull request that introduces it, with the same review as the code.
- **Freshness windows are concrete.** Per-endpoint freshness and eviction windows
  come from the `ttl` and `staleTtl` values in `src/config/apiCacheConfig.ts`. The
  existing defaults are 60 seconds fresh with a 5-minute stale window for
  unlisted endpoints, 30 seconds with no stale window for critical endpoints such
  as `/auth/me`, `/subscriptions`, and `/payments`, and 5 minutes fresh with a
  10-minute stale window for slow-changing catalogue endpoints. Anything that can
  go stale carries a `ttl`; anything a user could be harmed by reading stale —
  entitlement, balance, identity — carries `staleTtl === ttl`, so nothing older
  than the freshness window is ever served.
- **A maximum size is enforced.** The on-device cache is capped at 250 MB, with
  per-resource quotas for downloaded media. Downloads require explicit user
  action; nothing is downloaded in bulk by default.
- **Eviction happens under storage pressure.** Entries are evicted least-recently-
  used first when the cap or the device storage pressure threshold is reached, and
  entries past their `staleTtl` are evicted unconditionally. Storage-pressure
  handling may degrade a feature but may not block authentication, course
  progress, or account access.

Prohibitions:

- **Credentials, tokens, and secrets are never written to the general cache.** They
  belong in `expo-secure-store`, which is backed by the platform keychain and
  keystore. The app's obligation is to keep the boundary explicit: a secret in
  `AsyncStorage`, a cached file, or a cache key is a defect regardless of whether
  the device is otherwise protected.
- **Nothing is cached that the user has withdrawn consent for.** Telemetry and
  analytics consent is managed per
  [the mobile telemetry policy](MOBILE_TELEMETRY.md); data whose collection
  depends on a consent the user has withdrawn is purged, not merely stopped.
- **The cache is purged on sign-out and on consent withdrawal.** Sign-out removes
  every cached resource, cached entitlement, queued write target, and cached
  response for the account. A queued write is handled under the rule below, not
  discarded silently.
- **Cached content respects the access control of the live screen.** A cached
  resource must not be readable after the permission that gated it is revoked, and
  a screen that requires a session must not serve a cached view of its data to a
  user who has no session. Revoking a permission leaves no stale cached data from
  that permission, as required by
  [the mobile permissions policy](MOBILE_PERMISSIONS.md).

## Encryption Requirement

- **Secrets are in the secure store.** Tokens, session material, and the local
  secrets used by biometric unlock are stored in `expo-secure-store`. Biometric
  identifiers and templates are never stored by the app at all, per
  [the biometric authentication policy](BIOMETRIC_AUTH.md).
- **The general cache relies on device-level protection, and the app does not
  invent its own cryptography.** The cache in `AsyncStorage` and the app's
  documents directory are protected only to the extent the platform protects the
  application sandbox: the iOS Data Protection class set in the entitlement
  configuration and Android's file-based encryption and app-private storage. That
  is the honest extent of the guarantee, and it is not a defense against a
  compromised or rooted device.
- **Therefore the app's obligation is placement, not algorithm.** The requirement
  is that sensitive data is not placed in a weaker store than the secure one, and
  that the app does not roll its own encryption, key derivation, or cipher. Where
  app-level protection of general cache content is genuinely required, it uses
  platform-provided mechanisms under a security review — not a home-grown scheme.
- **Logs, analytics, and crash reports never contain cached user content.** Cached
  payloads, file names that identify content, and free-text values are excluded
  under the PII-exclusion rules in
  [the mobile telemetry policy](MOBILE_TELEMETRY.md). A cache key or path that
  could identify a user's content is not logged.
- **Screenshots and recent-apps previews do not expose sensitive cached screens.**
  Screens that display cached personal, financial, or credential-adjacent content
  set the platform's screen-capture and preview-redaction behavior, and a
  screenshot taken on a shared or projected screen reveals nothing that requires a
  network round trip to read.

## Sync-Conflict Rule

**Conflicts are detected and surfaced. They are never silently resolved by
last-write-wins on the client.**

The policy is deliberately one rule, and the technical mechanism for implementing
it is described in `docs/conflict-resolution-strategy.md`. What this policy owns
is which conflicts a user must decide, and what the app is forbidden to do
quietly:

| Conflict class                                   | Resolution                                |
| ------------------------------------------------ | ----------------------------------------- |
| Two edits to the same field by the same user     | May auto-merge; the newest edit wins      |
| A local edit and a remote edit to the same field | User resolves; both values are shown      |
| A local edit and a remote delete                 | User resolves; deletion is never silent   |
| Two accounts editing the same shared resource    | User resolves, and told which is which    |
| Entitlement, payment, or progress records        | Server-only; the client never writes them |

- **Classes that require user resolution are surfaced with a choice**, showing both
  values in plain language, defaulting to neither, and never presenting a
  resolution the user did not pick.
- **An offline write is queued visibly.** The queue is a surface the user can
  see, with the item, its age, and its state. It is not an invisible retry loop.
- **A queued write is not lost on sign-out.** Purge on sign-out moves unresolved
  writes to an explicit state the user is shown, rather than discarding them, and
  the app does not silently re-apply them to a later session.
- **The client does not report success for a write the server has not accepted.**
  A queued write shows as pending until the server confirms it; optimistic UI is
  not confirmation, and a rejected write returns to a visible failed state rather
  than disappearing.
- **A write queued beyond its TTL is surfaced for explicit user action.** It is
  neither silently dropped nor silently re-applied. The user chooses to re-apply
  it against current server state or to discard it.

## Ownership

The engineering lead, with the product lead, owns this policy. It is reviewed
whenever the data layer, the persistence libraries, or the cache configuration
change, and at least once per release cycle. Changes to this policy are proposed
in a pull request that touches only the `Governance/` folder.

## Success

This policy succeeds when the set of things the app keeps on a device is a
documented list with owners rather than a growing pile of cache keys, when a
secret is never found outside the secure store, when revoking a permission or
signing out leaves nothing readable behind, when logs and crash reports contain no
user content, and when a user whose offline edit was overwritten finds out from
the app rather than never.
