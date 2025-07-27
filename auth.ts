import NextAuth from "next-auth";
import { db } from "./src/lib/db"
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
if (!db) throw new Error("Database is not initialized");
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    basePath: "/api/auth",
    adapter: DrizzleAdapter(db),
    pages: { signIn: "/", signOut: "/", error: "/api/auth/error" },
});