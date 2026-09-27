# First-Time Contributor Policy

## Purpose

This policy describes the relationship between TeachLink Mobile and a contributor
making their first change: what the project owes them, and what is expected back.
It exists because the first contribution is the point where most people decide
whether a project is worth continuing in, and the project's own values commit to
stocked "good first issue" queues and to contributors being able to pause without
guilt ([core values](../VALUES.md), Sustainable Pace and Inclusive Collaboration).

## Scope

This policy covers contributors who have not yet had a change merged, and the
support, issue capacity, and mentorship they are owed.

It does not cover the onboarding mechanics — welcome messages, documentation pack,
office hours, week-by-week plan, and the onboarding metrics — which are owned by the
[Contributor Onboarding Process](../processes/ONBOARDING.md). It does not define the
criteria for the `good-first-issue` label itself, which are owned by the
[Good-First-Issue Policy](GOOD_FIRST_ISSUE.md). It does not set review timing, which
is owned by the [Code Review SLA](REVIEW_SLA.md) and the
[Reviewer role](../roles/REVIEWER.md).

## Support Offered

A first-time contributor is entitled to the following. These are commitments, not
aspirations, and a maintainer who cannot meet one says so publicly rather than
letting the contributor discover the gap.

| Entitlement | What it means in practice |
|---|---|
| **An orientation path** | A single starting point that explains the repository layout, the local quality checks, and the contribution flow: [README](../../README.md), [CONTRIBUTING](../../CONTRIBUTING.md), [docs/](../../docs/), [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md), and [the onboarding process](../processes/ONBOARDING.md). |
| **A starting issue sized to fit** | One issue from the reserved tranche below, with acceptance criteria and a stated area, rather than a vague "help wanted" ask. |
| **A named contact** | One person — typically the [Community Manager](../roles/COMMUNITY_MANAGER.md) or the assigned mentor — named in the issue thread who answers questions there. Questions go to that person by name, not into the void. |
| **Permission to ask basic questions in public** | A first-time contributor may ask in the issue thread, the pull request, or the community channels without being made to feel the question is wasting anyone's time. Maintainers do not answer basic questions with a link to the contributing guide alone, and do not treat a question as a review failure. |
| **A review bar appropriate to a first contribution** | The first contribution is reviewed for correctness and clarity, not held to the standard applied to an experienced contributor's tenth change. Reviewers give specific, actionable feedback; the extra-care path in [the onboarding process](../processes/ONBOARDING.md) applies. |

Two resources are deliberately named because they are the ones that actually
answer "where do I start": the repository README and the contributing guide. A
contributor who has read neither is not behind; a mentor points them at those two
documents before anything else.

## Reserved Good-First-Issues

A share of the `good-first-issue` queue is reserved for newcomers so that first-time
contributors are not competing with experienced contributors for it.

- **Reserved share:** at least **50%** of open `good-first-issue` issues are reserved
  for contributors with no merged change. The community manager checks the ratio
  during the monthly onboarding review and tops the tranche up from unreserved
  backlog when it falls below.
- **Rotation:** reserved issues are released back to the general pool when they
  become blocked, unlabelled per the [Good-First-Issue Policy](GOOD_FIRST_ISSUE.md),
  or held for **30 days** without a first-time contributor commenting. A released
  issue may be re-labelled later if a new tranche member is ready for it.
- **Qualification:** an issue belongs in the reserved tranche only when it is small,
  well-specified, and independently completable — the criteria in
  [the Good-First-Issue Policy](GOOD_FIRST_ISSUE.md) apply unchanged. An issue whose
  scope is ambiguous, requires privileged access, needs a design or product decision
  that has not been made, or depends on an unmerged change does not belong in the
  tranche, regardless of how welcoming it looks.
- **Per-person cap:** a single newcomer may hold at most **two** reserved issues at
  once. A third is granted only after one of the first two is closed as merged, as
  `duplicate`, or as `wontfix`. This prevents one person from draining the tranche.
- **Exit:** once a contributor's first change is merged, they are a
  [Contributor](../roles/CONTRIBUTOR.md) and the reservation no longer applies to
  them. Reserved issues they already hold stay reserved to them.

## Mentorship Expectation

Mentorship here is reciprocal and bounded. It is a light duty carried by volunteers
under the [Mentor Program](../processes/ONBOARDING.md), and it must never become a
bottleneck on the review queue for everyone else.

### The mentor's obligations

- **First response** in the issue thread within **2 business days** of a newcomer
  commenting, confirming the issue is live and still a good starting point.
- **An early scoping check** before the contributor invests significant time: confirm
  the issue still matches the criteria and that its acceptance criteria are still
  accurate. This is a comment, not a meeting.
- **Unblocking** when the contributor is stuck, at asynchronous pace, in the thread.
- **Escalation** when the mentor cannot help within **5 business days**, by asking a
  maintainer to take over the thread. The mentor may hand the relationship off
  without asking permission.

### The mentee's obligations

- **A short check-in** — one comment in the thread — so the mentor knows the
  contribution is live and the reserved slot is genuinely in use.
- **Reporting where they are blocked**, rather than going quiet for the duration.
- **A courtesy close**: if they abandon the issue, one comment releasing the reserved
  slot back to the pool. Silence is treated as abandonment after **14 days** without
  an update, and the issue is released by the community manager.

### Boundaries and failure

- A named mentor is a light duty of roughly **1 hour per week**, consistent with the
  onboarding mentor commitment. A mentor who cannot sustain that releases the
  relationship through the escalation path; the role is not held hostage.
- A mentorship relationship does not override or extend the
  [review SLA](REVIEW_SLA.md). The formal review is the [Reviewer](../roles/REVIEWER.md)'s
  job and follows the published timing.
- If a mentorship stalls — no first response, no unblocking, no handoff — the
  newcomer or the mentor escalates to a maintainer, who reassigns the thread. The
  newcomer is never left waiting on an individual volunteer.

## Ownership

The [Community Manager](../roles/COMMUNITY_MANAGER.md) owns this policy together with
the onboarding owner named in [the onboarding process](../processes/ONBOARDING.md).
The reserved-tranche ratio and the cap are checked on the onboarding metric cadence
that the onboarding process already defines. Changes are proposed in a pull request
that touches only the `Governance/` folder.

## Success

This policy succeeds when a first-time contributor finds a labelled issue within one
day of asking, receives a named contact's first response within two business days,
gets a first contribution merged without having been asked to justify their
questions, and the reserved tranche holds at or above 50% of the labelled queue. It
fails visibly when the queue is empty, when reserved issues sit unclaimed for 30 days,
or when a newcomer's first pull request is closed without a substantive review.
