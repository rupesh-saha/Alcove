import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "https://alcove-asthetics.vercel.app",
});

export const { signIn, signUp, useSession } = createAuthClient()