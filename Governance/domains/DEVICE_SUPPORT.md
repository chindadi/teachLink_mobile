# Device Support Policy

## Purpose

This policy defines which devices and operating-system versions TeachLink Mobile
supports. It gives contributors and maintainers a versioned reference for
supported tiers, testing expectations, and how support is removed.

## Scope

This policy covers the iOS and Android applications built from this repository
with Expo SDK 54 and React Native 0.81, distributed through the `development`,
`preview`, and `production` profiles in `eas.json`.

## Supported Device Tiers

- Tier 1, supported: devices running an iOS or Android version that still
  receives vendor security updates and falls within the current Expo SDK
  support window. Full functionality is expected, and defects are fixed
  through normal triage.
- Tier 2, best effort: older operating-system versions within the Expo SDK
  support window, low-memory devices, and small-screen devices. Core journeys
  such as authentication, course progress, notifications, and payments must
  remain usable, but degraded performance or reduced effects are acceptable.
- Tier 3, unsupported: end-of-life operating-system versions, rooted or
  jailbroken devices, emulators outside development use, and devices missing
  capabilities the app requires such as secure storage, camera, location, or
  push notifications. The app may install but is not supported.

## Testing Matrix

- A `development` build is smoke-tested on one Tier 1 iOS device and one
  Tier 1 Android device for install, launch, and the changed area.
- A `preview` build receives a full pass on Tier 1 devices for install,
  launch, permissions, deep links, and the intended distribution path, plus a
  core-journey sample on Tier 2 devices.
- A `production` candidate records the tested devices, operating-system
  versions, and device classes in the release issue before promotion, following
  the release checklist and the EAS build promotion path.
- A pull request records the platforms and device classes tested. A known Tier
  2 limitation is documented and assigned before merge.

## Deprecation Cadence

- Dropping a Tier 1 device class or operating-system range follows the
  deprecation policy: at least 90 calendar days of notice, a tracking issue,
  release-notes and changelog entries, and migration or support messaging.
- Removal is staged in a minor or patch release where compatible with the
  versioning policy and ships on the two-week release train unless an
  emergency exception is approved.
- Removal happens only after the notice period has elapsed, known consumers
  have migrated or confirmed no supported consumer remains, and the release
  owner approves the change.

## Ownership and Review

The team responsible for mobile platform owns this policy with the
release-management team and reviews it with Expo SDK upgrades, platform
releases, and release-pipeline changes.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when supported devices are predictable, releases are
tested against the matrix above, and support changes ship with notice,
documentation, and a verified replacement path.
