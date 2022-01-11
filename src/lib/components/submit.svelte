<script lang="ts">
  import HttpStatus from 'http-status';
  import * as Luxon from 'luxon';

  let confirmation_number = '';
  let first_name = '';
  let last_name = '';
  let showMessage = false;
  let responseMessage = '';

  async function submitForm() {
    const response = await fetch('/schedule-checkin-submit.json', {
      method: 'POST',
      body: JSON.stringify({ data: { confirmation_number, first_name, last_name } })
    });

    if (response.status === HttpStatus.OK) {
      const responseBody: ResponseBody = await response.json();

      const checkinAvailable = Luxon.DateTime.fromSeconds(
        responseBody.data.checkin_available_epoch
      ).toLocaleString(Luxon.DateTime.DATETIME_FULL_WITH_SECONDS);

      showMessage = true;
      responseMessage = `Checkin scheduled successfully. You'll be checked ${checkinAvailable}.`;
      return;
    }

    if ([HttpStatus.BAD_REQUEST, HttpStatus.UNPROCESSABLE_ENTITY].includes(response.status)) {
      showMessage = true;
      responseMessage = 'Unable to schedule checkin';
      return;
    }
  }

  interface ResponseBody {
    data: {
      checkin_available_epoch: number;
      checkin_boot_epoch: number;
    };
  }
</script>

<div class="mb-10">
  {#if showMessage}
    <div class="text-center">
      <h3 class="font-extrabold text-3xl">{responseMessage}</h3>
    </div>
  {:else}
    <div class="text-center">
      <h3 class="font-extrabold text-3xl">Schedule a checkin</h3>
      <form class="" on:submit|preventDefault={submitForm}>
        <label for="email" class="label">
          <span class="sr-only">Confirmation number</span>
        </label>
        <input
          id="confirmation_number"
          aria-label="confirmation number"
          type="text"
          name="confirmation_number"
          autocomplete="off"
          required
          bind:value={confirmation_number}
        />
        <label for="email" class="label">
          <span class="sr-only">First name</span>
        </label>
        <input
          id="first_name"
          aria-label="first name"
          type="text"
          name="first_name"
          autocomplete="on"
          required
          bind:value={first_name}
        />
        <label for="email" class="label">
          <span class="sr-only">Last name</span>
        </label>
        <input
          id="last_name"
          aria-label="last name"
          type="text"
          name="last_name"
          autocomplete="on"
          required
          bind:value={last_name}
        />
        <input type="submit" />
      </form>
    </div>
  {/if}
</div>
