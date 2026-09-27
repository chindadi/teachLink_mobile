# Privacy Manifest Policy

## Purpose

This policy governs the privacy manifest: the versioned record of what data
TeachLink Mobile collects, why, on what basis, and for how long. It exists
because both stores treat the privacy declaration as a legal commitment, and
because a declaration that has drifted from the binary is a submission failure, a
review rejection, and a breach of user trust.

## Scope

This policy covers the data collected by the TeachLink Mobile app on iOS and
Android, the declarations derived from it, and the review that must precede a
store submission. It covers both platform regimes:

- **Apple.** The App Privacy "nutrition label" in App Store Connect, and the
  `PrivacyInfo.xcprivacy` resource in the app bundle. Apple requires
  `NSPrivacyAccessedAPITypes` entries with an approved reason code for every
  required-reason API the app or a bundled SDK calls — the categories in use in
  this app include user defaults, file timestamp attributes, system boot time,
  disk space, and active keyboard. Apple also requires that every bundled
  third-party SDK appears in the privacy label with its own data-use
  declarations, and rejects an app whose manifest and label disagree.
- **Google.** The Data safety form in Play Console, the prominent disclosure and
  consent requirements for data collected off-device or shared with third
  parties, and Play's Data safety review, which suspends undeclared or
  mis-declared apps rather than merely annotating them.

This policy does not define what the app collects today or how consent is
obtained; those live in [the mobile telemetry policy](MOBILE_TELEMETRY.md) and
[the mobile permissions policy](MOBILE_PERMISSIONS.md). It defines how they are
declared and verified.

## Required Data-Use Declarations

The manifest is the **single source of truth**. The App Store Connect privacy
label and the Play Console Data safety form are derived from it; neither is
edited independently of it.

Every data type the app or any bundled SDK collects carries a declaration that
states, in the manifest:

| Field                  | Requirement                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| Data type              | The concrete category, using the store's category vocabulary             |
| Purpose                | The user-visible feature that needs the data, named concretely           |
| Legal or consent basis | Consent, contract, or legitimate interest, and where consent is obtained |
| Linked to identity     | Whether the data can be tied back to a user, and by which identifier     |
| Tracking               | Whether the data is used for tracking, as the stores define it           |
| Retention              | A stated period, or the event that ends retention                        |
| Source                 | Collected on-device, received from the server, or from a third-party SDK |

The rules that make the manifest binding:

- **A declaration must match reality.** If the app collects a data type that the
  manifest does not declare, submission is blocked. If the manifest declares a
  data type the app no longer collects, the manifest is corrected in the same
  pull request that removed it. A stale declaration is treated exactly like a
  missing one.
- **Any divergence between the manifest and shipped behavior blocks submission.**
  Verification is against the release candidate, not against an earlier build or
  against the manifest's own history.
- **The consent model is not restated here.** The manifest uses the same
  vocabulary and the same model as [the mobile telemetry policy](MOBILE_TELEMETRY.md):
  collection is opt-in, consent is revocable from the in-app privacy settings
  screen (`PrivacySettings`, path `settings/privacy`), and personal data is
  excluded from analytics. A data type that is only collected after consent must
  say so, and the store declaration must match that conditional behaviour.
- **Third-party SDKs are declared individually.** Every bundled dependency that
  collects data — including crash reporting, push notifications, device and
  network state, and any analytics SDK — appears in the manifest with its data
  types and its purposes, whether or not the app configures it directly.
- **Required-reason APIs are tracked with the manifest.** Each
  `NSPrivacyAccessedAPITypes` category the app uses is recorded with the reason
  code and a one-line justification, so the reason survives a dependency bump that
  changes the call site.

## Update Process

A declaration change is **triggered** by any of the following, whether or not the
triggering change was framed as a data change:

- a change in what data is collected, or in the purpose a data type serves;
- a new third-party SDK, or a version bump that changes a bundled SDK's data use;
- a new runtime or install-time permission, per
  [the mobile permissions policy](MOBILE_PERMISSIONS.md);
- a change to a retention period;
- a change to the consent flow or to the platforms or SDK versions the manifest
  describes.

The process:

1. **The manifest change and the code change land together**, in the same pull
   request, or in a linked pair where the data change cannot ship alone. A pull
   request that changes collection without a manifest change is not completable.
2. **CI review.** Adding a dependency or adding a permission requires a
   corresponding manifest update, and the review step checks for that update the
   way [the approval requirements](../policies/APPROVAL_REQUIREMENTS.md) already
   require a check for security-sensitive changes. A new dependency that ships
   with an undeclared data use fails the review.
3. **Version and effective date.** The manifest carries a version and an effective
   date, is versioned with the repository like every other governance document, and
   its change log records what was declared, what was removed, and why.
4. **Store forms are regenerated, not hand-edited.** Any divergence between the
   manifest version recorded in the release issue and the version submitted to a
   store is a submission blocker.

## Review Before Submission

Privacy verification is both a **merge gate** and a **release gate**.

Merge gate:

- Any pull request that changes collection, adds an SDK, adds a permission, or
  changes retention requires the manifest update in the same change and one
  reviewer from the owning role. A data type in a sensitive category — precise
  location, contacts, health or fitness, financial information, credentials,
  browsing or search history, or anything used for tracking — additionally requires
  `security-officer` review before merge.

Release gate:

- The manifest is **re-verified against the release candidate** before submission.
  A verification carried out against an earlier build does not carry over; the
  candidate is inspected again, including the bundled SDK list and the resolved
  `PrivacyInfo.xcprivacy` in the built artifact.
- The [release checklist template](../templates/RELEASE_CHECKLIST.md) records
  **who verified the manifest and when**, the manifest version verified, and the
  store forms derived from it. A release with no named verifier is not
  submittable.
- The confirming role is the `security-officer` for sensitive categories and the
  privacy/product lead otherwise, as recorded in
  [the release sign-off gates](APP_STORE_RELEASE.md).
- **A store rejection for privacy reasons is a release blocker.** The release is
  held, the manifest and the shipped behavior are reconciled, and the rejection is
  handled through the process in [the app store release policy](APP_STORE_RELEASE.md).
  A rejection is not waived on the basis that the fix will ship in the next
  version.

## Ownership

The `security-officer`, with the privacy and product lead, owns this policy. It is
reviewed before every release and whenever the app adds data collection, a
third-party SDK, or a permission. Changes to this policy are proposed in a pull
request that touches only the `Governance/` folder.

## Success

This policy succeeds when the App Store privacy label, the Play Data safety form,
and the bundled `PrivacyInfo.xcprivacy` can each be reproduced from the manifest
in the repository, when a change to collection cannot merge without a declaration
change, when the release checklist names the person who verified the manifest
against the release candidate, and when no privacy-related store rejection is
attributed to a declaration the team had not updated.
