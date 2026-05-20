"use client";

import Link from "next/link";

import { HiOutlineMenuAlt3 }
from "react-icons/hi";

import { authClient }
from "@/lib/auth-client";

import { toast }
from "react-toastify";

export default function AppNavbar() {

    const { data: session } =
        authClient.useSession();

    const handleLogout =
        async () => {

            await authClient.signOut();

            toast.success(
                "Logged out!"
            );

            window.location.href = "/";
        };

    const navLinks = (
        <>

            <li>
                <Link href="/">
                    Home
                </Link>
            </li>

            <li>
                <Link href="/tutors">
                    Tutors
                </Link>
            </li>

            <li>
                <Link href="/add-tutor">
                    Add Tutor
                </Link>
            </li>

            <li>
                <Link href="/my-tutors">
                    My Tutors
                </Link>
            </li>

            <li>
                <Link href="/my-bookings">
                    My Bookings
                </Link>
            </li>

        </>
    );

    return (

        <div className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-lg">

            <div className="navbar mx-auto max-w-7xl px-3 py-2 lg:px-6">

                {/* LEFT */}
                <div className="navbar-start gap-2">

                    {/* MOBILE MENU */}
                    <div className="dropdown lg:hidden">

                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-sm"
                        >

                            <HiOutlineMenuAlt3 className="text-2xl" />

                        </label>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-[100] mt-3 w-60 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl"
                        >

                            {navLinks}

                        </ul>

                    </div>

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 sm:gap-3"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white sm:h-11 sm:w-11 sm:text-xl">

                            M

                        </div>

                        <div className="leading-tight">

                            <h1 className="font-heading text-lg font-bold sm:text-2xl">

                                MediQueue

                            </h1>

                            <p className="hidden text-xs text-gray-500 sm:block">

                                Tutor Booking Platform

                            </p>

                        </div>

                    </Link>

                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">

                    <ul className="menu menu-horizontal gap-2 px-1 font-medium">

                        {navLinks}

                    </ul>

                </div>

                {/* RIGHT */}
                <div className="navbar-end">

                    {
                        session?.user ? (

                            <div className="flex items-center gap-2 sm:gap-3">

                                <img
                                    src={
                                        session.user.image ||
                                        "/default-user.png"
                                    }

                                    alt="user"

                                    className="h-10 w-10 rounded-full border-2 border-white object-cover shadow sm:h-11 sm:w-11"
                                />

                                <button
                                    onClick={handleLogout}

                                    className="btn h-10 min-h-0 rounded-xl border-0 bg-red-500 px-4 text-sm text-white hover:bg-red-600 sm:h-11 sm:px-6 sm:text-base"
                                >

                                    Logout

                                </button>

                            </div>

                        ) : (

                            <div className="flex items-center gap-2">

                                <Link
                                    href="/login"

                                    className="btn h-10 min-h-0 rounded-xl border border-blue-200 bg-white px-4 text-sm text-blue-600 hover:bg-blue-50 sm:h-11 sm:px-6 sm:text-base"
                                >

                                    Login

                                </Link>

                                <Link
                                    href="/register"

                                    className="btn h-10 min-h-0 rounded-xl border-0 bg-blue-600 px-4 text-sm text-white hover:bg-blue-700 sm:h-11 sm:px-6 sm:text-base"
                                >

                                    Register

                                </Link>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>
    );
}