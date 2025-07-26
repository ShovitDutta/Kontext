import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { articles } from "@/lib/db/schema";
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id: string = params.id;
    try {
        const article = await db.query.articles.findFirst({ where: eq(articles.id, id), with: { generatedContents: true } });
        if (!article) return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
        return new Response(JSON.stringify(article), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error(`Error in GET /api/news/${id}:`, error);
        return new Response(JSON.stringify({ error: "Failed to fetch article" }), { status: 500 });
    }
}
