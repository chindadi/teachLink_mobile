# Biometric Authentication Policy

## Purpose

This policy defines how biometric authentication is used in TeachLink Mobile. It
sets expectations for fallback authentication, secure storage of biometric
credentials, and the consent required before biometrics are enabled.

## Scope

This policy covers biometric authentication features (fingerprint, face, or other
platform biometric mechanisms) offered by the TeachLink Mobile application.

## Fallback Requirement

- Biometric authentication must never be the only way for a user to access their
  account or protected functionality.
- A safe, non-biometric fallback (for example, passcode or password) must always
  remain available.
- If biometric enrollment or recognition fails repeatedly, the user must be
  steered to the fallback without being locked out.
- The user must be able to disable biometrics at any time and continue using the
  fallback.

## Storage Rules

- Biometric identifiers and templates must not be stored by the application.
  Biometric data must remain within the platform's secure hardware-backed
  enclave.
- Local secrets used to enable biometric unlocks must be stored in secure storage
  that the platform protects, and must not be written to logs, databases, or
  backups outside the secure container.
- The application must not transmit biometric-derived material over the network.

## Consent Requirement

- Biometrics may only be enabled with the user's explicit, informed consent.
- The consent flow must explain what biometrics are used for, that the platform
  stores the biometric data, and that the user can disable it later.
- Enabling biometrics must be an opt-in step; it must not be silently activated
  during onboarding.
- The current consent state must be visible to the user in their settings.

## Ownership and Review

- The team responsible for authentication and security owns this policy and
  reviews it on a regular cadence.
- Changes to this policy are proposed in a pull request that touches only the
  `Governance/` folder.

## Success

This policy succeeds when biometrics are always backed by a fallback, biometric
material never leaves secure storage, and users give informed consent that they
can revoke.