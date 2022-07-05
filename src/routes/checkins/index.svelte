<script>
  import { checkins, user } from '$lib/store';
  import * as Luxon from 'luxon';
</script>

<div>
  <div class="mb-10">
    <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        {#if $user}
          <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Scheduled Checkins</h2>
          </div>
          <div class="flex justify-end">
            <a href="/checkins/new" class="button hover:no-underline">New</a>
          </div>
          {#each $checkins as checkin (`${checkin.confirmation_number}${checkin.first_name}${checkin.last_name}`)}
            <div class=" card w-full bg-base-100 shadow-xl overflow-visible">
              <div class="card-body">
                <div class="card-actions">
                  <div class="badge badge-success text-white">Scheduled</div>
                </div>
                <h2 class="card-title">
                  #{checkin.confirmation_number}
                </h2>
                <p class="text-gray-500"><i>{checkin.first_name} {checkin.last_name}</i></p>
                <p class="text-gray-500">
                  <i
                    >Checking you in at {Luxon.DateTime.fromSeconds(checkin.checkin_available_epoch).toFormat(
                      `hh:mm a' on 'LLL dd, yyyy`
                    )}</i
                  >
                </p>
                <div class="card-actions justify-end">
                  <button class="button button-error">Unschedule</button>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
