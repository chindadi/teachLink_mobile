# Developer Certificate of Origin Policy

## Purpose

The project accepts contributions under the Linux Foundation's Developer Certificate
of Origin (DCO), version 1.5, rather than under a Contributor License Agreement.
This document records what the sign-off a contributor adds to each commit actually
declares, what a maintainer checks, and what happens when a sign-off is missing.

## Scope

This policy applies to every commit in every pull request against the default
branch, whatever its origin.

It does not define the sign-off *mechanism* — the `Signed-off-by: Name <email>`
trailer, the `-s` flag, and the rule that unsigned work is not merged. That is owned
by the [Contributor and Release Sign-off Policy](CONTRIBUTOR_SIGNOFF.md) and this
document is consistent with it. It does not cover release sign-off, which the same
policy owns. It does not replace the [Code Review Policy](REVIEW_POLICY.md), which
lists the sign-off among the conditions for merge.

## The DCO Declaration

The DCO is a short public declaration, published at `https://developercertificate.org`
and reproduced here so that a contributor can read what they are agreeing to without
following a link. There is exactly one published DCO text; later version numbers
clarify wording and tooling conventions, and the substance of clauses (a) through (d)
below is unchanged across versions 1.1 to 1.5. The published file carries the
`Version 1.1` header and the 2004/2006 Linux Foundation copyright.

> Developer Certificate of Origin
> Version 1.1
>
> Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
>
> Everyone is permitted to copy and distribute verbatim copies of this
> license document, but changing it is not allowed.
>
> Developer's Certificate of Origin 1.1
>
> By making a contribution to this project, I certify that:
>
> (a) The contribution was created in whole or in part by me and I
>     have the right to submit it under the open source license
>     indicated in the file; or
>
> (b) The contribution is based upon previous work that, to the best
>     of my knowledge, is covered under an appropriate open source
>     license and I have the right under that license to submit that
>     work with modifications, whether created in whole or in part
>     by me, under the same open source license (unless I am
>     permitted to submit under a different license), as indicated
>     in the file; or
>
> (c) The contribution was provided directly to me by some other
>     person who certified (a), (b) or (c) and I have not modified
>     it.
>
> (d) I understand and agree that this project and the contribution
>     are public and that a record of the contribution (including all
>     personal information I submit with it, including my sign-off) is
>     maintained indefinitely and may be redistributed consistent with
>     this project or the open source license(s) involved.

## DCO History and Why Version 1.5

The DCO was published in 2004 with the Linux kernel and revised in 2006. The
revisions since then have been clarifications rather than substantive changes:

- **1.0 and 1.1 (2004, 2006)** established the declaration and its four clauses,
  including clause (d), under which the sign-off is knowingly a permanent public
  record.
- **1.2 to 1.4** adjusted wording and spacing, and made explicit that the
  declaration travels with the change rather than being held separately.
- **1.5** is the current version. It confirms the sign-off as a lightweight,
  per-commit certificate expressed as a `Signed-off-by` trailer, which is the form
  the project's tooling already produces.

The project adopts 1.5 because it is the current version and because it names the
trailer explicitly, leaving no question about what a `-s` in a commit message
asserts.

A DCO sign-off is deliberately **not** a CLA and **not** a legal agreement. It is a
per-commit certificate by the person who wrote the change, travelling inside the git
history, stating that the change is theirs or that they have the right to submit it.
No separate signature service, account, or negotiation is involved, and a contributor
who stops agreeing with the project's terms can stop signing; nothing retroactively
edits commits they already made.

## Sign-Off Requirement

Every commit in a pull request must carry a `Signed-off-by` trailer. This includes:

- rebased and squashed branches, where rewritten commits must be re-signed;
- cherry-picked commits, including maintainers' own cherry-picks, which carry the
  original author's trailer forward;
- commits made before the contributor forked, when the commit is being added to this
  repository's history for the first time.

The trailer is functionally equivalent to the DCO 1.5 sign-off. The git tooling is
`git commit -s` (or `-s` on any subsequent `commit`, `merge`, `rebase`, or `cherry-pick`),
which appends the trailer from the configured author identity.

A sign-off is the **contributor's own assertion** of authorship or of the right to
contribute. Maintainers must not add a sign-off on a contributor's behalf. That is
the whole point of the mechanism: a trailer written by someone other than the
author carries no information and destroys the only property the DCO provides.
Where a maintainer has the right to submit the work — for example a patch they wrote
and are contributing themselves — they sign it as the author, in their own name.

## How Sign-Off Is Verified

### Current state of the repository

As recorded at the time of writing, this repository has **no automated sign-off
check**:

