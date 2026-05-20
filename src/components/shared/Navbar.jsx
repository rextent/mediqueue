"use client";

import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AppNavbar() {
    const { data: session } = authClient.useSession();

    console.log(session);
    

    const handleLogout = async () => {

        await authClient.signOut();
        
        toast.success("Logged out!");

        window.location.href = "/";

    };

    const navLinks = (
        <>
            <li>
                <Link href="/">Home</Link>
            </li>

            <li>
                <Link href="/tutors">Tutors</Link>
            </li>

            <li>
                <Link href="/add-tutor">Add Tutor</Link>
            </li>

            <li>
                <Link href="/my-tutors">My Tutors</Link>
            </li>

            <li>
                <Link href="/my-bookings">My Bookings</Link>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50  bg-white/80 backdrop-blur-lg">
            <div className="navbar container-width py-2">

                {/* LEFT */}
                <div className="navbar-start">

                    {/* MOBILE MENU */}
                    <div className="dropdown lg:hidden">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost"
                        >
                            <HiOutlineMenuAlt3 className="text-2xl" />
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-[1] mt-3 w-56 rounded-2xl bg-base-100 p-3 shadow-xl"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl font-bold text-white">
                            M
                        </div>

                        <div>
                            <h1 className="font-heading text-2xl font-bold">
                                MediQueue
                            </h1>

                            <p className="text-xs text-gray-500">
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

                            <div className="flex items-center gap-3">

                                <img
                                    src={
                                        session.user.image ||
                                        "/default-user.png"
                                    }
                                    alt="user"
                                    className="h-11 w-11 rounded-full border object-cover"
                                />

                                <button
                                    onClick={handleLogout}
                                    className="btn rounded-xl border-0 bg-red-500 px-6 text-white hover:bg-red-600"
                                >
                                    Logout
                                </button>

                            </div>

                        ) : (

                            <div className="flex items-center gap-3">

                                <Link
                                    href="/login"
                                    className="btn rounded-xl border border-blue-200 bg-white px-6 text-blue-600 hover:bg-blue-50"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="btn rounded-xl border-0 bg-blue-600 px-6 text-white hover:bg-blue-700"
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