# Versioning Policy

## Purpose

This policy defines how TeachLink Mobile versions are named and changed. Consistent
versioning makes releases traceable, helps users understand the impact of an update,
and keeps store submissions and support discussions unambiguous.

## Scope

This policy covers the user-facing version name, the build number, and pre-release
identifiers for every TeachLink Mobile release.

## Semantic Versioning Rules

The stable version name uses `MAJOR.MINOR.PATCH` semantic versioning:

- **MAJOR** increases when a release contains an incompatible change to an existing
  public contract, stored data, permissions, or user workflow. A migration or an
  explicit compatibility plan is required.
- **MINOR** increases when functionality is added in a backward-compatible way, or
  when an existing behavior is expanded without breaking supported integrations.
- **PATCH** increases for backward-compatible bug fixes, security fixes, and changes
  that do not add a feature or alter a public contract.

A release must not contain changes from more than one version category. If a change
would require multiple bumps, maintainers must split it into separately releasable
changes or choose the highest applicable bump and document the reason.

## Build Numbers

The build number is an independent, monotonically increasing integer. It must be
unique for every artifact submitted to an app store or distribution channel, even
when the user-facing version name is unchanged. The release pipeline owns build-number
assignment, and contributors must not edit it manually without a documented release
decision.

## Pre-Release Conventions

Pre-release versions use the semantic-version suffix `-alpha.N`, `-beta.N`, or
`-rc.N`, where `N` starts at 1 and increases for each subsequent build in that stage.

- `alpha` is for internal validation and may contain incomplete or unstable features.
- `beta` is feature-complete for the planned release and is intended for broader
  validation.
- `rc` is a release candidate that has passed the required release gates and is
  awaiting final approval or store distribution.
- A pre-release is never advertised as a stable release.
- Promotion from `alpha` to `beta` or `beta` to `rc` does not reset the numeric build
  number.

## Ownership and Review

The team responsible for release management owns this policy. Version changes are
reviewed with the pull request that changes the corresponding metadata, and a release
is not published until the version name, build number, and release notes agree.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when every release has an accurate semantic version, a unique
build number, and clear pre-release status that users and maintainers can interpret
without relying on private context.
