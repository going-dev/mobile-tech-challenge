# @going-mobile/api

**Do not edit this package.**

A [json-server](https://github.com/typicode/json-server) API used for the mobile app, deployed on Vercel.

## Overview

The database is in `api/db.json` and contains an array of all 250 UN-recognized countries and municipalities in the following object shape:

```ts
{
  id: number; // unique numeric identifier
  name: string; // common English name of the country
  flag: string; // emoji flag of the country
  isoCode: string; // ISO 3166-1 Alpha-2 code of the country
  isVisited: boolean; // whether or not the mobile user has visited this countrty
  isBucketList: boolean; // whether or not the mobile user has this country on their bucket list
  isGoing: boolean; // whether or not the mobile user has an upcoming trip to this country.
}
```

There is 1 user for the [mobile app](../mobile), and the user-based properties are based on that 1 user.

## Usage

The base URL for the API is `https://mobile-tech-challenge-api.vercel.app/`. The sole endpoint is `/api/countries`.

### `GET /api/countries`

Retrieves the full list of countries.

### `GET /api/countries/:id`

Retrieves a single country by its unique, numeric identifier.

### `PATCH /api/countries/:id`

Updates a given country by its unique, numeric identifier.

The possible properties to patch are `isVisited`, `isBucketList`, and `isGoing`.
