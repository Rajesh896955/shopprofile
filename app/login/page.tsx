
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password.");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            await signIn("google", {
                callbackUrl: "/dashboard",
            });
        } catch {
            setError("Google login failed. Please try again.");
            setGoogleLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

                    {/* Left Branding */}
                    <div className="relative hidden min-h-[650px] overflow-hidden bg-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

                        <div className="relative z-10">
                            <Link href="/" className="inline-flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-slate-900">
                                    S
                                </div>

                                <span className="text-2xl font-bold">
                                    ShopProfile
                                </span>
                            </Link>
                        </div>

                        <div className="relative z-10 max-w-md">
                            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
                                Your Digital Shop
                            </span>

                            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                                Your shop.
                                <br />
                                Your products.
                                <br />
                                One profile.
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                Create your digital shop profile, showcase your products
                                and share everything with your customers through one simple
                                link or QR code.
                            </p>
                        </div>

                        <div className="relative z-10 text-sm text-slate-400">
                            © {new Date().getFullYear()} ShopProfile
                        </div>
                    </div>

                    {/* Login Form */}
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
                                    Welcome back
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Sign in to manage your shop profile.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Google */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
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

                            <div className="my-7 flex items-center gap-4">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    or continue with email
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>

                            <form onSubmit={handleLogin} className="space-y-5">

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
                                    <div className="mb-2 flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Password
                                        </label>

                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-semibold text-slate-900 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((value) => !value)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || googleLoading}
                                    className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        "Sign in"
                                    )}
                                </button>
                            </form>

                            <p className="mt-8 text-center text-sm text-slate-500">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="font-bold text-slate-900 hover:underline"
                                >
                                    Create account
                                </Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

