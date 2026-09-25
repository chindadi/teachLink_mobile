# Contributor and Release Sign-off Policy

## Purpose

This policy defines how the project records contributor sign-off on changes and how
releases obtain sign-off before they ship. It makes authorship and release approval
auditable and predictable.

## Scope

This policy applies to every change merged into the repository and to every release
published from `main`.

## Sign-Off Mechanism

Every commit merged into the repository carries a sign-off line in the developer
certificate-of-origin style:

`Signed-off-by: Name <email>`

A sign-off certifies that the author has the right to contribute the change and
agrees to the project's contribution terms. The `-s` flag in the project's commit
tooling appends the line automatically. Commits without a sign-off line are not
merged.

## Records Kept

The sign-off line is kept as part of the commit record and is therefore permanent,
searchable, and attributable to the named contributor. The public contribution
history is the record of record; no separate private sign-off log is kept.

## Enforcement in CI

CI checks that every commit in a pull request carries a valid `Signed-off-by` line
that matches the commit author. A missing or mismatched line fails the change and
the contributor is asked to sign off. Repository administrators are alerted to any
attempt to merge unsigned work.

## Release Sign-Off Process

A release proceeds only after the sign-off checklist for that release is complete.

### Required Sign-Offs

A release requires sign-off from:

- the engineering lead that the release candidate meets the quality and performance
  standards;
- the release owner that the release notes, version, and artifacts are complete;
- the security lead that no open critical or high-severity security findings block
  the release; and
- the product lead that the release scope matches the intended user impact.

Each sign-off is recorded in the release checklist with a name, role, and date.

### Gating Checks

The final checks gate the release: all tests green on the release candidate, store
submission assets validated, the changelog updated, and telemetry and crash-free
thresholds within policy. If any gate fails, the release is held and the owning lead
documents the deviation.

### Final Authority

The release owner has final authority. A release is published only when the release
owner accepts the sign-offs and gates; the owner may approve a documented exception.
No other escalation overrides the recorded sign-offs without reopening the release
checklist.

## Ownership

The maintainers own this policy. The release owner and engineering lead review it
each release cycle. Changes are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when every merged change is legitimately signed, releases ship
with complete, recorded approvals, and sign-off disputes are effectively
non-existent.