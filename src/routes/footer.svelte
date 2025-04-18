<script lang="ts">
  import { Button } from "@/components/ui/button";
</script>

<footer class="mt-auto border-t px-4 py-8">
  <div
    class="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left"
  >
    <div>
      <h3 class="text-xl font-bold">Фигурка</h3>
      <p class="text-sm text-muted-foreground">Геометрическая биржа</p>
    </div>
    <div class="flex flex-col flex-wrap items-center gap-4 md:flex-row">
      <Button variant="ghost">Условия использования</Button>
      <Button variant="ghost">Политика конфиденциальности</Button>
      <Button variant="ghost">Свяжитесь с нами</Button>
    </div>
  </div>
</footer>
