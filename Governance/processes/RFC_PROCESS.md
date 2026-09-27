# RFC Process

## When an RFC Is Required

Use a Request for Comments (RFC) for a substantial or cross-cutting change that
needs community input before implementation, including changes to architecture,
public behavior, data handling, or governance. Small fixes and routine changes
may proceed through the ordinary issue and pull-request process. An RFC does not
replace a required security review, governance vote, or release approval.

## Lifecycle

1. **Draft:** The author opens an RFC using the
   [RFC template](../templates/RFC_TEMPLATE.md), names a decision owner, and
   describes goals, non-goals, alternatives, risks, and validation.
2. **Initial review:** A maintainer checks scope, completeness, decision
   authority, and required reviewers. Incomplete RFCs are returned with specific
   requested changes.
3. **In review:** The RFC is marked `In Review` and remains open for at least
   14 calendar days. The author responds to substantive feedback and records
   unresolved objections. The decision owner may extend the review period.
4. **Decision:** The authorized decision-maker records `Accepted`, `Rejected`,
   or `Deferred` with rationale and any dissent. Use formal voting when required
   by the charter or a governing policy. Acceptance authorizes implementation to
   be proposed; it does not bypass normal review or checks.
5. **Implementation and closure:** Link implementation work to the RFC. When
   acceptance criteria are met or the work is abandoned, record the outcome and
   mark the RFC `Accepted`, `Rejected`, `Deferred`, or `Withdrawn` as applicable.

## Acceptance and Rejection Criteria

An RFC may be accepted when it is in scope, sufficiently specified, feasible,
and addresses material risks with a credible validation and ownership plan. It
may be rejected when it conflicts with project purpose or policy, its risks are
unacceptable, evidence does not support it, or a more suitable alternative is
chosen. A proposal lacking evidence or a decision-ready scope should be returned
or deferred rather than treated as rejected. A materially revised RFC re-enters
review with a new notice period.

The RFC author maintains the document; the decision owner is accountable for the
outcome. The maintainers own this process and review it annually.
