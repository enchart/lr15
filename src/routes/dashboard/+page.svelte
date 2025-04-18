<script lang="ts">
  import ShapeCard from "./shape-card.svelte";

  let { data } = $props();
</script>

<main>
  <section class="grid gap-4 lg:grid-cols-3">
    {#each data.shapes as shape (shape.id)}
      <article>
        <ShapeCard user={data.user} userShapes={data.userShapes} {shape} />
      </article>
    {/each}
  </section>
</main>
