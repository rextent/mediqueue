import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-base-200 bg-slate-50">
      <div className="container-width grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        
        {/* LOGO & DESCRIPTION */}
        <div>
          <div className="mb-5 flex items-center gap-3">
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
          </div>

          <p className="text-sm leading-7 text-gray-600">
            MediQueue helps students connect with professional tutors
            through an easy and organized online booking system.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-600">
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
              <Link href="/my-bookings">My Bookings</Link>
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Learning Services
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li>Online Tutoring</li>
            <li>Offline Sessions</li>
            <li>Exam Preparation</li>
            <li>Subject Consultation</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Contact Us
          </h3>

          <div className="space-y-3 text-gray-600">
            <p>support@mediqueue.com</p>
            <p>+880 1234-567890</p>
            <p>Dhaka, Bangladesh</p>
          </div>

          {/* SOCIAL */}
          <div className="mt-6 flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:-translate-y-1">
              <FaFacebookF />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:-translate-y-1">
              <FaLinkedinIn />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:-translate-y-1">
              <FaYoutube />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:-translate-y-1">
              <FaXTwitter />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-base-200 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MediQueue. All Rights Reserved.
      </div>
    </footer>
  );
}