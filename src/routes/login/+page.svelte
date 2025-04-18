<script lang="ts">
  import { authClient } from "@/auth-client";
  import { Button } from "@/components/ui/button";

  async function logInWithVk() {
    const { error } = await authClient.signIn.social({
      provider: "vk",
    });
    if (error) {
      console.error(error);
      return;
    }
  }
</script>

<Button onclick={logInWithVk}>Войти через VK</Button>
