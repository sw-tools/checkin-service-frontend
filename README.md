# Checkin Service Frontend

An example frontend for https://github.com/sw-tools/checkin-service.

## Developing

Ensure you've already [deployed the backend to AWS](https://github.com/sw-tools/checkin-service#readme).

Create a .env file with variables from your deployed backend:

```
HOST_URL=https://your_given_api_gateway_prefix.execute-api.us-west-2.amazonaws.com/prod
AUTHORIZER_TOKEN=your_chosen_token
```

```bash
npm install

npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deploying

1. Fork this repo, then go to netlify.com and create a new site from your fork.
1. [Add the environment variables](https://docs.netlify.com/configure-builds/environment-variables/) you've specified in your .env file to your Netlify site's environment variable configuration.

## TODO

- Log in
- See my checkins
- Make a new checkin
- Remove a checkin
