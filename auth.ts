import NextAuth from "next-auth";
import { db } from "./src/lib/db";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
if (!db) throw new Error("Database is not initialized");
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Google],
    adapter: DrizzleAdapter(db),
});