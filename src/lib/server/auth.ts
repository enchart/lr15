import { VK_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_BETTER_AUTH_URL, PUBLIC_VK_APP_ID } from "$env/static/public";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  baseURL: PUBLIC_BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
    usePlural: true,
  }),

  user: {
    additionalFields: {
      firstName: {
        type: "string",
        input: false,
      },
      lastName: {
        type: "string",
        input: false,
      },
      balance: {
        type: "number",
        required: true,
        input: false,
        defaultValue: 1000_00,
      },
    },
  },

  socialProviders: {
    vk: {
      clientId: PUBLIC_VK_APP_ID,
      clientSecret: VK_CLIENT_SECRET,
      lang_id: 0,
      mapProfileToUser: (profile) => ({
        id: profile.user.user_id,
        name: `${profile.user.first_name} ${profile.user.last_name}`,
        firstName: profile.user.first_name,
        lastName: profile.user.last_name,
        image: profile.user.avatar,
      }),
    },
  },
});
