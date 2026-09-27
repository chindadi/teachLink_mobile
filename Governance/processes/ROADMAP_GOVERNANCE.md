# Roadmap Governance

## Purpose

This process defines how the TeachLink Mobile roadmap is proposed, approved, and
reviewed. The roadmap is the project's statement of direction: a short, durable
list of the outcomes the project intends to pursue, in order, with the reasoning
that produced it. It exists so that contributors and maintainers can see where the
project is going and why, and so that direction changes through a recorded decision
rather than through accumulated pull requests.

## Scope

This process covers roadmap items and roadmap themes: what may be added to the
roadmap, what evidence an addition needs, who approves it, and how often the
roadmap is revisited.

It does not own the mechanics of turning direction into scheduled work. Milestone
creation, entry and exit criteria, and the milestone lifecycle are defined in
[Milestone Governance](MILESTONE_GOVERNANCE.md), and release train timing,
integration windows, and freezes are defined in
[Release Cadence](RELEASE_CADENCE.md). Where this document and either of those
documents appear to differ on scheduling, those documents govern.

## What This Is Not

The roadmap is not a commitment to dates, and it is not a queue that contributors
are expected to work from without a maintainer asking.

- A roadmap item states an outcome, not a delivery date. Dates belong to
  milestones, and milestones belong to release trains.
- Roadmap items are not claimed the way a `help-wanted` or `good-first-issue`
  item is. Contributors may propose a roadmap item, but work on a roadmap item
  begins only when a maintainer or the sponsoring working group invites it, and
  that invitation follows the ordinary review and sign-off rules.

A roadmap that functions as a date commitment or a self-service backlog produces
missed expectations in both directions, and is a defect in this process.

## Proposing a Roadmap Item

### Who May Propose

Any contributor may propose a roadmap item by opening an issue. A proposal does
not enter the roadmap on proposal alone: it must be sponsored.

- The **sponsor** is a working group lead or a maintainer who takes responsibility
  for shepherding the proposal to a decision. A maintainer may act as their own
  sponsor.
- A contributor without sponsor standing may still open a proposal. It stays open
  and visible, unblocked from a decision, until a sponsor picks it up or a
  maintainer closes it with a reason.
- A sponsor who cannot advance a proposal says so within 14 days of sponsoring it
  and either hands it to another sponsor or records why it is parked.

### Required Content

A proposal states the following. A proposal missing any of these is incomplete and
is not put to a decision until the gap is filled.

| Field                 | What it must state                                                                   |
| --------------------- | ------------------------------------------------------------------------------------ |
| Problem statement     | The concrete user or maintainer problem, and the evidence that it exists.             |
| Intended outcome      | What is true for a teacher, student, or maintainer when the work is done, in user terms rather than component terms. |
| Rough size            | A T-shirt estimate, with the largest source of uncertainty named.                     |
| Dependencies          | Upstream and downstream work, platform or store constraints, and named external dependencies. |
| Milestone span        | The milestones the work would land across, or an explicit statement that the span is not yet knowable. |
| Non-goals             | What the item explicitly does not include, and what is deliberately deferred.        |
| Alternatives          | What was considered and rejected, and why.                                            |
| Alignment             | How the item sits inside the [scope statement](../SCOPE.md) and the [principles](../PRINCIPLES.md). |

### Non-Goals and Revocable Items

A proposal that contradicts [`NON_GOALS.md`](../NON_GOALS.md) is not proposable as
written. This is a hard stop, not a review comment, because a non-goal is a
decision the project has already made; the non-goal's own revisit procedure in
`NON_GOALS.md` is the only route to change it, and it carries its own evidence
requirements and discussion period.

A proposal that falls outside the [scope statement](../SCOPE.md) is proposable
only as a scope-change proposal and follows the scope change process recorded
there, including the values alignment check. A roadmap approval never substitutes
for that process, and the roadmap never records an out-of-scope item as approved.

### Proposal Template

Proposals are opened as issues and use the body below. The non-goals field is
required even when the item is small; writing "none" is a valid answer and an
omitted field is not.

```markdown
## Roadmap item: <title>

- **Problem:** <the problem and its evidence>
- **Intended outcome:** <what is true for the user when this is done>
- **Rough size:** <T-shirt estimate and the main uncertainty>
- **Dependencies:** <upstream, downstream, platform, external>
- **Milestone span:** <milestones, or "not yet knowable">
- **Non-goals:** <what this item does not include>
- **Alternatives considered:** <what was rejected and why>
- **Alignment:** <scope, principles, values>
- **Sponsor:** <working group lead or maintainer>
```

## Approving the Roadmap

### Roadmap Items

