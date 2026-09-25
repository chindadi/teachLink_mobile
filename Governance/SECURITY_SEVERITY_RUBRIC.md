# Security Severity Rubric

## Purpose

This document defines how TeachLink Mobile classifies the severity of security
issues and the service-level agreements (SLAs) that follow from each level. It
also defines the coordinated-disclosure process the project follows with reporters
before a fix is published.

## Scope

This rubric applies to security issues in the TeachLink Mobile app, its releases,
and its documented infrastructure. It guides triage, response timing, and how
disclosures are coordinated with the community.

## Severity Levels

| Level | Criteria |
|---|---|
| Critical | Remote exploitation without user interaction that leads to data loss, account takeover, or code execution; or compromise of the release-signing or update-delivery chain. |
| High | Exploitation that requires limited interaction or privileges and results in unauthorized access to user data, payment, or a significant authentication bypass. |
| Medium | Exploitation that requires meaningful user interaction, elevated privileges, or unusual conditions, or that causes targeted data exposure or denial of service. |
| Low | Issues with limited impact, self-inflicted harm, or significant preconditions, and general best-practice hardening findings. |

## Response SLA per Level

- **Critical**: acknowledged within 4 business hours; work begins immediately and a
  fix and advisory are coordinated with the release owner.
- **High**: acknowledged within 1 business day; work begins within 24 hours.
- **Medium**: acknowledged within 3 business days; triaged into a regular release
  cycle.
- **Low**: acknowledged within 5 business days; scheduled for the next available
  milestone.

SLAs are wall-clock targets. The security lead records the acknowledgment time for
every report so compliance can be reviewed in each security retrospective.

## Coordinated Disclosure

### Coordination Steps with Reporters

Reporters are the primary partners in disclosure. The security lead confirms
receipt, requests the details needed for triage, and keeps the reporter informed at
agreed checkpoints. The reporter is consulted on the fix timeline, the advisory
content, and whether they wish to be credited. If a reporter requests anonymity,
their name is not published and access is limited to those who need it.

### Public-Disclosure Timing

Public disclosure happens once a fix and update path are available for affected
users, or after 90 calendar days from first acknowledgment when no fix has been
possible and continued secrecy is not justified by active-exploitation risk. Either
timing is coordinated with the reporter first. Active exploitation, legal
requirements, or the reporter's responsible-disclosure deadline may justify earlier
or later disclosure, and the reason is recorded.

### Credit Policy

Reporters who follow the disclosure process are credited in the advisory and in
the project's security acknowledgements, unless they ask not to be. Credit includes
the name or handle, the affected component, and a link, per the reporter's
preference.

## Ownership

The security lead owns this rubric and reviews it after every critical or
high-severity incident. Changes are proposed in a pull request that touches only
the `Governance/` folder.

## Success

This policy succeeds when security issues are triaged to a predictable, consistent
level, SLAs are met, and the community experiences coordinated, respectful
disclosures.