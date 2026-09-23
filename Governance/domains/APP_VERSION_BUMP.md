# App Version Bump Policy

## Purpose

This policy defines how app version numbers are set and bumped for TeachLink
Mobile. Consistent versioning keeps releases understandable, builds auditable, and
store submissions predictable.

## Scope

This policy covers the build number and version name used for TeachLink Mobile
builds and releases.

## Build-Number Rule

- The build number must increase monotonically for every build that is sent to any
  app store or distribution channel.
- The build number is managed by the release pipeline and must not be manually
  edited without a documented reason.
- The build number must be reproducible: rerunning the same release pipeline for
  the same commit must not produce a different build number than the original run.

## Version-Name Rule

- The version name follows a semantic versioning scheme: major, minor, and patch.
- A change in the version name must be approved as part of the release and must
  reflect the nature of the change (breaking, feature, or fix).
- The version name must be consistent across all release artifacts and store
  listings for the same release.

## Sign-Off

- A release only ships with the required sign-off from the responsible
  maintainers.
- The sign-off confirms that the version name and build number are correct, that
  platform requirements are met, and that the release notes match the change.
- Release pipeline failures related to versioning stop the release until the
  version metadata is corrected and re-signed.

## Ownership

- The team responsible for release management owns this policy.
- Changes to this policy are proposed in a pull request that touches only the
  `Governance/` folder.

## Success

This policy succeeds when build numbers and version names are always unique,
correct, and consistent, and when sign-off is recorded for every release.