- `.github/workflows/ci.yml` runs the console-violation scan, lint, the lint-budget
  ratchet, format check, typecheck, tests, the OpenAPI validation and contract tests,
  the web export, the bundle-size check, and the API-performance check. It does not
  inspect commit trailers.
- None of the other workflows under `.github/workflows/` (`architecture.yml`,
  `audit.yml`, `build-native.yml`, `bundle-size.yml`, `monitor-build-times.yml`,
  `performance-regression.yml`, `release.yml`) inspects commit trailers either.
- `.husky/` contains `pre-commit` (which runs `lint-staged`) and `pre-push` (which
  runs `npm run typecheck`). There is no `commit-msg` or `prepare-commit-msg` hook,
  so nothing rejects a commit locally for missing a sign-off.
- `package.json` has no DCO or sign-off script and no `dco` configuration.

This means the [Contributor and Release Sign-off Policy](CONTRIBUTOR_SIGNOFF.md)
describes the enforcement that the project intends, and the current enforcement is
manual only. That gap is tracked as a follow-up obligation, not described as a
finished control.

### Follow-up obligation

| Item | Owner | Target |
|---|---|---|
| Add a sign-off verification step to `.github/workflows/ci.yml` that fails the pull request when any commit in the branch lacks a `Signed-off-by` trailer, or when the trailer's identity does not match the commit author. | [Security Officer](../roles/SECURITY_OFFICER.md) with the maintainer team | Before the next release, reviewed each release until in place |
| Add a `.husky/commit-msg` hook that warns on a missing trailer at commit time. | Maintainer team | Alongside the CI step |

### Manual verification performed by a maintainer

Until the automated check exists, every maintainer and reviewer confirms sign-off by
hand before approving:

1. Inspect the full commit range of the pull request — not only the tip — for a
   `Signed-off-by` trailer on every commit.
2. Confirm the signer's name and email match the commit author of that commit, so a
   trailer cannot be used to assert authorship for someone else's work.
3. Record the check in the review, so that approval implies verification.

A review that skipped this step is incomplete.

## Remediation for Missing Sign-Off

A missing sign-off is **not** a rejection on the merits and carries no implication of
bad faith. It is a mechanical defect in the commit record, and the fix is always to
ask the contributor to sign — never to sign for them, and never to accept the work
unsigned because merging is otherwise convenient.

Maintainers never edit a contributor's commits to insert a trailer. Such a commit is
the maintainer's assertion, not the contributor's, and a silent edit hides the fact
that the record was incomplete.

### The tip commit is the only unsigned one

```bash
git commit --amend -s
git push --force-with-lease
```

The review comments still stand; the content of the change is untouched.

### Commits deeper in the branch are unsigned

The contributor re-signs the whole range. Non-interactive:

```bash
git rebase --signoff <base>
git push --force-with-lease
```

where `<base>` is the merge base of the branch and the default branch, for example
`main`. Interactive, when the contributor wants to rewrite messages individually:

```bash
git rebase -i <base>
```

and mark each unsigned commit as `reword`, saving the existing message and exiting
the editor with `git commit -s --amend --no-edit`.

### What the contributor must accept

- Rebase and re-signing **rewrites history**. Every commit in the range gets a new
  SHA, so the pull request must be updated with a force-push. A reviewer who has
  already approved a specific SHA must re-check the new range.
- The branch is **not merged while the sign-off is outstanding**. Approval is held,
  not withdrawn; the contributor keeps their review comments and their place in the
  queue.
- The [review SLA](REVIEW_SLA.md) clock is paused for the time the re-sign takes, as
  it is for any other change requested of the author.
- A contributor who cannot or will not re-sign has a second path: the change may be
  re-created or re-submitted — the maintainer offers to close the branch and the
  contributor opens a fresh pull request with `git commit -s`, or a maintainer
  re-lands the change as their own commit in their own name, with the original
  contribution credited in the pull request body. That path produces a signed record
  and is not a lesser outcome.
- A maintainer must not merge unsigned work to be agreeable, must not add a sign-off
  on a contributor's behalf as a shortcut, and must not treat a request to re-sign as
  a reason to close the pull request without the change being merged elsewhere.

## Ownership

The maintainer team owns this policy, with the
[Security Officer](../roles/SECURITY_OFFICER.md) consulted on the sign-off
verification check and its placement in CI. The outstanding CI obligation in
[How Sign-Off Is Verified](#how-sign-off-is-verified) is reviewed each release
until it is closed. Changes are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when every commit reachable from the default branch carries a
`Signed-off-by` trailer matching its author, the sign-off is verified by an automated
check rather than by memory, and every re-sign request is treated as a mechanical
fix rather than a rejection. It fails when a merge is blocked for reasons other than
the change itself, when a maintainer signs for a contributor, or when the outstanding
CI obligation goes unreviewed past a release.
