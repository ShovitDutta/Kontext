import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { articles, generatedContents } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/../auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const id = params.id;

    if (!id) {
        return new NextResponse(JSON.stringify({ error: "Article ID is required" }), {
            status: 400,
        });
    }

    try {
        const article = await db.query.articles.findFirst({
            where: eq(articles.id, id),
            with: {
                generatedContents: true,
            },
        });

        if (!article) {
            return new NextResponse(JSON.stringify({ error: "Article not found" }), {
                status: 404,
            });
        }

        return new NextResponse(JSON.stringify(article), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(`Error in GET /api/news/${id}:`, error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch article" }), {
            status: 500,
        });
    }
}