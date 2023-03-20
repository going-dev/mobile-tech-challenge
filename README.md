# Mobile Engineering Technical Interview @ Going

Repository for the code challenge for the mobile engineering technical interview at [Going](https://going.com).

## :gear: Requirements

- Git
- Node v16 or higher
- pnpm (`npm install -g pnpm`)

You will also need the [Expo Go](https://expo.dev/expo-go) app on your phone.

## :mag: Repository Overview

This codebase is a monorepo built with [Turborepo](https://turborepo.org) and uses [pnpm](https://pnpm.io/) as a package manager. All packages/apps are prefixed with `@going-mobile/`.

### :iphone: Apps

- [`api`](./apps/api): A small [fastify](https://fastify.com) API deployed on Vercel
- [`mobile`](./apps/mobile): An Expo application

### :package: Packages

- [`config`](./packages/config): Shared eslint configuration for all apps/packages.

Individual READMEs can be found in the app/package directory.
