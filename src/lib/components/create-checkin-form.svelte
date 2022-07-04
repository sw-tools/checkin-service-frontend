<script lang="ts">
  import type { PostRequestBody } from '../../routes/checkins/new.json';

  let confirmationNumber = '';
  let firstName = '';
  let lastName = '';
  let submitting = false;
  let error = false;

  async function submitForm() {
    submitting = true;
    const requestBody: PostRequestBody = {
      data: {
        confirmation_number: confirmationNumber,
        first_name: firstName,
        last_name: lastName
      }
    };
    const response = await fetch('/checkins/new.json', {
      method: 'POST',
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      window.location.href = '/checkins';
    } else {
      setTimeout(() => {
        error = false;
      }, 2000);
      error = true;
    }
    submitting = false;
  }
</script>

<div class="mb-10">
  <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Schedule a checkin</h2>
      </div>

      <div class="rounded bg-white max-w-md overflow-hidden shadow-xl p-5">
        <form class="space-y-4" on:submit|preventDefault={submitForm}>
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="grid">
              <div class="col-span-12">
                <label for="confirmationNumber" class="label pb-1">
                  <span class="label-text">Confirmation Number</span>
                </label>
                <input
                  type="text"
                  name="confirmationNumber"
                  id="confirmationNumber"
                  autocomplete="on"
                  class="input input-bordered input-secondary w-full"
                  aria-label="confirmation number"
                  required
                  bind:value={confirmationNumber}
                />
              </div>

              <div class="col-span-12">
                <label for="confirmationNumber" class="label pb-1">
                  <span class="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autocomplete="given-name"
                  class="input input-bordered input-secondary w-full"
                  aria-label="first name"
                  required
                  bind:value={firstName}
                />
              </div>

              <div class="col-span-12">
                <label for="confirmationNumber" class="label pb-1">
                  <span class="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autocomplete="family-name"
                  class="input input-bordered input-secondary w-full"
                  aria-label="last name"
                  required
                  bind:value={lastName}
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Watch this flight for a better price
              </label>
            </div>
          </div>

          <div>
            {#if !error}
              <button
                type="submit"
                class="btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                class:loading={submitting}
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">🚀</span>
                Schedule
              </button>
            {:else}
              <div
                class="btn cursor-default disabled w-full flex justify-center py-2 px-4 border border-transparent hover:border-transparent text-sm font-medium rounded-md text-white bg-error hover:bg-error focus:outline-none"
              >
                Failed! Please try again later
              </div>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