An individual roadmap item is a lightweight addition. It is approved by maintainer
consensus, expressed as:

- two maintainer approvals on the proposal; and
- at least one of those two is not the sponsor and not the author of the
  proposal.

Consensus means no unresolved objection, following
[Objection Handling](OBJECTION_HANDLING.md). Silence is not approval, and an
approval that is later withdrawn on new evidence is withdrawn for the purpose of
this rule.

### Roadmap Themes

A roadmap **theme** — a grouping of items around a quarter, a platform, or a
cross-cutting outcome such as offline capability or privacy — is heavier and
requires more than two approvals, because committing to a theme commits the
project's direction for several milestones.

- The theme is proposed using the
  [working group formation](WORKING_GROUP_FORMATION.md) process.
- A working group lead is appointed and publishes a charter, per the
  [Working Group Lead role](../roles/WORKING_GROUP_LEAD.md).
- The group reports progress bi-weekly, as its role requires.
- Approval is maintainer consensus after the discussion period in the formation
  process. Where objections are raised, the decision is a two-thirds majority of
  maintainers, and the dissent is recorded alongside the decision.
- The working group may not extend itself beyond the approved theme; a larger
  direction change is a new proposal, not a continuation.

### When Consensus Fails

Where consensus on an item or a theme is not reached, the matter follows the
[Escalation Path](ESCALATION_PATH.md), starting at the tier that owns the subject
and reaching the maintainer group if needed. Objections are raised and resolved
under [Objection Handling](OBJECTION_HANDLING.md); a decision taken over an
objection records the objection, the evidence, and the rationale, as that process
requires.

### Where Approval Is Recorded

Approval is recorded in the repository, in the proposal issue, and is therefore
auditable without asking anyone. The record names the item or theme, the
approving maintainers, the date, any dissent, and the decision rationale. The
roadmap itself is derived from that record; it is not the primary evidence. An
approval with no issue record is not an approval.

## Review Cadence

### Scheduled Reviews

The roadmap is reviewed **quarterly**, in the same quarter as the review of
milestone governance so that direction and scheduling are examined together. The
review is conducted by the maintainer group with the working group leads, and its
output is a set of recorded decisions in the review issue, not a rewritten
roadmap.

Each review answers:

- Is the ordering still right given what shipped and what slipped?
- Does each item still align with the [scope statement](../SCOPE.md), the
  [principles](../PRINCIPLES.md), and the [non-goals](../NON_GOALS.md)?
- Have the dependencies named in proposals materialized, changed, or disappeared?
- Which items should become milestone work in the coming cycle, per
  [Milestone Governance](MILESTONE_GOVERNANCE.md)?

### Out-of-Cycle Reviews

A review is held between quarterly reviews, and the roadmap is marked as under
review, when any of the following occurs:

- a release train slips materially — two or more consecutive trains, or a slip
  that changes what lands this cycle;
- an app store policy change affects what the app may do, distribute, or
  declare;
- a security or privacy incident, disclosure, or regulatory change affects the
  planned direction;
- a dependency change alters the feasibility or cost of an approved item; or
- a non-goal is revisited under its own procedure, which reopens every roadmap
  item that relied on it.

### What a Review May Change

A review may add, reprioritize, defer, or drop items. It may also split one item
into smaller items or merge several into a theme, provided the resulting items
keep the required content and are re-approved at the weight the change requires.

- **Add** an item through the full proposal and approval path, including a
  sponsor.
- **Reprioritize** by moving an item in the order, recording why the order
  changed.
- **Defer** an item to a later review, recording the condition that would bring
  it back. A deferral is not a drop and is reviewed again at the next cycle.
- **Drop** an item under the rule below.

### Dropping an Item

A dropped item is never removed silently. The drop requires:

- a written rationale naming the evidence or constraint that ended it, not a
  restatement that it is "not a priority";
- a link to the objection or decision record where the concern was raised, or to
  the proposal issue if there was none, so the drop is contestable; and
- a note to the original proposer, which is made even when the proposal came from
  someone outside the project's usual contributors.

A dropped item may be proposed again on new evidence, and the drop record stays
in the issue so the history is visible.

## Ownership

The maintainer group owns the roadmap and this process. The working group leads
own the themes they sponsored, and their leads run the quarterly review of their
own theme. The roadmap is reviewed quarterly and after any out-of-cycle trigger
listed above.

Changes to this process are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This process succeeds when every roadmap item has a sponsor, an approval record,
and a stated non-goal; when a contributor can see why the project is pursuing a
direction and how to contest it; when quarterly reviews actually change the
ordering rather than confirming it; and when no item on the roadmap reads as a
date commitment or as work waiting to be picked up.
