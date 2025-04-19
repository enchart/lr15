<script lang="ts">
  import { LogOut } from "@lucide/svelte";
  import { invalidateAll } from "$app/navigation";
  import { authClient, type Session } from "@/auth-client";
  import * as Avatar from "@/components/ui/avatar";
  import * as DropdownMenu from "@/components/ui/dropdown-menu";
  import ThemeSelector from "@/components/ui/theme-selector.svelte";
  import { getBalance, setBalance } from "@/states/balance.svelte";
  import { formatPrice } from "@/utils/price";

  interface HeaderProps {
    user?: Session["user"];
  }

  let { user }: HeaderProps = $props();
  $effect(() => {
    if (user) {
      setBalance(user.balance);
    }
  });

  async function handleLogOut() {
    const { error } = await authClient.signOut();
    if (error) {
      console.error(error);
      return;
    }
    await invalidateAll();
  }
</script>

<header class="flex flex-wrap items-center justify-between gap-4">
  <h1 class="h2 border-0">
    <a href="/">Фигурка</a>
  </h1>
  <div class="flex flex-grow flex-wrap items-center justify-between gap-4 sm:flex-grow-0">
    {#if user}
      <span class="text-lg font-medium">{formatPrice(getBalance())} ₽</span>
    {/if}
    <div class="flex flex-wrap items-center gap-4">
      <ThemeSelector variant="ghost" />
      {#if user}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar.Root>
              <Avatar.Image src={user.image} alt={user.name} />
              {#if user.firstName && user.lastName}
                <Avatar.Fallback>
                  {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
                </Avatar.Fallback>
              {:else}
                <Avatar.Fallback>{user.name[0].toUpperCase()}</Avatar.Fallback>
              {/if}
            </Avatar.Root>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" side="bottom" alignOffset={8} sideOffset={8}>
            <DropdownMenu.Group>
              <DropdownMenu.GroupHeading>{user.name}</DropdownMenu.GroupHeading>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onclick={handleLogOut}>
                <LogOut />
                <span>Выйти</span>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      {/if}
    </div>
  </div>
</header>
