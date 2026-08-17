import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Guest from "@/lib/models/Guest";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const RsvpSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  attending: z.boolean(),
  guestCount: z.number().min(1).max(10).default(1),
  dietaryReq: z.string().default("Aucun"),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await connectToDatabase();

    // Check if email already exists
    const existing = await Guest.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        { error: "Cette adresse email a déjà été enregistrée." },
        { status: 409 }
      );
    }

    // Generate unique QR code content
    const guestId = uuidv4();
    const qrContent = JSON.stringify({
      id: guestId,
      name: `${data.firstName} ${data.lastName}`,
      event: "Mariage Sandrine & Alain — 23 Jan 2027",
    });

    const qrCodeDataUrl = await QRCode.toDataURL(qrContent, {
      errorCorrectionLevel: "H",
      width: 300,
      margin: 2,
      color: {
        dark: "#86437E",
        light: "#FFF8F8",
      },
    });

    // Save to MongoDB — tableNumber is null (assigned later by the couple)
    const guest = await Guest.create({
      ...data,
      tableNumber: null,
      qrCode: qrCodeDataUrl,
    });

    return NextResponse.json(
      {
        success: true,
        guest: {
          id: guest._id,
          firstName: guest.firstName,
          lastName: guest.lastName,
          attending: guest.attending,
          tableNumber: guest.tableNumber,
          qrCode: guest.qrCode,
        },
        message: data.attending
          ? "Votre présence a été confirmée ! À très bientôt."
          : "Votre réponse a bien été enregistrée. Merci.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[RSVP API Error]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const count = await Guest.countDocuments({ attending: true });
    return NextResponse.json({ confirmedCount: count });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
