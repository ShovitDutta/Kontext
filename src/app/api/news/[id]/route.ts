import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const article = await db.query.articles.findFirst({
            where: eq(articles.id, params.id),
            with: {
                generatedContents: true,
            },
        });

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
