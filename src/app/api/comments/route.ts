import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comments, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (!articleId) {
        return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const result = await db
        .select({
            id: comments.id,
            text: comments.text,
            createdAt: comments.createdAt,
            user: {
                name: users.name,
                image: users.image,
            },
        })
        .from(comments)
        .leftJoin(users, eq(comments.userId, users.id))
        .where(eq(comments.articleId, articleId))
        .orderBy(comments.createdAt);

    return NextResponse.json({ comments: result });
}

export async function POST(request: Request) {
    const { articleId, text, userName } = await request.json();

    if (!articleId || !text || !userName) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // For simplicity, we'll find or create a user by name.
    // In a real app, you'd have user authentication.
    let user = await db.query.users.findFirst({
        where: eq(users.email, `${userName}@example.com`),
    });

    if (!user) {
        const newUser = await db
            .insert(users)
            .values({
                id: crypto.randomUUID(),
                name: userName,
                email: `${userName}@example.com`, // Dummy email
            })
            .returning();
        user = newUser[0];
    }

    const newComment = await db
        .insert(comments)
        .values({
            id: crypto.randomUUID(),
            text,
            articleId,
            userId: user.id,
        })
        .returning();

    const result = {
        ...newComment[0],
        user: {
            name: user.name,
            image: user.image,
        },
    };

    return NextResponse.json(result, { status: 201 });
}
