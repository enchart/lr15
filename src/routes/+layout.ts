import { error } from "@sveltejs/kit";
import { authClient } from "@/auth-client";

export async function load({ fetch }) {
  const { data, error: err } = await authClient.getSession({
    fetchOptions: {
      customFetchImpl: fetch,
    },
  });
  if (err) {
    throw error(err.status, err.message);
  }
  return { ...data };
}
