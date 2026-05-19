import { createAuthClient } from "better-auth/react";

export const authClient =
createAuthClient({
    baseURL:
        "https://mediqueue-server-f.vercel.app",

    fetchOptions: {
        credentials: "include",
    },
});