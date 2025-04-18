<script lang="ts">
  import { Contrast, Moon, Sun } from "@lucide/svelte";
  import { resetMode, setMode } from "mode-watcher";
  import { buttonVariants } from "@/components/ui/button";
  import * as DropdownMenu from "@/components/ui/dropdown-menu";

  type Props = {
    variant?: "outline" | "ghost";
  };

  let { variant = "outline" }: Props = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant, size: "icon" })}>
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item onclick={() => setMode("light")}>
      <Moon />
      <span>Тёмная тема</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => setMode("dark")}>
      <Sun />
      <span>Светлая тема</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => resetMode()}>
      <Contrast />
      <span>По умолчанию</span>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
