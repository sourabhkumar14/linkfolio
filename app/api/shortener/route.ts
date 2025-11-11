import { NextResponse } from "next/server";

type URLData = {
  code: string;
  original: string;
};

const db: URLData[] = []; // in-memory temporary DB (you can later connect Prisma)

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || !/^https?:\/\//.test(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // generate a short unique code
    const code = Math.random().toString(36).substring(2, 8);
    db.push({ code, original: url });

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/s/${code}`;

    return NextResponse.json({ shortUrl });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Redirect handler (for GET requests)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const found = db.find((entry) => entry.code === code);
  if (!found) return NextResponse.json({ error: "URL not found" }, { status: 404 });

  return NextResponse.redirect(found.original);
}




