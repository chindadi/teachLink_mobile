# Deprecation Policy

## Purpose

This policy gives users and contributors advance notice when a TeachLink Mobile
feature, interface, API, or platform capability is scheduled for removal. It makes
deprecation predictable, gives teams time to migrate, and prevents silent breakage.

## Scope

This policy covers deprecations that affect users, public interfaces, supported
integrations, or contributor workflows. Internal refactors that have no observable
effect do not require a deprecation notice.

## Notice Period

A deprecation normally receives at least 90 calendar days of notice before removal.
A major migration, a platform-wide change, or a security-driven removal may use a
shorter period only when waiting would create greater harm; the reason, mitigation,
and approver are documented in the deprecation issue.

The notice must state what is deprecated, who is affected, the replacement or
migration path, the first supported version without it, and the planned removal
version or date. Deprecations should be staged in a minor or patch release whenever
that is compatible with the versioning policy.

## Communication Channels

Deprecations are announced through the earliest applicable channels:

- a tracking issue linked from the pull request or release issue;
- the release notes and `CHANGELOG.md`;
- migration documentation, API documentation, or contributor documentation; and
- an in-app notice or support message when a user-facing capability is affected.

Maintainers update existing communication when the scope, date, or replacement
changes. Support and downstream integrators are notified before the removal version
is prepared.

## Removal Criteria

A deprecated capability may be removed only when:

- the notice period has elapsed or a documented emergency exception is approved;
- known consumers have migrated, or an owner has confirmed that no supported
  consumer remains;
- the replacement, migration guide, tests, and user-facing messaging are current;
- release notes and documentation identify the removal; and
- the responsible maintainer and release owner approve the change.

Removal is implemented as a focused change with regression coverage where behavior
remains. Maintainers do not remove a capability solely because its deprecation
notice expired; they verify the criteria first.

## Ownership and Review

The team responsible for the affected domain owns this policy with the release
management team. The policy is reviewed after major platform or API migrations.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when users and integrators have meaningful time to migrate,
communications remain consistent, and removals happen only after adoption and
replacement conditions are verified.
