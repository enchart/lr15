<script lang="ts">
  import {
    ChartLineIcon,
    CircleIcon,
    ShieldIcon,
    SquareIcon,
    TrendingUpIcon,
    TriangleIcon,
  } from "@lucide/svelte";
  import * as Card from "@/components/ui/card";
  import LogInButton from "./log-in-button.svelte";
  import OneTapButton from "./one-tap-button.svelte";

  const features = [
    {
      icon: TrendingUpIcon,
      title: "Торговля 24/7",
      description: "Наблюдайте за движениями рынка и торгуйте в реальном времени",
    },
    {
      icon: ShieldIcon,
      title: "Безопасная практика",
      description: "Изучайте трейдинг с уникальной валютой в виртуальной среде",
    },
    {
      icon: ChartLineIcon,
      title: "Анализ рынка",
      description: "Продвинутые инструменты для анализа рыночных тенденций и паттернов",
    },
  ];
</script>

<section
  class="relative mt-4 flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-20"
>
  <div class="absolute inset-0 -z-10">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-muted-foreground/20"
    >
      <SquareIcon size={140} />
    </div>
    <div
      class="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 animate-bounce text-muted-foreground/20"
    >
      <CircleIcon size={100} />
    </div>
    <div
      class="absolute right-1/4 top-2/3 -translate-x-1/2 -translate-y-1/2 animate-pulse text-muted-foreground/20"
    >
      <TriangleIcon size={120} />
    </div>
  </div>
  <div class="mx-auto max-w-4xl text-center">
    <h1 class="mb-6 text-4xl font-bold sm:text-6xl">Торгуйте фигурами как никогда прежде</h1>
    <p class="mb-8 text-balance text-xl text-muted-foreground">
      Добро пожаловать в Фигурку, где простые формы становятся Вашим ключом к крупным доходам.
      Торгуйте квадратами, кругами и треугольниками на этой первой в мире
      <b>геометрической бирже</b>
      .
    </p>
    <div class="flex justify-center">
      <!-- <LogInButton /> -->
      <OneTapButton />
    </div>
  </div>
</section>

<section id="features" class="bg-muted/25 px-4 py-20">
  <div class="mx-auto max-w-7xl">
    <h2 class="mb-12 text-center text-3xl font-bold">Чем особенна Фигурка?</h2>
    <div class="grid gap-8 md:grid-cols-3">
      {#each features as feature}
        <Card.Root>
          <Card.Header>
            <Card.Title class="flex items-center gap-3">
              <feature.icon class="size-6" />
              {feature.title}
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p class="text-muted-foreground">{feature.description}</p>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  </div>
</section>
