<script lang="ts">
  import ShapeCard from "./shape-card.svelte";

  let { data } = $props();
</script>

<main>
  <section class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {#each data.shapes as shape (shape.id)}
      <article>
        <ShapeCard {shape} />
      </article>
    {/each}
  </section>
</main>
