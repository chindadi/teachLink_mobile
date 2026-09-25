# Mobile Accessibility Policy

## Purpose

This policy defines the accessibility bar for TeachLink Mobile. It ensures that
people using assistive technology, larger text, reduced motion, or alternative
input methods can perceive, understand, and operate the app’s core experiences.

## Scope

This policy covers user-facing screens, reusable components, navigation, forms,
media, notifications, and error states in the iOS and Android applications.

## Accessibility Targets

- New and changed user-facing experiences target WCAG 2.2 Level AA where the
  platform permits it.
- Every actionable control has an accessible name, role, state, and predictable
  focus or selection behavior.
- Text and meaningful controls meet contrast requirements, support system font
  scaling, and remain usable at supported dynamic-type sizes.
- Touch targets are at least 44 by 44 points where the platform allows, with
  adequate spacing and no reliance on color alone to communicate state.
- Focus order follows the visual and logical reading order, and dialogs, sheets,
  menus, and errors announce their context without trapping or confusing users.
- Motion respects reduced-motion preferences, and timeouts provide a way to extend
  or recover important work.
- Images, icons, charts, and media have equivalent text or an accessible
  alternative; decorative content is hidden from assistive technology.

## Screen-Reader Testing

- Changes to navigation, authentication, checkout, course progress, notifications,
  or other critical flows are tested with the platform screen reader: VoiceOver on
  iOS and TalkBack on Android.
- Testers verify announcement order, labels, roles, values, error recovery, focus
  restoration, and the ability to complete the task without sighted interaction.
- Automated accessibility checks and existing accessibility tests run when
  available; they supplement rather than replace platform screen-reader review.
- A pull request records the platforms, assistive technologies, and relevant states
  tested. A known limitation is documented and assigned before merge.

## Merge Gate for Regressions

A change is not merged when it introduces a critical blocker, removes an
accessible name or alternative, makes a core flow unusable with a screen reader,
or regresses an existing accessibility test. Reviewers may require a remediation
plan for non-critical gaps, but the plan must have an owner and target date. The
mobile maintainers own the gate and may request input from accessibility expertise
when the change affects a critical journey.

## Ownership and Review

The team responsible for mobile platform and user experience owns this policy and
reviews it with product changes, platform releases, and accessibility feedback.

Changes to this policy are proposed in a pull request that touches only the
`Governance/` folder.

## Success

This policy succeeds when core journeys remain operable with assistive technology,
regressions are caught before release, and accessibility is treated as a release
requirement rather than an optional enhancement.
