"use client";

import axios from "axios";

import Link from "next/link";

import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";


export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const result =
        await authClient.signIn.email({

          email,
          password,

          callbackURL: window.location.origin

        });

      console.log(result);

      // JWT TOKEN CREATE
      await axios.post(

        "https://mediqueue-server-f.vercel.app/jwt",

        {
          email,
        },

        {
          withCredentials: true,
        }
      );

      toast.success(
        "Login successful!"
      );

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      toast.error("Login failed!");

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
            `${window.location.origin}`,

          fetchOptions: {

            onSuccess: () => {

              window.location.href =
                "/";
            },
          },
        });

      } catch (error) {

        console.error(error);

        toast.error(
          "Google login failed!"
        );

      }

    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">

      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl">

        {/* TITLE */}
        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Welcome Back
          </h2>

          <p className="mt-3 text-gray-500">
            Login to continue learning.
          </p>

        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-gray-50"
        >
          <FcGoogle size={24} />

          Continue with Google
        </button>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">

          <div className="h-[1px] w-full bg-gray-200"></div>

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="h-[1px] w-full bg-gray-200"></div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="hello@ecomplix.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

        </form>

        {/* REGISTER */}
        <p className="mt-6 text-center text-sm text-gray-500">

          Dont have an account?

          <Link
            href="/register"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
}