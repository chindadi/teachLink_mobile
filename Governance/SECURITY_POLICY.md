# Security Policy

## Purpose

This document is the versioned, in-governance statement of which TeachLink Mobile
releases receive security fixes, how a vulnerability is reported, and what the
project commits to once a report arrives. It is the counterpart to the root
[`SECURITY.md`](../SECURITY.md), which carries the SSL-pinning mechanics and the
current pins, and to the [Vulnerability Disclosure Process](processes/VULN_DISCLOSURE.md),
which carries the disclosure process itself.

## Scope

This policy covers supported release lines, the reporting channel, and the response
commitment for the TeachLink Mobile application, its build and release pipeline, and
its documented integrations.

It does **not** restate the disclosure process — the private channel, the triage
ladder, the coordinated-disclosure timeline, and reporter credit are owned by the
[Vulnerability Disclosure Process](processes/VULN_DISCLOSURE.md), and this document
defers to them wherever they overlap. It does **not** cover SSL-pinning mechanics,
pin rotation, or the current pin values, which live in the root
[`SECURITY.md`](../SECURITY.md) outside `Governance/`; that file is the authority for
pins and is not duplicated or edited here. Severity classification is owned by the
[Security Severity Rubric](SECURITY_SEVERITY_RUBRIC.md), and this document uses its
level names.

## Supported Versions

For a mobile application, "supported" means the release lines a user can still be
running and that the project will still ship a security fix for. Older builds are
not merely unsupported by policy; the platform itself stops delivering updates to
them, so the project cannot reach them either.

Security fixes are developed and released on the **current line** and backported to
the **previous line**. Anything older than the previous line receives no fixes, no
backports, and no store re-submission on the user's behalf.

| Release line | Status | Security fixes |
|---|---|---|
| `1.16.x` — the current release line on `main` | Supported | Landed here first. |
| The immediately preceding minor line | Supported, but only while `1.16.x` is itself less than **two weeks old** | Backported from the current line. Once the current line is two weeks old, the previous line becomes unsupported and new users on it are directed to update. |
| The latest published store build of the current line | Supported | Included in the current line's fixes. |
| Any line older than the previous line | Unsupported | None. |

The window exists because a store submission takes time to propagate: a backport to
a line the current line has already superseded is work the project cannot justify,
and the store's own minimum-version enforcement is the correct lever for it.

### Current state and how to check it

The project version lives in `package.json` and is currently **`1.16.4`**, so the
supported current line is `1.16.x`.

`app.config.ts` derives the store metadata from that single value: the Expo
`version` is `packageJson.version`, the iOS `buildNumber` is the patch segment, and
the Android `versionCode` is the digits of the version concatenated (`1.16.4`
yields `1164`). A report should therefore cite the version name from the app's
settings screen and the platform build number, since those are what a user can see.
Versioning rules themselves are owned by the [Versioning Policy](policies/VERSIONING.md)
and build-number handling by the
[App Version Bump Policy](domains/APP_VERSION_BUMP.md).

To check which lines exist and which are current:

```bash
# The authoritative current version
node -p "require('./package.json').version"

# Released lines, newest first
git tag --list 'v*' --sort=-v:refname | head

# The age of the current line's latest tag, which starts the two-week window
git log -1 --format=%cs "$(git tag --list 'v*' --sort=-v:refname | head -1)"
```

The `supported versions` table is reviewed at each release, and the two-week
previous-line window is not extended without a documented maintainer decision.

## How to Report a Vulnerability

### The channel

Report through the repository's private GitHub security advisory channel, using
**Security > Report a vulnerability**. The
[Vulnerability Disclosure Process](processes/VULN_DISCLOSURE.md) is the authority on
this channel and on everything that happens after submission; this section restates
only the minimum a reporter needs in order to act correctly.

- **Do not open a public issue, pull request, discussion, or social-media post** with
  exploit details, not even as a draft.
- If private reporting is unavailable, contact a maintainer through a private GitHub
  channel and ask for a secure location; share technical detail only after the
  maintainer confirms the private channel.
- Contact never moves to a public thread. The on-call arrangement in the
  [Security Response Team Charter](SECURITY_RESPONSE_TEAM.md) is deliberately
  role-based and is resolved through the private channel.

### What to include

A complete first report contains:

- the affected version name and the platform, plus the build number where known;
- the impact — what an attacker gains, and from whom;
- reproduction steps, or a proof of concept;
- any known workaround, including whether it is already in a released build.

Reporters should avoid accessing or modifying data that is not theirs, and should
allow a reasonable opportunity for the project to validate the issue before it is
made public.

### Out of scope for this project

The following are not accepted as vulnerability reports, and no fix or advisory is
issued for them:

- findings that require physical access to an unlocked device, or that require a
  compromised or hostile device owner;
- purely theoretical findings with no demonstrated impact, including speculative
  reports with no attack path and no affected component;
- the raw output of automated scanners, dependency audits, or linters with no
  verified finding behind it. Report the verified issue, not the tool run.

This is a scope statement about what the project will act on, not a judgement about
the reporter's effort. A good-faith report that falls outside the list is answered
with an explanation, not with silence.

### Good faith and no retaliation

