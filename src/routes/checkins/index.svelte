<script>
  import { checkins, user } from '$lib/store';
</script>

<main>
  {#if !$user}
    <div />
  {:else}
    <div>
      <div class="flex justify-center px-4 py-16">
        {#each $checkins as checkin (`${checkin.confirmation_number}${checkin.first_name}${checkin.last_name}`)}
          <div class=" card w-96 bg-base-100 shadow-xl overflow-visible">
            <!-- <div class=" -left-5 -top-5 z-99">
              <Fa size="3x" color="gray" icon={faPlaneUp} />
            </div> -->
            <div class="card-body">
              <div class="card-actions">
                <div class="badge badge-secondary">Scheduled</div>
              </div>
              <h2 class="card-title">
                #{checkin.confirmation_number}
              </h2>
              <p class="text-gray-500"><i>{checkin.first_name} {checkin.last_name}</i></p>
              <div class="card-actions justify-end">
                <button class="btn btn-error">Unschedule</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</main>
