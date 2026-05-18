"use client";

import Link from "next/link";

import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // REGISTER
  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const result =
        await authClient.signUp.email({

          name,

          image,

          email,

          password,

          callbackURL: "/",

        });

      console.log(result);

      toast.success(
        "Account created successfully!"
      );

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      toast.error("Registration failed!");

    } finally {

      setLoading(false);

    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {

    try {

      await authClient.signIn.social({

        provider: "google",

        callbackURL: "/",

      });

    } catch (error) {

      console.error(error);

      toast.error("Google login failed!");

    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">

      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl">

        {/* TITLE */}
        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Create Account
          </h2>

          <p className="mt-3 text-gray-500">
            Join MediQueue and start learning smarter.
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
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* NAME */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* IMAGE */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Image URL
            </label>

            <input
              type="text"
              placeholder="https://i.ibb.co/example/photo.jpg"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
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
                ? "Creating Account..."
                : "Register"
            }

          </button>

        </form>

        {/* LOGIN */}
        <p className="mt-6 text-center text-sm text-gray-500">

          Already have an account?

          <Link
            href="/login"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}