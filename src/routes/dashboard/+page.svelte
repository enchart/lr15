<script lang="ts">
  import { untrack } from "svelte";
  import { source } from "sveltekit-sse";
  import * as Card from "@/components/ui/card";
  import type { NewsData } from "@/server/news-data";
  import { formatPrice } from "@/utils/price";
  import ShapeCard from "./shape-card.svelte";

  const rawNewsData = source("/api/shapes/news/subscribe").select("newsData");
  const newsData: NewsData | null = $derived($rawNewsData ? JSON.parse($rawNewsData) : null);

  let newsList = $state<NewsData[]>([]);
  $effect(() => {
    if (newsData) {
      console.log(newsData);
      untrack(() => (newsList = [newsData, ...newsList]));
    }
  });

  let { data } = $props();
</script>

<main class="grid gap-4">
  <section>
    <Card.Root>
      <Card.Header>
        <Card.Title level={2}>Последние новости</Card.Title>
      </Card.Header>
      <Card.Content class="max-h-40 space-y-4 overflow-y-auto">
        {#each newsList as news, i (i)}
          <Card.Root>
            <Card.Header class="p-5">
              <Card.Title>{news.news.title}</Card.Title>
              <Card.Description>@{news.shapeId} / {formatPrice(news.price)}</Card.Description>
            </Card.Header>
          </Card.Root>
        {/each}
      </Card.Content>
    </Card.Root>
  </section>
  <section class="grid gap-4 lg:grid-cols-3">
    {#each data.shapes as shape (shape.id)}
      <article>
        <ShapeCard user={data.user} userShapes={data.userShapes} {newsData} {shape} />
      </article>
    {/each}
  </section>
</main>
