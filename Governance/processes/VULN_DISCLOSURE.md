# Vulnerability Disclosure Process

## Purpose

This process gives security researchers and affected users a safe way to report a
vulnerability in TeachLink Mobile, and gives maintainers a repeatable way to triage,
fix, and disclose it. It protects reporters from unnecessary public exposure while
ensuring serious issues receive a timely response.

## Scope

This process covers vulnerabilities in the TeachLink Mobile application, its build
and release pipeline, and the repository’s documented integrations. It does not
authorize testing against other people’s accounts, production data, or infrastructure
outside the project’s permission.

## Private Reporting Channel

Report a suspected vulnerability through the repository’s private GitHub security
advisory channel by opening **Security > Report a vulnerability**. Do not open a
public issue, pull request, discussion, or social-media post with exploit details.
If private reporting is unavailable, contact a repository maintainer through a
private GitHub channel and ask for a secure response location; continue to share
technical details only after the maintainer confirms the private channel.

A useful initial report includes the affected version or commit, platform, impact,
reproduction steps or a proof of concept, and any known workaround. Reporters
should avoid accessing or modifying data that is not theirs and should provide a
reasonable opportunity to validate the issue.

## Triage Steps

1. **Acknowledge:** The security lead acknowledges a complete report within two
   business days, confirms the private channel, and assigns a case owner.
2. **Validate:** The case owner reproduces the issue in a controlled environment,
   identifies affected versions and platforms, and records assumptions and evidence.
3. **Prioritize:** The team assigns a severity and impact level, checks for known
   exploitation or data exposure, and identifies immediate mitigations.
4. **Contain:** The team limits access, disables unsafe paths, or prepares a safe
   workaround when the issue is actively harmful. The reporter is informed of any
   material change.
5. **Fix and review:** A minimal fix is developed with regression tests where
   applicable, reviewed by a maintainer who is not the sole author, and verified on
   supported platforms.
6. **Release and document:** The release owner prepares the patched build, the
   security lead records the disclosure decision, and the advisory identifies the
   impact, affected versions, fixed versions, and mitigations.

## Coordinated-Disclosure Timeline

The following targets begin when the security lead confirms a credible report:

- acknowledgement and private-channel confirmation within two business days;
- an initial triage update within seven calendar days;
- an agreed remediation target within 30 calendar days for high-impact issues and
  within 90 calendar days for lower-impact issues;
- an extension or revised target documented with the reason and reporter consent;
  and
- a public advisory no later than 14 calendar days after a fix is available, or
  sooner when early disclosure is required by the [embargo policy](../policies/EMBARGO.md).

The reporter receives status updates at each material milestone. The reporter is
credited by default unless they request otherwise, and the project does not threaten
or discourage good-faith research that follows this process.

## Ownership and Review

The security lead owns this process. Maintainers review it after each advisory and
whenever the reporting channel, support model, or release pipeline changes.

Changes to this process are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This process succeeds when reports are received privately, acknowledged promptly,
resolved with evidence-based decisions, and disclosed in a way that gives users a
clear and timely remediation path.
