<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import Footer from "./footer.svelte";
  import Header from "./header.svelte";

  let { data, children } = $props();
</script>

<ModeWatcher />
<div class="container flex min-h-screen flex-col gap-6 p-6">
  <Header user={data.user} />
  <div class="flex-1">
    {@render children()}
  </div>
  <Footer />
</div>
