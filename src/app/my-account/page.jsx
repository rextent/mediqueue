"use client";

import { useState } from "react";

import Image from "next/image";

import axios from "axios";

import {
  FaEnvelope,
  FaUserGraduate,
  FaShieldAlt,
  FaCamera,
  FaUserEdit,
} from "react-icons/fa";

import {
  authClient,
} from "@/lib/auth-client";

import PrivateRoute from "@/components/PrivateRoute";

const MyAccountPage = () => {

  const { data: session } =
    authClient.useSession();

  const user =
    session?.user;

  // FORM STATES
  const [name, setName] =
    useState(
      user?.name || ""
    );

  const [image, setImage] =
    useState(
      user?.image || ""
    );

  const [updating, setUpdating] =
    useState(false);

  // UPDATE PROFILE
  const handleUpdateProfile =
    async (e) => {

      e.preventDefault();

      try {

        setUpdating(true);

        await axios.patch(

          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user.email}`,

          {
            name,
            image,
          }
        );

        alert(
          "Profile updated successfully"
        );

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );

      } finally {

        setUpdating(false);
      }
    };

  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">

          {/* COVER */}
          <div className="relative h-52 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400">

            <div className="absolute inset-0 bg-black/10"></div>

          </div>

          {/* CONTENT */}
          <div className="relative px-6 pb-10">

            {/* PROFILE IMAGE */}
            <div className="-mt-20 flex justify-center">

              <div className="relative">

                <div className="relative h-40 w-40 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-2xl">

                  <Image
                    src={
                      image ||
                      user?.image ||
                      "/default-user.png"
                    }

                    alt="User"

                    fill

                    className="object-cover"
                  />

                </div>

                {/* CAMERA ICON */}
                <div className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">

                  <FaCamera />

                </div>

              </div>

            </div>

            {/* NAME */}
            <div className="mt-6 text-center">

              <h1 className="text-4xl font-bold text-slate-900">

                {
                  name ||
                  user?.name ||
                  "User"
                }

              </h1>

              <p className="mt-2 text-base text-gray-500">

                MediQueue User Profile

              </p>

            </div>

            {/* INFO CARDS */}
            <div className="mt-10 grid gap-5 md:grid-cols-3">

              {/* EMAIL */}
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-6 shadow-sm">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

                  <FaEnvelope className="text-2xl" />

                </div>

                <p className="text-sm text-gray-500">

                  Email Address

                </p>

                <h3 className="mt-2 break-all font-semibold text-slate-900">

                  {user?.email}

                </h3>

              </div>

              {/* ACCOUNT TYPE */}
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-6 shadow-sm">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">

                  <FaUserGraduate className="text-2xl" />

                </div>

                <p className="text-sm text-gray-500">

                  Account Type

                </p>

                <h3 className="mt-2 font-semibold text-slate-900">

                  Student / Tutor

                </h3>

              </div>

              {/* AUTH */}
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-6 shadow-sm">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">

                  <FaShieldAlt className="text-2xl" />

                </div>

                <p className="text-sm text-gray-500">

                  Authentication

                </p>

                <h3 className="mt-2 font-semibold text-slate-900">

                  Better Auth Secure Login

                </h3>

              </div>

            </div>

            {/* UPDATE FORM */}
            <div className="mt-10 rounded-[32px] border border-gray-100 bg-slate-50 p-8">

              {/* TITLE */}
              <div className="mb-8 flex items-center gap-3">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

                  <FaUserEdit className="text-2xl" />

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">

                    Update Profile

                  </h2>

                  <p className="text-sm text-gray-500">

                    Change your profile information

                  </p>

                </div>

              </div>

              {/* FORM */}
              <form
                onSubmit={
                  handleUpdateProfile
                }

                className="space-y-6"
              >

                {/* NAME */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">

                    Full Name

                  </label>

                  <input
                    type="text"

                    value={name}

                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }

                    placeholder="Enter your full name"

                    className="input input-bordered h-14 w-full rounded-2xl border-gray-200 bg-white px-5 text-base focus:border-blue-500 focus:outline-none"
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">

                    Email Address

                  </label>

                  <input
                    type="email"

                    value={
                      user?.email || ""
                    }

                    readOnly

                    className="input input-bordered h-14 w-full cursor-not-allowed rounded-2xl border-gray-200 bg-gray-100 px-5 text-base"
                  />

                </div>

                {/* IMAGE URL */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">

                    Profile Image URL

                  </label>

                  <input
                    type="text"

                    value={image}

                    onChange={(e) =>
                      setImage(
                        e.target.value
                      )
                    }

                    placeholder="Paste your image URL"

                    className="input input-bordered h-14 w-full rounded-2xl border-gray-200 bg-white px-5 text-base focus:border-blue-500 focus:outline-none"
                  />

                </div>

                {/* BUTTON */}
                <button
                  type="submit"

                  disabled={updating}

                  className="btn h-14 rounded-2xl border-0 bg-blue-600 px-10 text-base font-semibold text-white transition hover:bg-blue-700"
                >

                  {
                    updating
                      ? "Updating..."
                      : "Save Changes"
                  }

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

const MyAccountWrapper = () => {

  return (

    <PrivateRoute>

      <MyAccountPage />

    </PrivateRoute>
  );
};

export default MyAccountWrapper;