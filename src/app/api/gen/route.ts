import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { eq, and } from "drizzle-orm";
import { generateContent } from "@/lib/generate";
import { NextRequest, NextResponse } from "next/server";
import { contentLengthEnum, generatedContents } from "@/lib/db/schema";
const generateRequestSchema = z.object({ articleId: z.string(), length: z.enum(contentLengthEnum.enumValues) });
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    try {
        const body = await req.json();
        const parsed = generateRequestSchema.safeParse(body);
        if (!parsed.success) return new Response(JSON.stringify({ error: "Invalid request body", issues: parsed.error.issues }), { status: 400 });
        const { articleId, length } = parsed.data;
        await generateContent(articleId, length);
        const newContent = await db.query.generatedContents.findFirst({ where: and(eq(generatedContents.articleId, articleId), eq(generatedContents.length, length)) });
        return new Response(JSON.stringify({ content: newContent?.content }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error in POST /api/generate-blog:", error);
        return new Response(JSON.stringify({ error: "Failed to generate content" }), { status: 500 });
    }
}