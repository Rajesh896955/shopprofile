import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, business, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const docRef = await addDoc(collection(db, "shop-contact"), {
            name: String(name).trim(),
            email: String(email).trim().toLowerCase(),
            business: business ? String(business).trim() : null,
            subject: subject ? String(subject) : "general",
            message: String(message).trim(),
            status: "unread",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return NextResponse.json(
            {
                success: true,
                id: docRef.id,
                message: "Contact message stored successfully in shop-contact collection.",
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("API /api/contact error:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json(
            { success: false, message: "Failed to store contact enquiry.", error: message },
            { status: 500 }
        );
    }
}
