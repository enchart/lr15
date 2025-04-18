import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "@/server/auth";

const handleAuth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};

const handleHeaders: Handle = async ({ event, resolve }) => {
  return resolve(event, {
    filterSerializedResponseHeaders: (key, _) => key === "content-type",
  });
};

export const handle = sequence(handleAuth, handleHeaders);
