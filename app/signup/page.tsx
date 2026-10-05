"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            // 1. Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;

            // 2. Update user profile display name
            await updateProfile(user, {
                displayName: name.trim(),
            });

            // 3. Send data to secure API route (/api/signup) to store in Firestore "shop-users"
            const apiRes = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    name: name.trim(),
                    email: user.email,
                    photoURL: user.photoURL || null,
                    authProvider: "email",
                    role: "user",
                }),
            });

            const apiData = await apiRes.json();
            if (!apiRes.ok || !apiData.success) {
                console.warn("Backend sync notice:", apiData.message);
            }

            router.refresh();
        } catch (err: unknown) {
            const firebaseErr = err as { code?: string; message?: string };
            if (firebaseErr.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please sign in.");
            } else if (firebaseErr.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else if (firebaseErr.code === "auth/weak-password") {
                setError("Password must be at least 6 characters.");
            } else {
                setError(firebaseErr.message || "Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            setGoogleLoading(true);
            setError("");

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Send data to secure API route (/api/signup) to store in Firestore "shop-users"
            const apiRes = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    name: user.displayName || name.trim() || "User",
                    email: user.email,
                    photoURL: user.photoURL || null,
                    authProvider: "google",
                    role: "user",
                }),
            });

            const apiData = await apiRes.json();
            if (!apiRes.ok || !apiData.success) {
                console.warn("Backend sync notice:", apiData.message);
            }


            router.refresh();
        } catch (err: unknown) {
            const firebaseErr = err as { code?: string; message?: string };
            if (firebaseErr.code === "auth/popup-closed-by-user") {
                setError("Google sign up was cancelled.");
            } else if (firebaseErr.code === "auth/account-exists-with-different-credential") {
                setError("An account already exists with the same email.");
            } else {
                setError(firebaseErr.message || "Google signup failed. Please try again.");
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

                    {/* Branding */}
                    <div className="relative hidden min-h-[700px] overflow-hidden bg-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
                        <div className="relative z-10 max-w-md">

                            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                                Build your
                                <br />
                                digital shop
                                <br />
                                today.
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                Create your shop profile, add products and let customers
                                discover your business through one beautiful digital page.
                            </p>

                            <div className="mt-8 space-y-4 text-sm text-slate-300">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                        ✓
                                    </span>
                                    Create your digital shop profile
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                        ✓
                                    </span>
                                    Add and manage your products
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                        ✓
                                    </span>
                                    Share your profile with QR
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 text-sm text-slate-400">
                            © {new Date().getFullYear()} ShopProfile
                        </div>
                    </div>

                    {/* Signup */}
                    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
                        <div className="w-full max-w-md">

                            <div className="mb-8 lg:hidden">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 text-2xl font-bold text-slate-900"
                                >
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                                        S
                                    </span>
                                    ShopProfile
                                </Link>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                    Create your account
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Start creating your digital shop profile.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Email Signup Form */}
                            <form onSubmit={handleSignup} className="space-y-4">

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Full name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            placeholder="Minimum 6 characters"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((value) => !value)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition-colors"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Confirm password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            placeholder="Repeat your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword((value) => !value)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition-colors"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs leading-5 text-slate-500">
                                    By creating an account, you agree to our{" "}
                                    <Link
                                        href="/terms"
                                        className="font-semibold text-slate-900 hover:underline"
                                    >
                                        Terms
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy-policy"
                                        className="font-semibold text-slate-900 hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading || googleLoading}
                                    className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        "Create account"
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-7 flex items-center gap-4">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    or sign up with
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>

                            {/* Google Signup Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                disabled={googleLoading || loading}
                                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {googleLoading ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.51 5.51 0 0 1-2.4 3.62v3.01h3.88c2.27-2.09 3.56-5.17 3.56-8.66Z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.88-3.01c-1.07.72-2.44 1.15-4.05 1.15-3.12 0-5.77-2.11-6.72-4.95H1.27v3.1A12 12 0 0 0 12 24Z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.28 14.28A7.22 7.22 0 0 1 4.9 12c0-.79.14-1.56.38-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4.01-3.1Z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77Z"
                                        />
                                    </svg>
                                )}

                                {googleLoading ? "Connecting..." : "Continue with Google"}
                            </button>

                            <p className="mt-8 text-center text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-bold text-slate-900 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
