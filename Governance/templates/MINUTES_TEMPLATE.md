# Meeting Minutes Template

## Purpose

This template makes TeachLink Mobile governance meetings repeatable and gives the
project a durable, versioned record of what was decided, who decided it, and what
happens next. Minutes are the evidence a decision happened — a decision that is not
recorded in minutes did not, for governance purposes, happen.

It applies to every governance meeting: maintainer meetings, working-group sessions,
release-train reviews, and any ad-hoc session where a binding decision is taken.

## How to use this template

1. Copy this file to `Governance/minutes/<YYYY>/<YYYY-MM-DD>-<topic>.md` before the
   meeting. Keep the headings and their order; delete the italic guidance once each
   section is filled in.
2. Fill the **Meeting details** block during the meeting, not after it.
3. Record every decision and every action item in the tables below as they are
   agreed. Do not reconstruct them from memory afterwards.
4. Open a pull request that touches **only** files in `Governance/`. The minutes are
   merged like any other governance document and are amended only by a later minute
   that supersedes them.
5. If a decision changes an existing policy in this folder, update that policy in the
   same pull request and reference this minute from it.

---

## Meeting details

| Field | Value |
| --- | --- |
| Meeting | *Short title, e.g. "Working group: offline sync"* |
| Date | *YYYY-MM-DD* |
| Start / end (UTC) | *HH:MM – HH:MM* |
| Type | *maintainer meeting / working group / release review / ad-hoc* |
| Chair | *Name* |
| Minute taker | *Name* |
| Minutes status | *draft / published / superseded by `<link>`* |

## Attendance

| Participant | Role | Present | Notes |
| --- | --- | --- | --- |
| *Name* | *e.g. `roles/MODERATOR.md`* | yes / no | *apology, delegate, or observer* |

A meeting is quorate when the requirements in
[`../processes/MILESTONE_GOVERNANCE.md`](../processes/MILESTONE_GOVERNANCE.md) — or, for
working groups, the group's own charter — are met. Record the quorum outcome explicitly:

- **Quorum:** met / not met
- **If not met:** decisions taken are *recommendations* and require ratification at the
  next quorate meeting.

## Agenda

1. *Item*
2. *Item*

## Discussion summary

*One short paragraph per agenda item. Summarise the positions taken and the evidence
weighed; do not transcribe the conversation. Record dissent here, not just consensus —
a minute that hides disagreement is not a useful record.*

### Item 1 — *title*

- *Context shown to the meeting.*
- *Options considered, and by whom.*
- *Position of each participant or role that spoke.*

## Decisions

Every binding decision gets its own row and its own permanent ID. The ID is the
meeting date plus a sequence number (`YYYY-MM-DD-D1`), and later documents cite the
decision by that ID rather than by the meeting.

| ID | Decision | Rationale | Decision rule | Owner | Objections |
| --- | --- | --- | --- | --- | --- |
| *YYYY-MM-DD-D1* | *What was decided, stated as a directive.* | *Why, in one or two sentences.* | *consensus / simple majority / role authority (name the role)* | *Accountable role* | *None, or the objection and how it was resolved* |

Recording rules:

- A decision is **binding** only if the decision rule used is permitted by
  [`../policies/APPROVAL_REQUIREMENTS.md`](../policies/APPROVAL_REQUIREMENTS.md) and
  the meeting was quorate.
- An unresolved objection is recorded verbatim in the **Objections** column and
  escalated as described in
  [`../processes/OBJECTION_HANDLING.md`](../processes/OBJECTION_HANDLING.md). Do not
  soften an objection into "noted".
- If a decision reverses an earlier one, name the superseded decision ID.
- Decisions that change policy must link the policy pull request in the **Rationale**
  cell.

## Action items

Every action item has an owner and a due date. "Someone should…" is not an action item.

| ID | Action | Owner | Due (YYYY-MM-DD) | Status | Issue / PR |
| --- | --- | --- | --- | --- | --- |
| *YYYY-MM-DD-A1* | *A single, verifiable outcome.* | *One named person or role — never a group* | *YYYY-MM-DD* | open / in progress / done / dropped | *#123* |

Recording rules:

- An action item with no owner is carried as an **open question**, not an action item.
- Status is updated in this minute while it is the current minute, then carried into the
  next meeting's minutes and marked `carried`.
- Anything that changes contributor-facing behaviour must additionally be reflected in
  [`../policies/CHANGELOG_POLICY.md`](../policies/CHANGELOG_POLICY.md).

## Open questions

*Questions raised but not answered. Each should have a name against it for the next
meeting.*

- *Question — raised by `<name>`, to be answered by `<date>`.*

## Next meeting

| Field | Value |
| --- | --- |
| Date | *YYYY-MM-DD* |
| Chair | *Name* |
| Draft agenda | *Link to the agenda issue* |

---

## Where minutes are published

- **Canonical copy:** committed to this repository at
  `Governance/minutes/<YYYY>/<YYYY-MM-DD>-<topic>.md`. The committed file is the
  authoritative record; anything else is a copy.
- **Discoverability:** the meeting's agenda issue is updated with a link to the merged
  minute, and the minute is linked from the governance README so it is reachable
  without knowing the date.
- **Announcement:** a short summary of decisions and action items may be posted to the
  project's discussion channel, but the summary must link back to the canonical file
  and must not contradict it.
- **Retention:** minutes are never deleted. A minute that is superseded keeps its file
  and gains a `**Superseded by:**` line in its **Minutes status** row; the decision IDs
  it introduced remain resolvable for as long as the repository exists.
- **Confidential matters:** if a session covers a security or embargoed topic, the
  public minute records only that the topic was discussed and which governance body
  holds the detail. The substantive record then follows
  [`../processes/VULN_DISCLOSURE.md`](../processes/VULN_DISCLOSURE.md).

## Ownership and review

The `Governance/` maintainers own this template. It is reviewed alongside
[`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md) and amended through a pull request that
touches only the `Governance/` folder.

## Success

This template succeeds when any contributor can open a past minute and answer three
questions without asking anyone: *what was decided, by what authority, and who owes
what by when.*
