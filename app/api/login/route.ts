import { NextResponse } from "next/server";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { uid, email, name, photoURL, authProvider = "email" } = body;

        if (!uid || !email) {
            return NextResponse.json(
                { success: false, message: "Missing required fields: uid or email" },
                { status: 400 }
            );
        }

        const userDocRef = doc(db, "shop-users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            // First time login (e.g. Google auth or direct signin) -> create document
            await setDoc(userDocRef, {
                uid,
                name: name || "User",
                email: email.toLowerCase().trim(),
                photoURL: photoURL || null,
                authProvider,
                role: "user",
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } else {
            // Update last login timestamp and any updated profile info
            const updatePayload: Record<string, unknown> = {
                lastLoginAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            if (name) updatePayload.name = name;
            if (photoURL) updatePayload.photoURL = photoURL;

            await setDoc(userDocRef, updatePayload, { merge: true });
        }

        return NextResponse.json({
            success: true,
            message: "Login record updated successfully in shop-users collection.",
            data: { uid, email },
        });
    } catch (error: unknown) {
        console.error("API /api/login error:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json(
            { success: false, message: "Failed to record login in database.", error: message },
            { status: 500 }
        );
    }
}
