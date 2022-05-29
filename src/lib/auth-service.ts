import { variables } from '$lib/variables';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { isAuthenticated, popupOpen, user } from './store';

export async function createClient() {
  const auth0Client = await createAuth0Client({
    domain: variables.auth0Domain,
    client_id: variables.auth0ClientId
  });

  return auth0Client;
}

/**
 * @todo accept PopupLoginOptions
 */
export async function loginWithPopup(client: Auth0Client) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup();

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

export function logout(client: Auth0Client) {
  return client.logout();
}
