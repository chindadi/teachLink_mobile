# Storybook Governance Policy

## Purpose

This policy defines the expectations for Storybook in the TeachLink Mobile
repository. It keeps component documentation consistent, gives reviewers a clear
way to check components in isolation, and assigns maintenance responsibility.

## Scope

This policy covers the Storybook setup, component stories, and the review and
maintenance expectations that keep Storybook useful.

## Story Requirement for Components

- Reusable components must have a story that documents their main variants and
  states.
- Stories must reflect the real component API: props, names, and behavior shown in
  a story must match the component they document.
- New or significantly changed dimensionless components must be added or updated as
  part of the change that touches the component.
- Stories must render without runtime errors and must not depend on unapproved
  mocking that hides real behavior.

## Review Use

- Storybook is the reference surface for visual and interaction review during pull
  request review.
- Reviewers may ask for stories that cover edge states (empty, loading, error,
  keyboard, and accessibility states) before approving component work.
- Stories should be kept lightweight and deterministic so they are stable across
  machines and screenshots.

## Maintenance Owner

- The team responsible for the design system owns Storybook configuration and
  upkeep.
- This owner keeps dependencies current, resolves build or runtime issues, and
  curates the story structure so it stays navigable.
- Maintenance work that is purely governance is proposed in a pull request that
  touches only the relevant project folders and follows project standards.

## Success

This policy succeeds when Storybook reliably documents components, supports
effective review, and has a clearly assigned owner who keeps it healthy.