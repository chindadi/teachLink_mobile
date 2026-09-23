# Mobile Feature-Flag Governance Policy

## Purpose

This policy defines how feature flags are named, owned, and retired in TeachLink
Mobile. It keeps flag-driven releases controllable, alert to store-review
considerations, and free of dead flags.

## Scope

This policy covers feature flags in the TeachLink Mobile application and the
infrastructure that serves them.

## Flag Naming and Ownership

- Feature flags must follow a clear, consistent naming convention that makes the
  feature and its owner discoverable.
- Every flag must have an assigned owner responsible for its lifecycle, including
  rollout decisions, monitoring, and eventual removal.
- Flags must be registered in the versioned flag inventory so their purpose and
  owner are visible to contributors.
- New flags must not gate features that are required for the release to function
  safely unless there is a documented rollback reason.

## Store-Review Considerations

- Flags must not toggle compliance-critical behavior in a way that could alter
  platform-reviewed content without review.
- Any flag that can change the user experience in a way relevant to app store
  review (for example, content, permissions, or data disclosure) must be documented
  and considered before rollout.
- Remote flags must not expose functionality that store guidelines require to be
  reviewed and present at submission.

## Cleanup Deadline

- Flags must be removed once the feature is fully rolled out and stable.
- A cleanup deadline is set at flag creation time. Flags past their deadline are
  reviewed and either renamed, repurposed, or removed.
- Dead and fully-rolled-out flags must be removed from code and from the flag
  inventory to prevent config rot.
- Flag removal is a normal code change and follows project standards, including
  the relevant tests.

## Ownership and Review

- The team responsible for release management owns this policy.
- The flag inventory is audited on a regular cadence to confirm ownership,
  deadlines, and cleanup are up to date.
- Changes to this policy are proposed in a pull request that touches only the
  `Governance/` folder.

## Success

This policy succeeds when flags are named and owned consistently, store-review
risk is understood before rollout, and flags are removed on schedule.