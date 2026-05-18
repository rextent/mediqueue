"use client";

import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function AppNavbar() {
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
    <div className="sticky top-0 z-50 border-b border-base-200 bg-white/80 backdrop-blur-lg">
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
          <Link
            href="/login"
            className="btn rounded-xl border-0 bg-blue-600 px-6 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}