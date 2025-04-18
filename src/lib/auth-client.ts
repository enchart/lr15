import { PUBLIC_BETTER_AUTH_URL } from "$env/static/public";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";
import type { auth } from "@/server/auth";

export const authClient = createAuthClient({
  baseURL: PUBLIC_BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
