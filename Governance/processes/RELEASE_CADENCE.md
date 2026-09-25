# Release Cadence

## Purpose

This document defines when TeachLink Mobile is released and how planned release work
is grouped. A predictable cadence gives contributors a dependable integration window
and gives maintainers enough time to validate, document, and distribute changes.

## Scope

This cadence covers releases to the app stores and other official distribution
channels. It does not prevent a maintainer from shipping an emergency security or
critical reliability fix outside the normal schedule.

## Release Frequency

TeachLink Mobile uses a two-week release train. The release issue for each train is
opened no later than the first business day of the cycle and records the target
promotion date, supported platforms, and any planned freeze. A release may be
postponed when a required gate cannot be met; the release owner updates the issue and
announces the revised date through the project’s release channel.

Patch releases for security, privacy, data-loss, or critical reliability issues may
be expedited between trains. The release owner must record the reason, scope, and
validation performed in the release issue.

## Release Train Model

- Changes enter the next available train unless the release owner assigns them to a
  later train.
- The release owner freezes the candidate set after the integration window closes and
  publishes a review checklist.
- A change that introduces a known blocker may be removed from the candidate; it is
  not fixed in place without a new review of the impact.
- The release candidate is built from the recorded commit and promoted through the
  required internal, beta, and store channels.
- The release issue remains the source of truth for status, approvals, and artifacts.

## Freeze Windows

The release candidate is frozen for the final 48 hours before promotion. During the
freeze window, only release-blocking security, privacy, build, or data-integrity fixes
may be included. Each exception requires release-owner approval, a documented reason,
and a fresh validation pass.

A freeze ends when the candidate is promoted or the release is cancelled. The release
owner records the outcome and the next action in the release issue.

## Ownership

The team responsible for release management owns this cadence. Contributors should
plan work around the published train dates and raise scheduling concerns before the
candidate freeze.

Changes to this document are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This cadence succeeds when release trains happen predictably, scope is stable before
promotion, and urgent fixes can be handled without sacrificing validation or
communication.