The project does not threaten or discourage good-faith research that follows this
process, and it does not pursue reporters who stay inside the scope above. Safe
harbour extends to research that stays within this policy, respects user data and
accounts they do not own, and does not degrade the service for others. This follows
the project's [Open by Default](VALUES.md) value — security work is coordinated,
not secret by default — and the commitment in the
[Vulnerability Disclosure Process](processes/VULN_DISCLOSURE.md) that the project
does not discourage good-faith research.

### What a reporter should expect

The clock is the one the [Vulnerability Disclosure Process](processes/VULN_DISCLOSURE.md)
already runs; this policy does not start a second one. A reporter receives:

- acknowledgement and private-channel confirmation within **two business days** of a
  complete report, with a named case owner;
- an initial triage update within **seven calendar days**;
- a status update at each material milestone, and credit by default unless the
  reporter asks otherwise;
- confirmation of severity under the [Security Severity Rubric](SECURITY_SEVERITY_RUBRIC.md).

The per-severity acknowledgement targets in the
[Security Severity Rubric](SECURITY_SEVERITY_RUBRIC.md) are faster than the
two-business-day default and apply where they are shorter: Critical within 4 business
hours, High within 1 business day, Medium within 3 business days, Low within 5
business days. The rubric governs; the table under
[Response Commitment](#response-commitment) restates the same numbers.

## Response Commitment

The commitment below is keyed to the severity levels defined in the
[Security Severity Rubric](SECURITY_SEVERITY_RUBRIC.md) and is consistent with the
timeline in the [Vulnerability Disclosure Process](processes/VULN_DISCLOSURE.md).

| Severity | Acknowledged | Initial triage update | Remediation target | Advisory |
|---|---|---|---|---|
| **Critical** | 4 business hours | 7 calendar days, sooner where reproduction is immediate | Fix coordinated with the release owner; a hotfix release is authorized by the [Security Officer](roles/SECURITY_OFFICER.md) with the [Release Manager](roles/RELEASE_MANAGER.md). No fixed outer date, because the severity requires immediate work. | With the fix, subject to the [Embargo Policy](policies/EMBARGO.md). |
| **High** | 1 business day | 7 calendar days | 30 calendar days from the confirmed report | Within 14 calendar days of the fix being available. |
| **Medium** | 3 business days | 7 calendar days | 90 calendar days; normally triaged into the regular release cycle | Within 14 calendar days of the fix being available. |
| **Low** | 5 business days | 7 calendar days | Next available milestone | With the release that carries the fix. |

### The extension path

A target is extended only with a documented reason and the reporter's consent, and
the extension is recorded in the private security record. Maintainers do not extend a
target silently, and a reporter who disagrees with an extension may ask for
escalation through the [Escalation Path](processes/ESCALATION_PATH.md). The
[Embargo Policy](policies/EMBARGO.md) governs how long technical detail may be held
before publication, including the early-disclosure exceptions.

### Release blocks and waivers

A finding blocks a release when the [App Store Release Policy](domains/APP_STORE_RELEASE.md)
records a security block, and in particular for any unfixed **Critical** or **High**
finding that affects the release build. A block is raised by the
[Security Officer](roles/SECURITY_OFFICER.md) in the release sign-off, where the
[Security Officer](roles/SECURITY_OFFICER.md) is recorded as approving that there are
no critical vulnerabilities, and it is resolved or escalated through the release
process.

Only the [Security Officer](roles/SECURITY_OFFICER.md) may waive a release block, and
only with the [Release Manager](roles/RELEASE_MANAGER.md). A waiver is recorded in
the release issue with the finding identifier, the reason, the compensating measure,
and the follow-up target. Waivers are not granted to avoid a missed release date
alone, and an unrecorded waiver is treated as a process failure in the security
retrospective.

### Who owns the commitment

The [Security Officer](roles/SECURITY_OFFICER.md) owns this commitment, with the
[Security Response Team Charter](SECURITY_RESPONSE_TEAM.md) defining who backs the
role up: a weekly primary and secondary rotation, a recorded handoff at each
rotation change, and the secondary assuming the primary role when the primary cannot
meet a severity SLA. Backups mean the table above is answerable at any hour, not only
when one person is available.

## Ownership

The [Security Officer](roles/SECURITY_OFFICER.md) owns this policy, with the
maintainer team and the [Release Manager](roles/RELEASE_MANAGER.md) consulted. The
supported-versions table is reviewed at each release, and the response commitment is
reviewed after every advisory. Because this document sits at the top of
`Governance/`, it is the versioned counterpart to the root
[`SECURITY.md`](../SECURITY.md): that file owns pinning mechanics and the current
pins, this file owns supported versions, reporting, and the response commitment, and
the two are read together. Changes to this policy are proposed in a pull request that
touches only the `Governance/` folder.

## Success

This policy succeeds when a report arrives through the private channel, is
acknowledged inside its severity target, produces a fix on the current line with a
backport to the previous line, and ends in an advisory that tells an affected user
what to do. It also succeeds when nothing is reported because there is nothing to
report, and when a reporter reading only this document knows the channel, the
minimum they must include, and the date by which they will hear back. It fails when
the table above drifts from the disclosure timeline, when the two-week
previous-line window lapses without a decision, or when a release ships over an
unrecorded security block.
