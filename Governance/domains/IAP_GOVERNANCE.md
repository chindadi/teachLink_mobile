# In-App Purchase Governance

## Purpose

This policy governs how TeachLink Mobile introduces, prices, validates, and
revokes in-app purchases. It exists because every purchase surface is a
financial surface: it takes user money, it hands out entitlements, and a mistake
in any of the three is visible to the user and to the store reviewer. The policy
is written as a contract that binds the first shipped purchase surface and every
change after it.

## Scope

This policy covers any in-app purchase or subscription surface in the
TeachLink Mobile app on iOS and Android: the product catalogue, the purchase and
restore flows in `src/services/mobilePayments.ts` and
`src/hooks/useInAppPurchase.ts`, the plan surfaces in
`src/components/mobile/subscription/`, server-side receipt validation, and the
handling of refunds and revocations.

No purchase surface ships today. The client purchase module exists in the
repository, together with a plan catalogue, a call to the server validation
endpoint `/api/payments/validate-receipt`, and its tests, but it is not
reachable from the navigation graph and no store product is live. The prices and
product identifiers hard-coded in the client catalogue are development placeholders
and are not an authoritative price list. This policy therefore binds the first
release that makes a purchase reachable, not current behavior.

This policy does not cover the technical design of receipt validation, which is
documented in `docs/payments/receipt-validation-flow.md`; the pricing and
entitlement decisions are owned here. Store submission and rollback are covered by
[the app store release policy](APP_STORE_RELEASE.md), and dependency and
permission review is covered by
[the mobile permissions policy](MOBILE_PERMISSIONS.md).

## Pricing-Change Approval

A price change is store-visible and user-affecting. It is treated as a release
change, not a configuration tweak, and requires all of the following before a
build carrying it is submitted to either store.

- **A versioned pricing record.** Each product identifier in the catalogue
  carries a record with the product identifier, tier, currency, price, billing
  period, the store it was set in, and the version of the app in which the price
  first shipped. The record is updated in the same pull request as the change.
- **A stated effective date.** The record names the date the new price takes
  effect. The date is not left to the store's scheduling behaviour.
- **Notice in the changelog.** The change is recorded in `CHANGELOG.md` under the
  version that introduces it, as required by
  [the changelog policy](../policies/CHANGELOG_POLICY.md). A price change with no
  changelog entry is not completable.
- **Approval by the release owner and the product/engineering lead.** Both
  approvals are recorded in the release issue. This is the security-change tier
  of [the approval requirements](../policies/APPROVAL_REQUIREMENTS.md): two
  maintainers plus a security review, because a price change alters what users
  are charged.

Two limits are absolute:

- A price change **never applies retroactively** to an order the user has already
  placed. A transaction is priced by the price in force when it was created.
- A price change **never applies silently** to a subscription in its current
  billing period. An existing subscriber keeps the price they joined at until the
  period they paid for ends, and is notified in-app before the next period bills
  at the new price. The platform's own price-change consent prompt does not
  discharge this obligation; the app states the change in its own surface.

Withdrawing a product, ending a trial early, or introducing a new tier follows the
same approval ladder as a price change. Only the release owner and the
product/engineering lead may change the thresholds in this section, and the change
is recorded in the pricing record's change log.

## Receipt-Validation Rule

**A client-supplied receipt is never trusted.** This is the load-bearing rule of
this policy.

- Validation is **server-side**. The client posts the receipt to the
  `/api/payments/validate-receipt` endpoint; the server verifies it against the
  platform — the Apple App Store Server API or the Google Play Developer API — and
  returns the authoritative entitlement.
- The app **gates entitlement on the server response**, never on a local parse of
  the receipt, never on a locally cached price, and never on the return value of
  the store purchase call. A purchase that the server has not confirmed is not a
  purchase, and the app must not unlock the tier it names.
- Validation is **idempotent per transaction identifier**. The same transaction
  validated twice yields the same entitlement and does not extend a period, grant
  a second entitlement, or create a second record. Retries after a network
  failure are safe by construction.
- **A receipt already consumed by another device or account is rejected.** The
  server is the single authority on whether a transaction is unclaimed; a
  conflicting claim returns a rejection rather than granting a second entitlement.
  Unclaimed-purchase recovery is a server decision surfaced in the app, not a
  client-side override.
- **Offline use of a previously validated entitlement is bounded.** A validation
  the app has already received may be honoured while the device is offline, but
  only for the remainder of the validated period, and only until the offline
  horizon defined in [the offline data policy](OFFLINE_DATA.md) is reached. After
  that the app must go online and re-validate rather than extend on its own
  authority.
- A validation that fails, times out, or returns a server error leaves the user
  on the previous tier. The app must never treat an error as a grant.

The server also owns the platform secrets used for validation. They are never
present in the app bundle, and this is checked as part of the security gate in
[the app store release policy](APP_STORE_RELEASE.md).

## Refund Handling

Refunds are initiated on the platform, by the user, by a store reviewer, or by
the project's own support path in the store console. The app observes the outcome
and applies it. It does not adjudicate refund disputes, and it defers to platform
refund policy and to consumer law in the user's jurisdiction.

- The app **observes and applies the revocation**. Entitlement state is driven by
  server confirmation of the platform's outcome, not by an in-app request.
- The app **must not re-grant entitlement** after a revocation. A restore attempt
  that returns a refunded transaction leaves the user on the free tier.
- **Revocation may arrive outside an active session.** The app checks entitlement
  state on launch, on resume, and before any tier-gated action, so a revocation
  recorded while the app was closed is applied on the next entry rather than at
  the next purchase.
- The app **must not attempt to reverse a refund through the API**. No client code
  calls a refund, chargeback, or dispute endpoint. A user who believes a refund
  was mishandled is directed to store support.
- A revocation **clears the local cache rather than waiting for a refresh**. The
  cached tier, the cached purchase history, and any downloaded content gated on
  the revoked entitlement are removed when the revocation is known, under the
  purge rules in [the offline data policy](OFFLINE_DATA.md).
- Refund and dispute handling in the store console is recorded in the release
  issue when a release introduces a paid product, so the reviewer can see who may
  issue a refund and on what basis.

## Ownership

The release owner and the engineering lead own this policy and review it in every
release cycle, and whenever a paid product is added, repriced, or withdrawn.
Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when the first purchase surface reaches the stores with a
versioned pricing record and a changelog notice behind every price, when no
entitlement in the app exists without a server-confirmed validation, when a
refund or a duplicate claim cannot produce a second entitlement, and when a
revocation is reflected on the user's device without them asking for a refresh.
