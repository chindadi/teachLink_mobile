# Security Embargo Policy

## Purpose

This policy defines how TeachLink Mobile protects unreported vulnerabilities and
security fixes from premature disclosure while maintainers validate and ship a
reliable fix. It balances the need for coordinated disclosure with the need to
protect users when delay would create unacceptable risk.

## Scope

This policy applies to vulnerability reports, security fixes, release artifacts,
and related technical details for TeachLink Mobile. It also applies when a report
is discovered by a contributor, maintainer, researcher, or affected user.

## Default Embargo Duration

An embargo begins when the security team confirms a report as a credible security
issue and ends when the coordinated disclosure decision is made. The default
embargo period is 90 calendar days from that confirmation. A shorter period may be
set for an actively exploited or high-impact issue, and a longer period requires the
reporter’s agreement and a documented reason. The security lead records the start
date, next review date, and expected release date in the private security record.

The embargo must not prevent users from protecting themselves. Maintainers may
provide minimal mitigation guidance when waiting would create a greater risk, and
must document any such guidance for the eventual advisory.

## Embargo List

The private security record identifies the people and organizations that need
access before the coordinated release. The list includes, as applicable:

- the reporter and any explicitly authorized research collaborators;
- the security lead and the maintainers reviewing or fixing the issue;
- the release owner and platform owners who must prepare a patched build;
- operations, infrastructure, and distribution partners who need to protect
  deployed services or update certificates; and
- legal, privacy, or compliance advisers when the issue requires their input.

The list is kept to the minimum necessary. Maintainers do not add people who do
not need the details, and every person with access is expected to preserve
confidentiality until the embargo is lifted.

## Early-Disclosure Exceptions

The security lead may approve early disclosure, with the reporter informed as soon
as practicable, when:

- reliable evidence shows active exploitation or material user harm;
- a vulnerability affects critical user data, authentication, payment, or
  authorization and delay would create a significant risk;
- a platform, distributor, regulator, or other third party requires earlier notice;
- a fix or mitigation cannot be contained; or
- the reporter’s responsible-disclosure deadline is about to expire and no agreed
  timetable can be met.

Where possible, the team coordinates the exception with the reporter and affected
partners before publishing. The decision, evidence, and affected audience are
recorded without exposing unnecessary exploit details.

## Lifting the Embargo

The security lead lifts the embargo when the fix is available, affected users have
an update path, and the release owner approves the communication plan. The public
advisory should identify affected versions, fixed versions, mitigations, and
reporting credit. The embargo list is notified before publication and remains
available for post-release support.

## Ownership

The security lead owns this policy and reviews it after every security incident or
advisory.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when reporters have a clear and respectful process, users are
protected without avoidable delay, and public advisories are released at a
coordinated, predictable time.
