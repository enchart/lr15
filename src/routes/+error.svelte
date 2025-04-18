<script lang="ts">
  import { page } from "$app/state";
</script>

<main>
  <h1 class="h1">{page.status}</h1>
  <p class="text-xl">{page.error?.message}</p>
</main>
