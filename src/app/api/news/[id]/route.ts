import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { auth } from "@/../auth";
import { articles } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const params = await props.params;
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
