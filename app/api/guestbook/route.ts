import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GuestbookEntry from "@/lib/models/GuestbookEntry";
import { z } from "zod";

const EntrySchema = z.object({
  authorName: z.string().min(2, "Nom requis"),
  message: z.string().min(5, "Message trop court").max(500, "Message trop long"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = EntrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const entry = await GuestbookEntry.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        entry: {
          id: entry._id,
          authorName: entry.authorName,
          message: entry.message,
          createdAt: entry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Guestbook API Error]", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const limit = all ? 100 : 5;

    const entries = await GuestbookEntry.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const total = await GuestbookEntry.countDocuments();

    return NextResponse.json({ entries, total });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
