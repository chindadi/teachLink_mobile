# Stale Pull Request Policy

## Purpose

This policy keeps the pull request queue workable and makes abandonment visible
and fair. It defines when a pull request is considered stale, how maintainers
nudge its author, and when a pull request may be closed or reopened. It is the
pull-request counterpart of the issue-level rules, and it is written so that a
maintainer who has read one can apply the other.

## Scope

This policy applies to open pull requests against the default branch, including
`Governance/` changes. Security advisories and release-blocking work are managed
under their relevant process and are never closed by this policy alone. The
issue-level counterpart of this policy is [`STALE_ISSUES.md`](STALE_ISSUES.md)
(same folder, so a bare filename link is correct here).

## Staleness Threshold

The clock for a pull request runs from its last substantive update, not from the
moment it was opened. A pull request becomes stale after **60 consecutive days**
without one of the following:

- a new commit pushed to the branch;
- a maintainer review, including a request for changes; or
- a substantive author comment — one that answers a review question, describes a
  change of approach, or reports a concrete result such as a passing local test
  run or a verified reproduction.

A comment that only repeats an old status does not reset the clock, exactly as in
[the stale issue policy](STALE_ISSUES.md). "Still working on it", a re-run of a
failing check, a rebase of the branch with no content change, and automated bot
comments are not updates.

A pull request is exempt from closing when it has an assigned owner, an active
review, a linked issue or release, a declared work-in-progress state, or a
documented external dependency; maintainers record the reason and the review date
in the pull request.

Two states are treated differently from an ordinary abandoned pull request:

- **Draft and work-in-progress.** A pull request kept as a draft is not on the
  review queue, and the clock does not run against it while it stays a draft. The
  clock starts when it is marked ready for review, which is also when the review
  SLA in [REVIEW_SLA.md](REVIEW_SLA.md) starts. Drafts older than 180 days are
  offered a closing review at that point rather than closed silently.
- **Blocked on the author.** A pull request awaiting a response to requested
  changes has its clock paused, consistently with
  [REVIEW_SLA.md](REVIEW_SLA.md), which pauses the review-completion target in
  the same situation. The pause is recorded in the pull request and lifted by the
  author's next substantive update.

## Warning and Closing Steps

1. At 30 days without an update, a maintainer posts a concise reminder naming the
   outstanding questions or checks, asks the author to confirm they intend to
   continue, and proposes a review date.
2. At 45 days, a maintainer checks the pull request against the exemption
   criteria, adds a final warning where appropriate, and labels the pull request
   `stale`.
3. If there is still no substantive update after the warning period, a maintainer
   closes the pull request with a message explaining that it is being closed for
   inactivity and inviting the author to reopen. The pull request remains
   searchable, is linkable from issues and other work, and remains part of the
   project's history.
4. Security, privacy, safety, and active-release pull requests are never
   auto-closed by an inactivity bot; they follow the relevant process instead.

The warning period is at least 14 calendar days. A maintainer may extend it when
there is a pending review or a documented external dependency.

These numbers are deliberately shorter than the 90-day and 60-day thresholds in
[the stale issue policy](STALE_ISSUES.md). An issue's value survives its author
losing interest, because the description is the durable artifact and the work can
be picked up by someone else from the text alone. A pull request does not: it is
the work, it branches from a commit that has since moved, and a later contributor
inheriting it pays for the time lost to re-reading the diff. A shorter clock
spends less reviewer attention per stale pull request and gives the author a
clearer signal to either land the change or let it go.

Closing a pull request is not destructive. The branch and its commits are
preserved, the discussion stays readable, and the author may reopen the pull
request rather than open a new one.

## Reopening Path

The author, or a maintainer acting on the author's behalf, may reopen a pull
request closed under this policy. Anyone else may reopen it only with a concrete
contribution — a rebased or continued branch, a new test, or an adopted
alternative — and not on the original author's behalf without a note from them.

What qualifies as a reason to reopen:

- new information that the change addresses, such as a linked issue, a defect
  report, or a release-train requirement discovered after the closure;
- a rebased or continued branch, with the author stating what remains to be done;
  or
- a maintained contribution: another contributor is carrying the change forward
  and says so in the pull request.

A maintainer reviews the new evidence, records it on the pull request, updates
the label, and returns the pull request to active review. Reopening does not
bypass the [Code Review Policy](REVIEW_POLICY.md): approvals do not survive the
closure, a stale approval from an earlier commit is not resurrected, and the pull
request must satisfy the requirements before merge like any other. Reopening
guarantees review, not a merge.

## Ownership

The maintainer team owns this policy and reviews stale pull requests regularly so
that the process is applied consistently with
[the stale issue policy](STALE_ISSUES.md).

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when the review queue holds work that people intend to land,
abandoned pull requests are closed predictably, authors learn the outcome before
their work disappears, and a closed contribution can be recovered with a rebased
branch rather than rewritten from scratch.
