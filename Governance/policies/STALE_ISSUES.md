# Stale Issue Policy

## Purpose

This policy keeps the TeachLink Mobile issue tracker focused and makes inactivity
visible and fair. It defines when an issue is considered stale, how maintainers
notify participants, and when an issue may be closed or reopened.

## Scope

This policy applies to open issues that request a change, answer a question, or
report a defect. Pull requests, security reports, and issues with an active
incident or release block are managed under their relevant process and are not
closed by this policy alone.

## Staleness Threshold

An issue becomes stale after 90 consecutive days without a maintainer or contributor
update. A comment that only repeats an old status update does not reset the clock.
An issue is exempt from automatic closing when it has an assigned owner, an active
review, a linked release, or a documented dependency; maintainers record the reason
and review date in the issue.

## Warning and Closing Steps

1. At 60 days without an update, a maintainer posts a concise reminder describing
   the requested information or next action and proposes a review date.
2. At 90 days, a maintainer checks the issue against the exemption criteria, adds a
   final warning when appropriate, and labels the issue `stale`.
3. If there is still no response or meaningful work after the warning period, a
   maintainer closes the issue with a message explaining that the issue is being
   archived for inactivity. The issue remains searchable and may be referenced in
   future work.
4. Security, privacy, safety, and active-release issues are never auto-closed by an
   inactivity bot; they follow the relevant process instead.

The warning period is at least 14 calendar days. A maintainer may extend it when
there is a pending review or a documented external dependency.

## Reopening Path

Anyone may reopen a stale issue by posting new information, a reproducible example,
a proposed use case, or a concrete contribution. A maintainer reviews the new
evidence, assigns an owner where appropriate, and updates the labels and review date.
Reopening does not guarantee implementation; it only restores the issue to active
triage.

## Ownership

The maintainer team owns this policy and reviews stale issues regularly to ensure the
process is applied consistently.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when the tracker contains current, actionable work, inactive
issues are archived predictably, and contributors can recover an issue with new
information without losing the original discussion.
