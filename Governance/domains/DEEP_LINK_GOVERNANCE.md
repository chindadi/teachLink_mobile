# Deep Link Governance

## Purpose

This policy governs the link schemes, universal-link hosts, and screen paths that
TeachLink Mobile accepts, and the validation every incoming link must pass before
it reaches navigation. It exists because a deep link is an entry point the app
cannot authenticate: anyone who can get a URL in front of a user can attempt to
drive the app to a screen. The policy makes that entry point governed and
validated rather than ad hoc.

## Scope

This policy covers every way a link can enter the app on iOS and Android: the
`teachlink://` custom scheme, the universal links served from
`https://teachlink.com` and `https://www.teachlink.com`, and the links the app
builds itself from push-notification payloads. It covers the registration of
schemes, hosts, and paths in `src/navigation/linking.ts`, the
`apple-app-site-association` file at the repository root, and the validation and
review that apply to a change in any of them.

This policy does not cover the pre-warming and rollout strategy for link
handling, which is described in `docs/DEEP_LINKING_STRATEGY.md`; that document is
design, not governance. Permissions reached through a link are covered by
[the mobile permissions policy](MOBILE_PERMISSIONS.md), and biometric or session
protected surfaces are covered by
[the biometric authentication policy](BIOMETRIC_AUTH.md).

The registered surface today is the prefixes list in
`src/navigation/linking.ts` — the Expo runtime prefix, `teachlink://`,
`https://teachlink.com`, and `https://www.teachlink.com` — resolved against the
`SCREEN_PATHS` table in the same file.

## Registration of Link Schemes

Adding a scheme, a host, or a path is a governed change. It is a routing change
with a security surface, and it is reviewed like one.

- **New custom schemes are registered in the native app configuration for both
  platforms**, in the `scheme` entry that the iOS and Android projects are
  generated from, and not only in the JavaScript prefix list. A scheme that is
  added to `prefixes` but not to the native configuration does not work in a
  release build and is treated as an incomplete change.
- **A new custom scheme requires a written justification against the existing
  one.** The `teachlink://` scheme is the app's own; a second scheme is only
  justified where a partner or an operating-system integration requires a
  distinct identifier that cannot be served as a universal link.
- **Universal-link hosts are added in two places in the same change**: the
  `prefixes` list in `src/navigation/linking.ts`, **and** the hosted association
  files. For iOS that is `apple-app-site-association` served from the domain root
  over HTTPS with the correct content type; for Android it is `assetlinks.json`
  served from the same root listing the app's package name and signing
  certificate fingerprints. A host in the prefix list with no association file is
  not a universal link; it silently falls back to the browser.
- **The hosted association file is verified to actually cover the new path.**
  Adding `/courses/:id` to `SCREEN_PATHS` is not enough if the association file's
  path list does not match it — a `*` suffix in the existing file is not a blanket
  permission to widen it. The verifier checks the served file over HTTPS, not a
  local copy.
- **A new path is added to the `SCREEN_PATHS` table.** Paths are not handled ad
  hoc inside a navigation or notification listener, and no listener may navigate
  to a screen that is not in the table. The table is the single registry of what
  a link may reach, and it stays aligned with the root stack's parameter list.
- **An associated-domain change requires a rebuild and on-device verification.**
  Entitlement and association changes do not take effect through an over-the-air
  update, and are verified on a real device or simulator for both platforms before
  release.

A removal follows the same path in reverse: the prefix, the path entry, and the
hosted association entries are withdrawn together.

## Validation Requirement

**An incoming deep link is untrusted input and is never an authorization.** This is
the security core of the policy.

Before a link reaches navigation, the app validates:

- **Shape.** The URL parses, the scheme is one it accepts, and the path matches
  the grammar of a registered entry in `SCREEN_PATHS`.
- **Scheme and host allowlist.** Only the registered schemes and hosts resolve.
  A look-alike host, a subdomain, an IP address, a userinfo-prefixed URL, and a
  non-HTTPS universal link are all rejected.
- **Target screen.** The resolved screen must exist in the `SCREEN_PATHS` table
  for the authenticated stack. A path that maps to a screen that does not exist,
  or that is not routable in the current navigator state, does not navigate.
- **Every path parameter**, for type, length, and encoding, before it is passed
  to a screen. Identifiers are checked against the format the API accepts and
  against a maximum length; a parameter is never interpolated into a query, a
  filesystem path, or a log line in raw form.

Behavioural rules:

- **Unknown or unparseable links fall through to a safe default** — the app's
  normal entry point — rather than throwing, crashing, or leaving the user on a
  blank screen. Malformed input is a routine occurrence, not an error state.
- **A link can never silently grant access.** It cannot bypass a permission gate,
  pre-authorize a capability, or act as a substitute for the session check. An
  unauthenticated user following any link, to any screen, lands on authentication
  first and is returned to the requested destination afterwards, if that
  destination is one they may see.
- **A link can never reach a screen the user has no session for.** Authorization
  is decided by the app against the live session, not by the presence of an
  identifier in the URL. A link naming another user's resource resolves to the
  caller's own resource or to a not-found state, never to the named one.
- **Screens that carry a payment or credential surface are not link-reachable
  without the same in-app confirmation** the user would perform by navigating
  there directly.
- **A new path ships with a test.** The route's resolution, its parameter
  validation, and its unknown-path fallback are covered in the existing linking
  suites: `src/__tests__/linkingConfig.test.ts` for the prefix and screen
  configuration, and `src/__tests__/utils/linkParser.test.ts` for parsing and
  parameter handling. A new path with no case in either suite is not completable.

## Security Review

- The `security-officer` reviews any change that can **cross an authorization
  boundary**, reach a **payment or credential screen**, or **carry an identifier**
  that the app will use to look something up. These changes are not completable
  without that review, and they follow the security-change tier of
  [the approval requirements](../policies/APPROVAL_REQUIREMENTS.md).
- A change that adds a host, a scheme, or a wildcard in the hosted association
  file requires the same review, because the hosted file decides which web
  content may claim the app's identity.
- **The notification-derived path carries the same validation.** The app builds
  links from push-notification payloads in `src/navigation/linking.ts`, and a
  notification payload is attacker-influenced input: it can be malformed, and its
  identifiers are not trusted merely because they arrived through a channel the
  app sends. A notification-derived link is validated exactly as an externally
  arriving one, resolves only to an entry in `SCREEN_PATHS`, and its payload is
  type-checked before use. A notification type with no navigable target resolves
  to the safe default.
- Where a link can reach a protected surface, the screen's own gate still
  applies on arrival: permissions per
  [the mobile permissions policy](MOBILE_PERMISSIONS.md), and biometric or
  session checks per [the biometric authentication policy](BIOMETRIC_AUTH.md). The
  link does not satisfy them.
- Rejections are recorded, not silently dropped: a link that fails validation
  produces a sanitised log entry with no user-supplied payload, consistent with
  the exclusion rules in [the mobile telemetry policy](MOBILE_TELEMETRY.md).

## Ownership

The engineering lead, with the `security-officer`, owns this policy. It is
reviewed whenever the routing table, the prefix list, or the hosted association
files change, and at least once per release cycle. Changes to this policy are
proposed in a pull request that touches only the `Governance/` folder.

## Success

This policy succeeds when every scheme, host, and path the app answers is
registered in `SCREEN_PATHS` and covered by a test in the linking suites, when a
hosted association file and the prefix list never disagree, when a malformed or
unknown link lands the user on a working screen instead of an error, and when no
link has ever been the reason a user reached a screen they were not authorized
to see.
