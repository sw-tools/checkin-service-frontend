<script lang="ts">
  import '../app.css';
  import Navbar from '../lib/components/navbar.svelte';
</script>

<main>
  <div class="mt-5 mr-5 ml-5">
    <Navbar />
    <div class="mt-5">
      <slot />
    </div>
  </div>
</main>
