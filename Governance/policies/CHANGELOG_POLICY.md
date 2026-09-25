# Changelog Policy

## Purpose

This policy defines how TeachLink Mobile records user-relevant and operational
changes. A clear changelog helps users understand releases, helps support diagnose
issues, and gives maintainers a durable record of decisions that should not be
lost in commit history.

## Scope

This policy applies to the repository changelog and to release-note content derived
from it. It does not require an entry for internal refactors that do not affect
users, contributors, operators, or the build.

## Changelog Format

- Organize entries by released version, newest version first, using the semantic
  version and an ISO `YYYY-MM-DD` release date.
- Use the standard headings `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`,
  and `Security` when they contain entries. Keep entries short and user-readable.
- Begin each bullet with the affected scope when useful, describe the outcome, and
  link the relevant issue or pull request. Do not include exploit details,
  credentials, personal data, or unverified claims.
- Describe what changed for users and operators, not only which files or internal
  functions changed. Group related commits into one entry and preserve migration
  instructions.

## When Entries Are Required

An entry is required for:

- a user-visible feature, behavior change, or workflow change;
- a bug fix that changes expected behavior or prevents a failure;
- a security fix, once disclosure rules permit a useful description;
- a deprecation, migration requirement, or removal;
- a change to permissions, data handling, supported platforms, build or release
  behavior that operators must act on; or
- a dependency or configuration change with a material user or operational effect.

Documentation-only changes do not require an entry unless they document a released
behavior or the release owner requests one. A change that is reverted before release
does not need a changelog entry, but a later replacement must describe the final
behavior.

## Review and Ownership

The pull-request author proposes the entry with the change. The reviewer verifies
that the category, wording, links, and disclosure level are accurate. The release
owner consolidates entries into the version section and checks that the published
notes match the released artifact.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when each release tells a concise, accurate story, important
changes are easy to find, and the changelog remains safe to publish under the
project’s disclosure and deprecation processes.
