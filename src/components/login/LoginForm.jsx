"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

import axios from "axios";

import { authClient } from "@/lib/auth-client";

const LoginForm = () => {

  const router = useRouter();

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

        const result =

          await authClient.signIn.email({

            email,

            password,

            callbackURL:
              window.location.origin +
              redirectPath,
          });

        console.log(result);

        // JWT TOKEN
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

        router.push(
          redirectPath
        );

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
            window.location.origin +
            redirectPath,
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Google login failed!"
        );
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-4xl font-bold text-center text-primary mb-3">

          Welcome Back

        </h2>

        <p className="text-center text-gray-500 mb-8">

          Login to continue learning.

        </p>

        {/* GOOGLE LOGIN */}

        <button

          onClick={handleGoogleLogin}

          className="btn btn-outline w-full mb-6"
        >

          Continue with Google

        </button>

        <div className="divider">

          OR

        </div>

        {/* LOGIN FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="label">

              Email Address

            </label>

            <input

              type="email"

              placeholder="hello@example.com"

              className="input input-bordered w-full"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              required
            />

          </div>

          <div>

            <label className="label">

              Password

            </label>

            <input

              type="password"

              placeholder="********"

              className="input input-bordered w-full"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              required
            />

          </div>

          <button

            type="submit"

            disabled={loading}

            className="btn btn-primary w-full"
          >

            {

              loading

                ? "Loading..."

                : "Login"
            }

          </button>

        </form>

        <p className="text-center mt-6 text-sm">

          Don&apos;t have an account?{" "}

          <Link

            href="/register"

            className="text-primary font-semibold"
          >

            Register

          </Link>

        </p>

      </div>

    </div>
  );
};

export default LoginForm;