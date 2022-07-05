<script>
  import * as AuthService from '$lib/auth-service';
  import { user } from '$lib/store';
  import { onMount } from 'svelte';

  let auth0Client;

  onMount(async () => {
    auth0Client = await AuthService.createClient();
    const localUser = await auth0Client.getUser();
    user.set(localUser);
  });

  async function login() {
    AuthService.loginWithPopup(auth0Client);
    const localUser = await auth0Client.getUser();
    user.set(localUser);
  }

  function logout() {
    return AuthService.logout(auth0Client);
  }
</script>

<nav>
  <div class="navbar bg-base-100 shadow-xl rounded-box">
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl hover:no-underline" href="/checkins">Southwest Tools</a>
    </div>
    <div class="navbar-end">
      {#if !$user}
        <div class="btn" on:click={login}>Login</div>
      {:else}
        <div class="btn" on:click={logout}>Logout</div>
      {/if}
    </div>
  </div>
</nav>
