<script lang="ts">
  import HttpStatus from 'http-status';
  import type { PostRequestBody } from '../../routes/checkins/new.json';

  let confirmationNumber = '';
  let firstName = '';
  let lastName = '';
  let showMessage = false;
  let responseMessage = '';

  async function submitForm() {
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

    if (response.status === HttpStatus.OK) {
      window.location.href = '/checkins';
    } else if ([HttpStatus.BAD_REQUEST, HttpStatus.UNPROCESSABLE_ENTITY].includes(response.status)) {
      showMessage = true;
      responseMessage = 'Unable to schedule checkin';
    }
  }
</script>

<div class="mb-10">
  {#if showMessage}
    <div class="text-center">
      <h3 class="font-extrabold text-3xl">{responseMessage}</h3>
    </div>
  {:else}
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
                    autocomplete="off"
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
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">🚀</span>
                Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
</div>
