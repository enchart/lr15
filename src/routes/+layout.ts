import { error } from "@sveltejs/kit";
import { authClient } from "@/auth-client";

export async function load({ fetch }) {
  const { data, error: err } = await authClient.getSession({
    fetchOptions: {
      customFetchImpl: async (input, init) => {
        return await fetch(input, init);
      },
      credentials: "include",
    },
  });
  if (err) {
    throw error(err.status, err.message);
  }
  return { ...data };
}
