# Asynchronous Decision Policy

## Scope

This policy defines when a project decision may be settled asynchronously
(without a live meeting) and the safeguards that keep such decisions legitimate.
It complements the [`quorum policy`](QUORUM.md),
[`supermajority policy`](SUPERMAJORITY.md), and
[`tie-breaking policy`](TIE_BREAKING.md); those rules still govern any formal
vote that results from an async decision.

## When Async Decisions Are Allowed

A decision may be made asynchronously only when **all** of the following hold:

- **Reversible or low-impact.** The outcome can be undone or amended without
  material cost to the project, its users, or its released artifacts.
- **Within an existing mandate.** The change stays inside a domain that an
  existing policy, role, or approved charter already authorizes.
- **A written proposal exists.** The question, the proposed outcome, and the
  decision owner are stated in a persistent, linkable channel (an issue, a pull
  request, or a decision record).
- **No blocking objection.** No maintainer with standing over the decision has
  raised a reasoned, unresolved objection during the response window.

Decisions that are irreversible, security-sensitive, or that change the charter,
licensing, or the public API MUST NOT be settled asynchronously: they follow the
formal vote process (see [`QUORUM.md`](QUORUM.md)).

## Minimum Response Window

An async decision stays open for a minimum response window before it is recorded:

- **7 calendar days** for project-wide decisions affecting contributors or users.
- **3 business days** for routine operational decisions within a single domain or
  working group.

The window is measured from the moment the proposal is posted with its final
wording. Extending the window is allowed and must be announced in the same
channel; shortening it is not. Silence never counts as approval.

## Recording Requirement

Every async decision MUST be recorded in a persistent, versioned location before
it takes effect. The record includes:

- the decision owner(s) and the channel where the proposal was raised;
- the question, options considered, and the outcome;
- the opening and closing dates of the response window;
- any blocking objection and how it was resolved; and
- a link to the resulting issue, pull request, or decision record.

If the outcome requires a code or policy change, the recording requirement is
satisfied by the merged change plus the linked decision record; a decision that
exists only in chat is not recorded and is not binding.

## Escalation

If the minimum response window closes with an unresolved blocking objection, the
decision is escalated under the [`tie-breaking policy`](TIE_BREAKING.md) to a
named, non-conflicted maintainer, or converted into a formal vote under
[`QUORUM.md`](QUORUM.md). Pending escalation, the proposal does not take effect.

The maintainers own this policy.
