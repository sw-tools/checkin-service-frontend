# Checkin Service Frontend

Example frontend portion of a solution that can automatically check users into SW flights. Keeps track of users, but offloads the actual checking in to [Checkin Service](https://github.com/sw-tools/checkin-service).

## Getting Started

### Set up .env file

Copy .env.example to .env.

Set up [Google authentication for NextAuth](https://next-auth.js.org/providers/google) for your users and fill in GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file.

Stand up [Checkin Service](https://github.com/sw-tools/checkin-service) on AWS and fill in CHECKIN_SERVICE_AUTHORIZER_TOKEN and CHECKIN_SERVICE_HOST_URL in your .env file.

### Install dependencies

```sh
npm install
```

### Set up a local database

```sh
docker compose up -d
```

### Push database schema to your local database

```sh
npx prisma db push
```

## Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.
