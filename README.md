# Mobile Engineering Technical Interview @ Going

Congrats on getting to this stage and we're stoked you're interested in joining our team!

Below, you'll find a brief set of requirements needed for your interview, as well as an overview of the codebase.

## :gear: Setup

Before your interview, please install the [Expo Go](https://expo.dev/expo-go) app on your phone.

Additionally, please make sure you have the following tools setup on your machine:

- Git
- Node LTS
- pnpm (`npm install -g pnpm`)

**Please do not clone the repo before your interview.**

## :mag: Repository Overview

This codebase is a monorepo built with [Turborepo](https://turborepo.org) and uses [pnpm](https://pnpm.io/) as a package manager. All packages/apps are prefixed with `@going-mobile/`.

### :iphone: Apps

- [`api`](./apps/api): A small [json-server](https://github.com/typicode/json-server) deployed on Vercel
- [`mobile`](./apps/mobile): Expo application

### :package: Packages

- [`config`](./packages/config): Shared configurations (eslint, jest, tsconfig) for monorepo apps/packages
- [`release-management`](./packages/release-management): Configs for commits, PRs, and releases/deploys

All READMEs can be found in the app/package directory.
