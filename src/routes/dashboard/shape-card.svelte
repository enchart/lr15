<script lang="ts">
  import { ArrowDown, ArrowUp } from "@lucide/svelte";
  import { invalidateAll } from "$app/navigation";
  import {
    CategoryScale,
    Chart,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
  } from "chart.js";
  import { onMount } from "svelte";
  import type { Session } from "@/auth-client";
  import { Button } from "@/components/ui/button";
  import * as Card from "@/components/ui/card";
  import type { NewsData } from "@/server/news-data";
  import { addBalance, getBalance, removeBalance } from "@/states/balance.svelte";
  import { formatPrice } from "@/utils/price";
  import type { GetShapes } from "../api/shapes/+server";
  import type { GetUserShapes } from "../api/shapes/user/+server";
  import { getShapeIcon } from "./shape-icons";

  interface ShapeCardProps {
    shape: GetShapes[number];
    user: Session["user"];
    userShapes: GetUserShapes;
    newsData: NewsData | null;
  }

  let { shape, user, userShapes, newsData }: ShapeCardProps = $props();

  let loading = $state(false);
  let price = $derived(shape.prices.length ? shape.prices[0].price : 0);
  let amount = $derived(userShapes.find((s) => s.shapeId === shape.id)?.amount || 0);
  let Icon = $derived(getShapeIcon(shape.id));

  let canvas = $state<HTMLCanvasElement>();
  let chart: Chart | null = $state(null);
  $effect(() => {
    if (newsData) {
      if (newsData.shapeId !== shape.id) {
        return;
      }
      if (chart) {
        chart.data.labels?.shift();
        chart.data.labels?.push(new Date());

        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(newsData.price);
        chart.update();
      }
      price = newsData.price;
    }
  });

  onMount(() => {
    const ctx = canvas!.getContext("2d")!;

    Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: shape.prices.map((p) => new Date(p.createdAt)),
        datasets: [
          {
            label: "Price",
            data: shape.prices.map((p) => p.price),
            backgroundColor: `${shape.color}7F`,
            borderColor: shape.color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        events: [],
        scales: {
          x: {
            display: false,
          },
          y: {
            ticks: {
              autoSkip: true,
              callback: (value, _index, _values) => (Number(value) / 100).toFixed(2),
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  });

  async function onBuy() {
    loading = true;
    const response = await fetch("/api/shapes/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shapeId: shape.id }),
    });

    if (!response.ok) {
      console.error(response);
    } else {
      amount += 1;
      removeBalance(price);
    }
    loading = false;
  }

  async function onSell() {
    loading = true;
    const response = await fetch("/api/shapes/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shapeId: shape.id }),
    });

    if (!response.ok) {
      console.error(response);
    } else {
      amount -= 1;
      addBalance(price);
    }
    loading = false;
  }
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="mb-1 flex items-center gap-2">
      <Icon class="size-5" />
      <span>{shape.name}</span>
    </Card.Title>
    <Card.Description>@{shape.id.toUpperCase()}</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="relative h-min w-full max-w-[calc(100vw-6rem)]">
      <canvas bind:this={canvas}></canvas>
    </div>
  </Card.Content>
  <Card.Footer class="flex justify-between">
    <div class="flex gap-2">
      <span class="text-xl font-medium">{formatPrice(price)}</span>
      <span class="text-lg">{amount} шт.</span>
    </div>
    <div class="flex gap-2">
      <Button
        class="border-red-500/25 bg-red-500/10 hover:bg-red-500/50"
        variant="outline"
        size="icon"
        title="Продать"
        onclick={onSell}
        disabled={amount === 0}
        {loading}
      >
        {#if !loading}
          <ArrowDown class="!size-5" />
        {/if}
        <span class="sr-only">Продать</span>
      </Button>
      <Button
        class="border-green-500/25 bg-green-500/10 hover:bg-green-500/50"
        variant="outline"
        size="icon"
        title="Купить"
        onclick={onBuy}
        disabled={getBalance() < price}
        {loading}
      >
        {#if !loading}
          <ArrowUp class="!size-5" />
        {/if}
        <span class="sr-only">Купить</span>
      </Button>
    </div>
  </Card.Footer>
</Card.Root>
