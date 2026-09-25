# EAS Build Governance

## Purpose

This document defines ownership and controls for Expo Application Services (EAS)
builds of TeachLink Mobile. Build profiles determine what users and store reviewers
receive, so changes to them require deliberate review, traceable configuration, and
a controlled promotion path.

## Scope

This policy covers `eas.json`, build and submit profiles, build environments,
signing and distribution settings, and the artifacts produced by EAS jobs.

## Build-Profile Ownership

- The release-management team owns the `development`, `preview`, and `production`
  profile definitions and their intended audiences.
- Mobile platform maintainers review changes that affect native projects, SDK
  versions, signing, permissions, entitlements, or store submission settings.
- A profile change includes the reason, affected platforms, validation plan, and
  rollback or compatibility notes in the pull request.
- Profile names and their environment semantics are not changed casually. Renaming
  a profile requires a migration plan for every workflow and developer using it.

## Secrets Handling

- Secrets belong in EAS environment variables or the organization’s secret store,
  scoped to the narrowest environment that needs them. They must never be committed
  to `eas.json`, source files, logs, build artifacts, screenshots, or pull requests.
- CI and local commands use placeholders or injected environment values; examples
  must be clearly marked and non-sensitive.
- Contributors may request access but may not print, copy, or share secret values.
  A suspected exposure is rotated or revoked immediately and handled through the
  security-disclosure process.
- Build logs and artifacts are reviewed for accidental secret output before sharing
  them. Service-account keys and signing credentials are stored only in the approved
  secure location and are not committed to the repository.

## Promotion Path

1. A contributor changes the profile and verifies the configuration with the
   repository’s validation and build checks.
2. A `development` build runs the change for maintainers and records the commit,
   profile, platforms, and result.
3. A `preview` build is produced and checked by the release owner for install,
   launch, permissions, deep links, and the intended internal distribution path.
4. A `production` build is promoted only after the release checklist, required
   sign-offs, and store metadata gates pass. The promoted artifact must correspond
   to the reviewed commit and profile.
5. Failed or unexpected production behavior is stopped or rolled back using the
   documented release process; maintainers do not patch a build in place.

## Ownership and Review

The release-management team owns this governance document and reviews it whenever
EAS profiles, native configuration, or the release pipeline changes.

Changes to this document are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This governance succeeds when every artifact comes from a reviewed profile, secrets
remain controlled, and builds move through development, preview, and production with
a traceable promotion decision.
