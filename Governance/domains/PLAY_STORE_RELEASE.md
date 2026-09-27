# Play Store Release Governance Policy

## Purpose

This policy governs how TeachLink Mobile releases reach production users on the
Google Play Store: how a release is phased in, who signs off on each phase, and
when the release must be halted and rolled back. A Play release stays under our
control for days after upload, because Google Play rolls it out gradually to
millions of devices. The rollout itself is therefore a governed step with an
owner, an entry gate, and stop conditions — not an unattended switch that is
flipped once and forgotten.

## Scope

This policy covers:

- production releases of TeachLink Mobile distributed through the Google Play
  Console production track, including staged (phased) rollouts;
- the sign-off that authorises a rollout to start, advance, or complete;
- the monitoring evidence reviewed during a rollout, and the criteria that halt
  or roll back a release.

It excludes:

- internal, closed, open, and pre-production testing tracks (see
  `Governance/domains/BETA_TESTFLIGHT.md`);
- Apple App Store submissions (see
  `Governance/domains/APP_STORE_RELEASE.md`);
- signing material and build profiles (see
  `Governance/domains/APP_SIGNING_KEYS.md` and
  `Governance/domains/EAS_BUILD_GOVERNANCE.md`).

## Staged-Rollout Rule

- Every production release on Google Play starts as a staged rollout. A build is
  never uploaded directly to 100% of production users.
- A rollout advances through the fixed progression **1% → 5% → 10% → 20% → 50% →
  100%**. If Play Console offers a different set of increments for a release, the
  actual progression is recorded in the release sign-off issue before the rollout
  starts.
- Each stage is held for at least **24 hours** before it is advanced, and a stage
  is advanced only when its monitoring evidence is clean.
- Advancing a stage — including the final step to 100% — requires an explicit
  approval recorded in the release sign-off issue, naming the approver and the
  evidence reviewed. Silent or unattended promotion between stages is
  prohibited.
- The rollout percentage is changed only by a release owner in Play Console. No
  automation, script, or CI job may change production rollout percentage.
- If a rollout is paused for any reason, it re-enters at the previously approved
  stage only after the cause is resolved and the restart is re-signed off.
- A release is complete only when it reaches 100% and the post-release monitoring
  window in `Governance/domains/APP_STORE_RELEASE.md` has passed without a
  trigger.

### Monitoring Evidence per Stage

Before each advancement, the approver reviews and records:

- crash-free sessions and ANR rate for the new stage, compared with the
  pre-release baseline;
- Play Console review feedback, Android vitals, and any new user-reported
  regressions attributed to the release;
- support ticket volume relative to the pre-release baseline;
- confirmation that the build being advanced is the build that was signed off.

## Sign-Off Owner

The **Release Manager** (`Governance/roles/RELEASE_MANAGER.md`) is the sign-off
owner for Play Store releases. The Release Manager owns the release sign-off
issue, authorises the start of a staged rollout, approves each stage
advancement, and records the final completion of the release.

| Decision                | Sign-off owner                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Start staged rollout    | Release Manager, after release readiness sign-off (Release Manager + Security Officer + one Maintainer, per `Governance/domains/APP_STORE_RELEASE.md`) |
| Advance rollout stage   | Release Manager, on clean monitoring evidence for the current stage                                                                                    |
| Hold or pause rollout   | Release Manager, or any Maintainer                                                                                                                     |
| Complete rollout (100%) | Release Manager, after the final stage holds clean                                                                                                     |
| Halt and roll back      | Release Manager; any Maintainer, Security Officer, or on-call committer may halt without prior approval                                                |

- Halt authority is deliberately broad: anyone able to reach Play Console may
  stop a rollout immediately, and the Release Manager is notified as soon as
  practical (and in any case within one hour).
- Every sign-off, advancement, hold, and halt is recorded in the release
  sign-off issue with a timestamp and the reason, so the rollout history is
  auditable after the fact.
- If the Release Manager is unavailable, the Maintainer on release duty acts as
  sign-off owner for the duration, and the substitution is recorded in the
  release sign-off issue.

## Halt-and-Rollback Criteria

Halt the staged rollout immediately — do not wait for the next stage or the next
business day — when any of the following is observed:

- crash rate above 1% of sessions, or ANR rate above 0.5%, for the staged
  audience within the first hours of a stage;
- data loss or data corruption reports attributable to the release;
- a security or privacy regression in the released build;
- core functionality broken for a meaningful share of users of the staged
  audience (for example sign-in, sync, or payments failing);
- a Play Console policy or enforcement action affecting the release;
- any issue that would have blocked the release under
  `Governance/domains/APP_STORE_RELEASE.md` had it been known before upload.

Halt and rollback procedure:

1. **Halt** — pause the rollout in Play Console so no additional users receive
   the build. This is the first action and needs no approval.
2. **Declare** — the Release Manager (or the maintainer who halted) opens a
   rollback record in the release sign-off issue: what halted, when, and on what
   evidence.
3. **Assess** — maintainers identify the root cause; the Security Officer is
   involved whenever security or privacy is implicated.
4. **Remediate** — either ship a hotfix build, or halt permanently and resume
   the previous version per the rollback plan in
   `Governance/domains/APP_STORE_RELEASE.md`.
5. **Resume or re-release** — a rollout restarts only from an approved stage,
   with fresh sign-off recording the fix and the evidence that it works.
6. **Follow up** — the reason for the halt is captured as an issue and reviewed
   in the release retrospective.

A halted rollout never resumes on observation alone: the underlying defect is
fixed, verified on a release candidate, and re-signed off before any further
percentage of users is exposed.

## Ownership and Review

The release-management team owns this policy. The Release Manager maintains it
alongside `Governance/domains/APP_STORE_RELEASE.md` and
`Governance/roles/RELEASE_MANAGER.md`, and reviews it whenever the Play Console
rollout model, the release cadence, or the monitoring stack changes.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when every Play Store production release is staged rather
than immediate, each stage advancement is approved and evidenced by the Release
Manager, and a release that misbehaves is halted and rolled back quickly,
predictably, and with a complete audit trail.

## Related Documents

- App Store release policy: `Governance/domains/APP_STORE_RELEASE.md`
- Release Manager role: `Governance/roles/RELEASE_MANAGER.md`
- Release checklist: `Governance/templates/RELEASE_CHECKLIST.md`
- Release cadence: `Governance/processes/RELEASE_CADENCE.md`
- App version bump policy: `Governance/domains/APP_VERSION_BUMP.md`
- Signing key policy: `Governance/domains/APP_SIGNING_KEYS.md`
