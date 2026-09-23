# Background Task Governance Policy

## Purpose

This policy defines how background tasks are added and used in TeachLink Mobile.
It sets boundaries on allowed background modes, protects device battery, and
requires review before new background work is introduced.

## Scope

This policy covers background execution in the TeachLink Mobile application,
including scheduled and triggered background tasks.

## Allowed Background Modes

- Background tasks are permitted for functionality that genuinely needs to run
  when the app is not foregrounded, such as critical data synchronization or
  platform-required maintenance.
- Each background mode must be declared intentionally and justified. Modes that
  are not used must not be declared.
- Long-running or continuous background execution is prohibited unless it maps to
  an approved mode and serves the user's or platform's requirement.

## Battery-Impact Rule

- Background work must minimize battery impact.
- Work must be batched, deferred to platform-friendly windows where possible, and
  must not wake the device just to keep state warm.
- Background work must be cancellable when the platform signals resource pressure
  and must not thrash continuously.
- The expected frequency and energy cost of a background task must be documented
  before adoption.

## Review Before Adding One

- New background tasks are reviewed before they are added, including their
  justification, mode declaration, frequency, and battery impact.
- The review confirms that the task cannot be performed while the app is
  foregrounded and that it uses the platform's recommended scheduling primitives.
- After rollout, the actual battery and execution behavior is observed and
  compared against the documented expectation.

## Ownership

- The team responsible for mobile platform and performance owns this policy.
- Changes to this policy are proposed in a pull request that touches only the
  `Governance/` folder.

## Success

This policy succeeds when background modes are justified, battery impact stays
low, and every background task is reviewed before it is added.