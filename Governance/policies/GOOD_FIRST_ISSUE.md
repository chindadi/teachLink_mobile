# Good-First-Issue Policy

## Purpose

This policy defines what qualifies for the `good-first-issue` label, who may apply
and remove it, and what a labelled issue owes the contributor who picks it up. The
label is the project's main on-ramp, and its value depends entirely on it being
truthful: an issue that carries it must actually be completable by someone new.

## Scope

This policy covers the criteria for and the practice of the `good-first-issue` label
on issues.

It does not define the label set, the color scheme, or the general rules for
combining and cleaning up labels, which are owned by the
[Label Taxonomy](../LABEL_TAXONOMY.md). It does not describe the flow by which
newcomers are routed to the queue, which is owned by the
[Contributor Onboarding Process](../processes/ONBOARDING.md), nor the reserved
capacity and support owed to newcomers, which is owned by the
[First-Time Contributor Policy](FIRST_TIME_CONTRIBUTOR.md).

## Criteria for the Label

An issue qualifies for `good-first-issue` when **all** of the following hold.

| # | Criterion | How it is checked |
|---|---|---|
| 1 | The desired outcome is unambiguous. | A reader can state the finished state in one sentence without asking a question. |
| 2 | The scope is completable by one contributor in a short sitting. | The issue is sized `size/XS` or `size/S` in the [Label Taxonomy](../LABEL_TAXONOMY.md), or is plainly of that size. |
| 3 | Acceptance criteria are stated, and a way to verify them is stated. | The issue says what must be true when it is done and how to observe it — a test to run, a screen to look at, a command and its expected output. |
| 4 | The relevant area and the relevant code or documentation are named. | The issue links a file, module, or document under [`src/`](../../src), [`tests/`](../../tests), [`docs/`](../../docs), or the `Governance/` folder. |
| 5 | No privileged access is required. | Resolving it needs only read access to the repository and whatever is public — no store console, no signing key, no production data, no secret. |
| 6 | No product or design decision is required. | The correct answer is already determined; the contributor is not being asked to choose what the app should do. |
| 7 | No unmerged dependency is required. | The issue does not depend on a pull request that has not merged, and is not blocked on a maintainer decision that has not been made. |

### Disqualifiers

An issue does **not** qualify if any of the following is true:

- the scope is ambiguous, or two reasonable contributors would produce materially
  different results;
- it is multi-part — three files to update in three unrelated areas, or a fix plus
  its tests plus its documentation rolled into one ask;
- it asks to "improve performance", "clean up the code", or "add better error
  handling" with no stated target, no named location, and no observable acceptance
  criterion;
- resolving it depends on a maintainer decision that has not yet been made, or on a
  change that is still in review;
- it requires privileged access, production data, or a live store build;
- it teaches or refactors a large surface area, where a newcomer would spend the
  contribution learning the system rather than changing it.

### The Label Is a Promise About the Issue

`good-first-issue` states that **the issue** is well-shaped for a newcomer. It makes
no claim about the difficulty of the codebase, and it is not a compliment on the
reporter. A large feature may contain a small qualifying issue; a one-line fix in a
confusing module may not qualify at all.

When any criterion stops holding — the design decision is still unmade, the
dependency merged in a different direction, the scope turned out to be larger than
described — maintainers **remove the label** rather than leaving it stale. A stale
`good-first-issue` is worse than no label, because the contributor who trusted it
invests an evening and then discovers the mismatch. Removal follows the label-cleanup
rules in the [Label Taxonomy](../LABEL_TAXONOMY.md), and the removal duty belongs to
whoever notices, not only to the community manager's monthly review.

## Who Applies the Label

| Actor | May do | Notes |
|---|---|---|
| [Community Manager](../roles/COMMUNITY_MANAGER.md) | Apply and remove `good-first-issue`. | Accountable for the label, as set out in the [Community Manager role](../roles/COMMUNITY_MANAGER.md), which lists it among the labels the community manager applies. The community manager may add a curation note recording the sizing and the reason for the decision. |
| [Triagers](../roles/TRIAGER.md) | Propose the label, and apply it in the ordinary course of triage. | Triagers hold general label-management authority. A triager who believes an issue qualifies applies it and leaves the sizing note; a triager who is unsure routes the proposal to the community manager. |
| Contributors | Suggest the label in an issue or discussion. | A suggestion is acted on by a triager or the community manager. Contributors do not self-label their own issues, and do not remove the label from an issue they are not working on. |
| Maintainers | Apply it as triagers do, subject to the same criteria. | A maintainer does not apply `good-first-issue` unilaterally to an issue they are personally about to hand to a specific person. That converts a public promise into a private assignment, and it uses the label to manage a person rather than to describe an issue. Assign the issue and leave the label off. |

Removal follows the same authority: the community manager, a triager, or the
maintainer who applied it removes the label when a criterion stops holding, and says
in the thread which criterion failed.

## Mentorship Expectation

A labelled issue that a newcomer picks up comes with an early, named human on the
other side of the thread. The expectation is deliberately light.

- **A mentor responds before significant time is invested.** When a contributor
  claims a labelled issue, a mentor — typically the community manager or an assigned
  [Reviewer](../roles/REVIEWER.md) — responds in the thread within **2 business
  days** to confirm the issue is still accurate, restate the acceptance criteria,
  and confirm nothing else is expected. Nobody should spend an evening blocked on an
  unstated assumption. A claim comment from the contributor is what starts this
  clock; silence does not.
- **A mentor does not hand-hold.** A labelled issue does not oblige a mentor to
  co-author, to pair live, or to approve a small shortcut. The formal review follows
  the [Code Review SLA](REVIEW_SLA.md) and the
  [Reviewer expectations](../roles/REVIEWER.md); the mentor's early comment is not a
  substitute for it, and does not start or replace the SLA.
- **Rescoping is the mentor's job.** If a labelled issue turns out to be larger than
  advertised, that is a failure of this policy, not a failure of the contributor.
  The mentor's response is to help rescope — split off the parts that do not qualify,
  narrow the acceptance criteria, and remove the label if the remainder no longer
  meets the criteria above — so that the contributor either finishes something real
  or is released from the work without having floundered.
- **Mentorship is bounded.** A mentor's commitment here is part of the light duty
  described in the [First-Time Contributor Policy](FIRST_TIME_CONTRIBUTOR.md) and the
  [Mentor Program](../processes/ONBOARDING.md). A mentor who cannot respond within
  the stated window escalates to a maintainer to reassign the thread; the newcomer is
  never left waiting on one individual.

## Ownership

The [Community Manager](../roles/COMMUNITY_MANAGER.md) owns this policy together with
the [Triagers](../roles/TRIAGER.md). The criteria and the cleanup practice are
reviewed on the onboarding cadence defined in the
[Contributor Onboarding Process](../processes/ONBOARDING.md), and label set changes
are proposed through the [Label Taxonomy](../LABEL_TAXONOMY.md). Changes are
proposed in a pull request that touches only the `Governance/` folder.

## Success

This policy succeeds when a newcomer who claims a labelled issue receives a mentor's
first response within two business days, when fewer than 5% of labelled issues are
later found not to have met the criteria, and when no `good-first-issue` label sits on
an issue for more than 30 days without a claim. It fails visibly when the label is
applied to ambiguous or blocked work, when a contributor is left on an unstated
assumption, or when the label count is high while the median time to a first response
is not.
