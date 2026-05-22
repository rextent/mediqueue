"use client";

import Link from "next/link";

import {
    HiOutlineMenuAlt3,
} from "react-icons/hi";


import { authClient }
    from "@/lib/auth-client";

import { toast }
    from "react-toastify";
import Image from "next/image";

import {
    useTheme,
} from "next-themes";



export default function AppNavbar() {

    const {
        theme,
        setTheme,
    } = useTheme();

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

        <div className="sticky
top-0
z-50
border-b
border-gray-100
bg-white/90
backdrop-blur-lg

dark:border-slate-800
dark:bg-slate-950/90">

            <div className="navbar mx-auto h-[78px] w-full max-w-[1400px] px-4 lg:px-8">

                {/* LEFT */}
                <div className="navbar-start flex-[1.1] min-w-0 gap-2">

                    {/* MOBILE MENU */}
                    <div className="dropdown lg:hidden">

                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-sm"
                        >

                            <HiOutlineMenuAlt3 className="text-2xl text-slate-800" />

                        </label>

                        <ul
                            tabIndex={0}
                            className="menu
dropdown-content
z-[100]
mt-3
w-64
rounded-3xl
border
border-gray-100
bg-white
p-4
shadow-2xl

dark:border-slate-700
dark:bg-slate-900
dark:text-white"
                        >

                            {navLinks}

                        </ul>

                    </div>

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="flex min-w-0 items-center gap-2 sm:gap-3"
                    >

                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-md sm:h-11 sm:w-11 sm:text-xl">

                            M

                        </div>

                        <div className="min-w-0 leading-tight">

                            <h1 className="max-w-[125px]
overflow-hidden
text-ellipsis
whitespace-nowrap
font-heading
text-xl
font-bold
text-slate-900
sm:max-w-full
sm:text-[34px]

dark:text-white">

                                MediQueue

                            </h1>

                            <p className="hidden
text-xs
text-gray-500
sm:block

dark:text-gray-400">

                                Tutor Booking Platform

                            </p>

                        </div>

                    </Link>

                </div>

                {/* CENTER */}
                <div className="navbar-center hidden flex-[1.3] justify-center lg:flex">

                    <ul className="menu
menu-horizontal
flex-nowrap
gap-1
px-1
text-[15px]
font-medium
text-slate-700
xl:gap-3

dark:text-gray-200">

                        {navLinks}

                    </ul>

                </div>

                {/* RIGHT */}
                <div className="navbar-end flex flex-[1.1] justify-end">

                    {
                        session?.user ? (

                            <div className="dropdown dropdown-end">

                                <label
                                    tabIndex={0}

                                    className="flex
cursor-pointer
items-center
gap-3
rounded-full
border
border-gray-200
bg-white
px-3
py-2
shadow-sm
transition
hover:shadow-md

dark:border-slate-700
dark:bg-slate-900"
                                >

                                    {/* IMAGE */}
                                    <div className="relative h-11 w-11 overflow-hidden rounded-full">

                                        <Image
                                            src={
                                                session?.user?.image ||
                                                "/default-user.png"
                                            }

                                            alt="User"

                                            fill

                                            className="object-cover"
                                        />

                                    </div>

                                    {/* NAME */}
                                    <div className="hidden text-left lg:block">

                                        <h3 className="max-w-[140px]
truncate
text-sm
font-semibold
text-slate-900

dark:text-white">

                                            {
                                                session?.user?.name
                                            }

                                        </h3>

                                        <p className="text-xs
text-gray-500

dark:text-gray-400">

                                            My Account

                                        </p>

                                    </div>

                                    {/* ARROW */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"

                                        className="hidden h-4 w-4 text-gray-500 lg:block"

                                        fill="none"

                                        viewBox="0 0 24 24"

                                        stroke="currentColor"
                                    >

                                        <path
                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            strokeWidth={2}

                                            d="M19 9l-7 7-7-7"
                                        />

                                    </svg>

                                </label>

                                {/* DROPDOWN */}
                                <ul
                                    tabIndex={0}

                                    className="menu
dropdown-content
z-[100]
mt-3
w-56
rounded-2xl
border
border-gray-100
bg-white
p-3
shadow-xl

dark:border-slate-700
dark:bg-slate-900
dark:text-white"
                                >

                                    <li>

                                        <Link href="/my-account">

                                            My Account

                                        </Link>

                                    </li>

                                    <li>

                                        <button
                                            onClick={handleLogout}

                                            className="text-red-500"
                                        >

                                            Logout

                                        </button>

                                    </li>

                                </ul>

                            </div>

                        ) : (

                            <div className="flex items-center gap-2">

                                <button

                                    onClick={() =>
                                        setTheme(
                                            theme === "dark"
                                                ? "light"
                                                : "dark"
                                        )
                                    }

                                    className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black"
                                >

                                    {
                                        theme === "dark"
                                            ? "☀️"
                                            : "🌙"
                                    }

                                </button>

                                <Link
                                    href="/login"

                                    className="btn h-10 min-h-0 rounded-2xl border border-blue-200 bg-white px-4 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50 sm:h-11 sm:px-6 sm:text-base"
                                >

                                    Login

                                </Link>

                                <Link
                                    href="/register"

                                    className="btn h-10 min-h-0 rounded-2xl border-0 bg-blue-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 sm:h-11 sm:px-6 sm:text-base"
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