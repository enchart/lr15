<script lang="ts">
  import * as Card from "@/components/ui/card";
  import { formatPrice } from "@/utils/price";
  import type { GetShapes } from "../api/shapes/+server";

  interface ShapeCardProps {
    shape: GetShapes[number];
  }

  let { shape }: ShapeCardProps = $props();

  let price = $derived(shape.prices.length ? shape.prices[shape.prices.length - 1].price : 0);
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{shape.name}</Card.Title>
    <Card.Description>@{shape.id.toUpperCase()}</Card.Description>
  </Card.Header>
  <Card.Content>
  </Card.Content>
  <Card.Footer class="flex">
    <span class="text-xl font-medium">{formatPrice(price)}</span>
  </Card.Footer>
</Card.Root>
