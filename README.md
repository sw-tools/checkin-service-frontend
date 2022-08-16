# Checkin Service Frontend

## Getting Started

Install dependencies

```sh
npm install
```

Set up a local database (on Mac)

```sh
mkdir -p prisma/postgres-data && UID=$(id -u) GID=$(id -g) docker compose up
```

Push database schema to your local database

```sh
npx prisma db push
```

## Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.
