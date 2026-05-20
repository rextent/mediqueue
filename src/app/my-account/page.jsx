"use client";

import Image from "next/image";

import {
    FaEnvelope,
    FaUserGraduate,
    FaShieldAlt,
} from "react-icons/fa";

import {
    authClient,
} from "@/lib/auth-client";

import PrivateRoute
from "@/components/PrivateRoute";

const MyAccountPage = () => {

    const { data: session } =
        authClient.useSession();

    const user =
        session?.user;

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10">

            <div className="mx-auto max-w-3xl">

                {/* CARD */}
                <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">

                    {/* TOP COVER */}
                    <div className="h-40 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400"></div>

                    {/* PROFILE */}
                    <div className="relative px-6 pb-10">

                        {/* IMAGE */}
                        <div className="-mt-16 flex justify-center">

                            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">

                                <Image
                                    src={
                                        user?.image ||
                                        "/default-user.png"
                                    }

                                    alt="User"

                                    fill

                                    className="object-cover"
                                />

                            </div>

                        </div>

                        {/* NAME */}
                        <div className="mt-5 text-center">

                            <h1 className="text-3xl font-bold text-slate-900">

                                {
                                    user?.name ||
                                    "User"
                                }

                            </h1>

                            <p className="mt-2 text-gray-500">

                                MediQueue User Account

                            </p>

                        </div>

                        {/* INFO */}
                        <div className="mt-10 grid gap-5">

                            {/* EMAIL */}
                            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-slate-50 p-5">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

                                    <FaEnvelope className="text-xl" />

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500">

                                        Email Address

                                    </p>

                                    <h3 className="font-semibold text-slate-900">

                                        {
                                            user?.email
                                        }

                                    </h3>

                                </div>

                            </div>

                            {/* ACCOUNT TYPE */}
                            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-slate-50 p-5">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">

                                    <FaUserGraduate className="text-xl" />

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500">

                                        Account Type

                                    </p>

                                    <h3 className="font-semibold text-slate-900">

                                        Student / Tutor

                                    </h3>

                                </div>

                            </div>

                            {/* AUTH PROVIDER */}
                            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-slate-50 p-5">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">

                                    <FaShieldAlt className="text-xl" />

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500">

                                        Authentication

                                    </p>

                                    <h3 className="font-semibold text-slate-900">

                                        Secure Better Auth Login

                                    </h3>

                                </div>

                            </div>

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