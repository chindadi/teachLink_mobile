# App Store Metadata Governance Policy

## Purpose

This policy governs the store listings for TeachLink Mobile: who owns the
listings, how localizations of a listing are maintained, and how a metadata
update is reviewed before it is published. Listing metadata — title, subtitle,
description, keywords, screenshots, preview media, category, rating, privacy
declarations, and release notes — is what users read before installing and what
the stores review. It is versioned with the repository like every other
governance document, so an unreviewed or inaccurate listing is a governance
failure, not a typo.

## Scope

This policy covers:

- all customer-facing metadata fields in the Google Play Console and App Store
  Connect listings for TeachLink Mobile;
- every published localization of those fields;
- screenshots, icons, and preview media attached to a listing;
- store release notes, content-rating questionnaire answers, category
  selections, and the privacy/data-safety declarations that accompany a
  listing;
- the review required before any of the above is published or changed.

It excludes: version numbers and build numbers (see
`Governance/domains/APP_VERSION_BUMP.md`), signing and submission mechanics
(see `Governance/domains/APP_SIGNING_KEYS.md`), and the rollout of an uploaded
binary (see `Governance/domains/APP_STORE_RELEASE.md` and
`Governance/domains/PLAY_STORE_RELEASE.md`).

## Listing Ownership

- Listings are jointly owned by the **Release Manager** and the **Community
  Manager**: the Release Manager is accountable for accuracy and release
  alignment, and the Community Manager drafts and maintains the customer-facing
  copy and assets, consistent with the release-artifact ownership in
  `Governance/roles/RELEASE_MANAGER.md`.
- Only named maintainers with Play Console or App Store Connect access may edit
  a listing. Access is least-privilege, granted by the Release Manager, and
  reviewed when the release team changes.
- Every field has a single accountable owner at any time. Screenshots and
  preview media belong to the Community Manager; store copy belongs to the
  Community Manager with the Docs Lead as copy reviewer; privacy and data-safety
  declarations are reviewed with the Security Officer before publication.
- The canonical text for a release's listing changes is recorded in the release
  issue or pull request before it is typed into a console, so the published
  listing can always be traced to an approved source.
- Listings must not claim features, permissions, data collection, or platform
  support that the released build does not have. Screenshots and preview media
  must show the interface of the release they accompany.
- Privacy declarations, the data-safety form, and the linked privacy policy
  must agree with `Governance/domains/PRIVACY_MANIFEST.md` and the shipped app.

## Localization Rule

- English (`en-US`) is the source locale. It is written and reviewed first, and
  every other locale is a faithful translation of the approved source copy for
  the same release.
- The app ships in EN, ES, FR, PT, ZH, and AR (see `Governance/SCOPE.md`). A
  published listing must not advertise support the app does not have, and each
  of these locales must have complete listing metadata for any release that is
  published for them.
- No locale is published from raw machine translation. Machine output may be
  used as a draft, but a human reviewer who reads both the source and the
  translation must approve it — the Docs Lead coordinates translation review per
  `Governance/roles/DOCS_LEAD.md`.
- Localizations move together: when listing fields change, every published
  locale is updated in the same change. A locale is never left describing an
  older version of the app than the source locale.
- Placeholder, half-finished, or untranslated text must never be published. If a
  locale cannot be maintained, it is deliberately removed or allowed to fall
  back to the source locale, and that decision is recorded in the release issue.
- Screenshots and preview media are localized per language, or shared only when
  they are language-neutral. A single listing must not mix languages within one
  locale.
- If a translation is disputed or wrong, the locale is reverted to the last
  approved copy while the correction is reviewed; the listing does not stay
  published with a known-bad translation.

## Update Review

Every metadata update — including a one-word copy fix — follows the same review
before publication:

1. **Propose.** Open an issue or pull request that lists each field to change,
   the exact new value per affected locale, the assets involved, and the reason.
   Release-tied changes are attached to the release issue.
2. **Review.** The Docs Lead (or delegate) reviews copy and translations; the
   Community Manager confirms assets match the current build; the Security
   Officer reviews any change to privacy, data-safety, permissions, or
   content-rating answers.
3. **Approve.** The Release Manager approves the change for publication. The
   platform reviewer confirms the store metadata gate in
   `Governance/templates/RELEASE_CHECKLIST.md` before a release ships.
4. **Publish.** A listing owner with console access publishes exactly the
   approved values — no field is edited "while we are in there".
5. **Verify.** Within one business day, the publisher confirms the live listing
   in every affected locale, records the publication date and link in the
   issue, and corrects or reverts anything the store rendered differently than
   approved.

Exceptions are narrow: a legally or privacy-required correction (a broken
privacy-policy link, a required disclosure) may be published immediately by the
Community Manager or Release Manager, and is recorded and reviewed
retroactively within one business day.

## Ownership and Review

The release-management team owns this policy. The Release Manager and Community
Manager maintain it alongside `Governance/domains/APP_STORE_RELEASE.md`, and
review it whenever the set of supported locales, the store consoles, or the
translation workflow changes.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when every store listing has an accountable owner, every
published locale says the same true thing about the current release, and no
metadata change reaches users without a recorded proposal, review, approval,
and post-publication verification.

## Related Documents

- App Store release policy: `Governance/domains/APP_STORE_RELEASE.md`
- Play Store release policy: `Governance/domains/PLAY_STORE_RELEASE.md`
- Release checklist: `Governance/templates/RELEASE_CHECKLIST.md`
- Release Manager role: `Governance/roles/RELEASE_MANAGER.md`
- Community Manager role: `Governance/roles/COMMUNITY_MANAGER.md`
- Docs Lead role: `Governance/roles/DOCS_LEAD.md`
- Privacy manifest: `Governance/domains/PRIVACY_MANIFEST.md`
