import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const imageUrl = req.nextUrl.searchParams.get("url");
    if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 });
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
        const headers = new Headers();
        response.headers.forEach((value, key) => {
            if (key.toLowerCase() !== "content-disposition") headers.set(key, value);
        });
        if (!headers.has("content-type")) {
            const contentType = response.headers.get("content-type");
            if (contentType) headers.set("content-type", contentType);
            else headers.set("content-type", "application/octet-stream");
        }
        return new NextResponse(response.body, { status: response.status, headers });
    } catch (error) {
        console.error("Error proxying image:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
