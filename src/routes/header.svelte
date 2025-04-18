<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient, type Session } from "@/auth-client";
  import * as Avatar from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import * as DropdownMenu from "@/components/ui/dropdown-menu";

  interface HeaderProps {
    user?: Session["user"];
  }

  let { user }: HeaderProps = $props();

  async function handleLogOut() {
    const { error } = await authClient.signOut();
    if (error) {
      console.error(error);
      return;
    }
    await goto("/login", { invalidateAll: true });
  }
</script>

<header class="container flex items-center justify-between p-4">
  <h1 class="text-2xl font-bold">Фигурка</h1>
  {#if user}
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar.Root>
          <Avatar.Image src={user.image} alt={user.name} />
          <Avatar.Fallback>{user.firstName[0]}{user.lastName[0]}</Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onclick={handleLogOut}>Выйти</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  {:else}
    <Button href="/login">Войти</Button>
  {/if}
</header>
