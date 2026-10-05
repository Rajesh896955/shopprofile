import { NextResponse } from "next/server";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { uid, name, email, authProvider = "email", photoURL = null, role = "user" } = body;

        if (!uid || !email) {
            return NextResponse.json(
                { success: false, message: "Missing required fields: uid or email" },
                { status: 400 }
            );
        }

        const userDocRef = doc(db, "shop-users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            // If user already exists, update last login and provider info
            await setDoc(
                userDocRef,
                {
                    lastLoginAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );

            return NextResponse.json({
                success: true,
                message: "User already exists, session updated.",
                data: { uid, email, name },
            });
        }

        // Create new user in shop-users collection
        const newUserData = {
            uid,
            name: name || "User",
            email: email.toLowerCase().trim(),
            photoURL,
            authProvider,
            role,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        await setDoc(userDocRef, newUserData);

        return NextResponse.json(
            {
                success: true,
                message: "User document created successfully in shop-users collection.",
                data: { uid, email, name },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("API /api/signup error:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json(
            { success: false, message: "Failed to store user data in database.", error: message },
            { status: 500 }
        );
    }
}
