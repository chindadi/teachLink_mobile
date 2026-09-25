# Mobile Telemetry Governance

## Purpose

This policy defines how TeachLink Mobile collects, uses, and governs mobile
telemetry and crash reports. It establishes what is collected, what consent is
required, and how telemetry and crash data are excluded, triaged, and acted upon,
so that user privacy is protected while the team keeps the app reliable.

## Scope

This policy applies to all telemetry and crash-report data collected from the
TeachLink Mobile app on supported platforms, including analytics events,
performance metrics, and crash reports. It does not apply to data collected on
the server-side backend unless that data originates from the mobile telemetry
pipeline.

## Telemetry Events Collected

The app collects only the events needed to operate, debug, and improve the
product:

- navigation and screen views;
- feature engagement and time-to-interactive metrics;
- API request outcomes (success, latency, and error class) at the endpoint level;
- push notification delivery and tap rates; and
- memory, battery, and networking health indicators.

Events are collected under a stable, versioned schema. New events are reviewed by
the privacy and product leads before rollout, and every deployed event name is
listed in the project documentation alongside the version that introduced it.

## Consent Requirement

Telemetry collection requires user consent. On first launch the app requests
opt-in consent before any telemetry is transmitted, and the choice is stored and
honored across sessions. Telemetry may only begin after consent is granted. The
user may revoke consent at any time from the in-app privacy settings, and
withdrawal takes effect immediately for all future events. Already-collected data
continues to be processed only as permitted by the privacy policy and applicable
law.

## PII Exclusion

Telemetry and crash events must not contain personal data. The telemetry pipeline
excludes names, email addresses, phone numbers, user identifiers, exact free-text
input, and any values that could identify an individual. Identifiers attached to
events are randomly generated, salted, and rotated; request payloads are excluded
or redacted before transmission. A scan runs in CI on telemetry event schemas and
fails builds that introduce obviously personal fields.

## Crash Report Governance

Crash reports are governed by the same consent and PII-exclusion rules as
telemetry, plus the operational thresholds defined below.

### Crash-Free Target

The target crash-free user rate is 99.9% per rolling 30-day window. A sustained
drop below the target triggers the triage process defined in this section.

### Triage Cadence

Crash reports are triaged daily. The maintainer on call categorizes each new
crash signature by severity, platform, and affected user count, and links it to
the release that most plausibly introduced it. High-volume or data-affecting
signatures are escalated the same day.

### Release-Blocking Threshold

A crash signature blocks a release when it affects more than 0.5% of active users
on the release candidate, or when it causes data loss or prevents authentication
for any significant population. The release owner may not ship until the signature
is fixed, mitigated, or explicitly waived by the engineering lead, with the
justification recorded in the release notes.

## Ownership

The engineering lead owns this policy. The telemetry and crash-report program
owners run the collection pipeline and dashboards. Changes are proposed in a pull
request that touches only the `Governance/` folder.

## Success

This policy succeeds when the team has reliable, privacy-safe visibility into app
health, users trust how their data is handled, and crash regressions are found and
fixed before they reach a broad release.