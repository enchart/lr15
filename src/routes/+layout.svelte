<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import Header from "./header.svelte";

  let { data, children } = $props();
</script>

<ModeWatcher />
<Header user={data.user} />
<main class="container p-4">
  {@render children()}
</main>
