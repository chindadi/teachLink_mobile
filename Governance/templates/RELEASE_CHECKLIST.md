# Release Checklist

## Purpose

This checklist makes the release process repeatable and gives reviewers a clear record
of the evidence required to promote a TeachLink Mobile build. It applies to every
official app-store or distribution-channel release.

## Before the Release

- [ ] The release issue names the target version, commit, supported platforms, and
      release date.
- [ ] The version name and build number follow the [versioning policy](../policies/VERSIONING.md)
      and are consistent across release artifacts and store metadata.
- [ ] The candidate branch contains only the changes intended for the release and is
      based on the latest `main` at the time the candidate is cut.
- [ ] Required automated checks, unit tests, type checks, lint checks, and platform
      builds have passed, or any approved exception is recorded.
- [ ] Release notes, screenshots or store listing changes, support notes, and
      migration guidance are ready for the target platforms.
- [ ] Security and privacy reviewers have assessed credentials, permissions, data
      handling, deep links, and third-party services affected by the candidate.
- [ ] Rollback or hotfix steps, monitoring queries, and the release owner are named
      in the release issue.

## Sign-Off Gates

A release is approved only when all required gates are recorded in the release issue:

- **Release owner:** confirms scope, version metadata, artifacts, and release notes.
- **Code owner or delegate:** confirms the intended changes and relevant tests.
- **Security or privacy reviewer:** confirms that the release introduces no
  unaccepted security or privacy risk.
- **Platform reviewer:** confirms that iOS and Android requirements, signing, and
  store metadata are satisfied.

A failed or unavailable gate blocks promotion. The release owner may document an
exception for a low-risk operational change, but may not bypass a security,
privacy, data-integrity, or build gate.

## After the Release

- [ ] Promote the exact reviewed artifacts and verify their version and build number.
- [ ] Monitor release health, crash rates, authentication, sync, and critical user
      journeys during the agreed observation window.
- [ ] Publish release notes and notify affected users or support channels when
      behavior or action is required.
- [ ] Record the release outcome, links to artifacts, approvals, follow-up work, and
      any rollback decision in the release issue.
- [ ] Confirm that the next release train and any maintenance actions are documented.

## Ownership and Review

The team responsible for release management owns this checklist. It is reviewed after
each release and amended through a pull request that touches only the `Governance/`
folder.

## Success

This checklist succeeds when every release has traceable approvals, the published
artifact matches the reviewed candidate, and post-release issues are captured before
the next train begins.
