"use client";

import { useState } from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import {
    useSearchParams,
} from "next/navigation";

import { authClient }
from "@/lib/auth-client";

const LoginForm = () => {

    const searchParams =
        useSearchParams();

    const redirectPath =

        searchParams.get(
            "redirect"
        ) || "/";

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    // EMAIL LOGIN
    const handleLogin =
        async (e) => {

            e.preventDefault();

            setLoading(true);

            try {

                await authClient.signIn.email({

                    email,

                    password,

                    fetchOptions: {

                        onSuccess: () => {

                            toast.success(
                                "Login successful!"
                            );

                            // WAIT FOR COOKIE
                            setTimeout(() => {

                                window.location.replace(
                                    redirectPath
                                );

                            }, 800);
                        },
                    },
                });

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to login"
                );

            } finally {

                setLoading(false);
            }
        };

    // GOOGLE LOGIN
    const handleGoogleLogin =
        async () => {

            try {

                await authClient.signIn.social({

                    provider: "google",

                    callbackURL:
                        `${window.location.origin}${redirectPath}`,
                });

            } catch (error) {

                console.log(error);

                toast.error(
                    "Google login failed!"
                );
            }
        };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-10">

            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-gray-100 p-8">

                {/* TOP */}

                <div className="text-center mb-8">

                    <h2 className="text-5xl font-bold text-indigo-600 mb-3">

                        Welcome Back

                    </h2>

                    <p className="text-gray-500 text-base">

                        Login to continue learning.

                    </p>

                </div>

                {/* GOOGLE BUTTON */}

                <button

                    onClick={handleGoogleLogin}

                    className="w-full h-12 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700 flex items-center justify-center gap-3 mb-6"
                >

                    <img

                        src="https://www.svgrepo.com/show/475656/google-color.svg"

                        alt="google"

                        className="w-5 h-5"
                    />

                    Continue with Google

                </button>

                {/* DIVIDER */}

                <div className="flex items-center gap-4 mb-6">

                    <div className="flex-1 h-[1px] bg-gray-200"></div>

                    <span className="text-sm text-gray-400 font-medium">

                        OR

                    </span>

                    <div className="flex-1 h-[1px] bg-gray-200"></div>

                </div>

                {/* LOGIN FORM */}

                <form

                    onSubmit={handleLogin}

                    className="space-y-5"
                >

                    {/* EMAIL */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Email Address

                        </label>

                        <input

                            type="email"

                            placeholder="hello@example.com"

                            className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-black placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"

                            value={email}

                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }

                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Password

                        </label>

                        <input

                            type="password"

                            placeholder="********"

                            className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-black placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"

                            value={password}

                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }

                            required
                        />

                    </div>

                    {/* BUTTON */}

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white font-semibold shadow-lg"
                    >

                        {

                            loading

                                ? "Loading..."

                                : "Login"
                        }

                    </button>

                </form>

                {/* REGISTER */}

                <p className="text-center text-sm text-gray-500 mt-7">

                    Don&apos;t have an account?{" "}

                    <Link

                        href="/register"

                        className="text-indigo-600 font-semibold hover:underline"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>
    );
};

export default LoginForm;