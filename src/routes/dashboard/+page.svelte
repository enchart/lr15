<script lang="ts">
  import { untrack } from "svelte";
  import { source } from "sveltekit-sse";
  import * as Card from "@/components/ui/card";
  import type { shapeNews } from "@/server/db/schema";
  import { formatPrice } from "@/utils/price";
  import ShapeCard from "./shape-card.svelte";

  const rawNewsData = source("/api/shapes/news/subscribe").select("newsData");
  const newsData: typeof shapeNews.$inferInsert | null = $derived(
    $rawNewsData ? JSON.parse($rawNewsData) : null
  );

  let { data } = $props();
  let newsList = $state<(typeof shapeNews.$inferInsert)[]>(data.news);
  $effect(() => {
    if (newsData) {
      console.log(newsData);
      untrack(() => (newsList = [newsData, ...newsList]));
    }
  });

  const timeFormat = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "medium",
  });
  function formatTime(date: Date) {
    return timeFormat.format(date);
  }
</script>

<main class="grid gap-4">
  <section>
    <Card.Root>
      <Card.Header>
        <Card.Title level={2}>Последние новости</Card.Title>
      </Card.Header>
      <Card.Content class="max-h-64 space-y-4 overflow-y-auto">
        {#each newsList as news, i (i)}
          <article>
            <Card.Root>
              <Card.Header class="p-5">
                <Card.Title class="text-lg leading-6 sm:text-2xl" level={3}>
                  {news.title}
                </Card.Title>
                <Card.Description class="text-base">
                  @{news.shapeId} / {formatPrice(news.price)}
                </Card.Description>
                <Card.Description>{formatTime(new Date(news.createdAt!))}</Card.Description>
              </Card.Header>
            </Card.Root>
          </article>
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
