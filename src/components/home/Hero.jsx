"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      
      {/* BACKGROUND BLUR */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl"></div>

      <div className="container-width grid min-h-[80vh] items-center gap-14 py-14 lg:py-20 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            🎓 Smart Tutor Booking Platform
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
            Find Your Perfect <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Tutor{" "}
            </span>
            And Book <br /> Sessions
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            MediQueue helps students connect with professional tutors
            through a smooth and organized booking system for online
            and offline learning sessions.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/tutors"
              className="btn border-0 bg-blue-600 px-7 text-white hover:bg-blue-700"
            >
              Explore Tutors
            </Link>

            <Link
              href="/register"
              className="btn btn-outline border-blue-600 px-7 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Join Now
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-12 grid grid-cols-3 gap-5">
            
            <div className="rounded-2xl bg-white p-5 shadow-lg shadow-blue-100">
              <h3 className="text-3xl font-bold text-blue-600">
                500+
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Expert Tutors
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-lg shadow-cyan-100">
              <h3 className="text-3xl font-bold text-cyan-600">
                10K+
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Students
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-lg shadow-blue-100">
              <h3 className="text-3xl font-bold text-blue-600">
                98%
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Success Rate
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          
          {/* MAIN IMAGE CARD */}
          <div className="relative rounded-[40px] bg-white p-5 shadow-2xl">
            <Image
            src="/hero-student.png"
            alt="Tutor Booking"
            width={700}
            height={600}
            className="h-full w-full rounded-[30px] object-cover object-center lg:h-[580px]"
            />

            {/* FLOATING CARD 1 */}
            <div className="absolute -left-5 top-10 rounded-2xl bg-white p-4 shadow-xl">
              <h4 className="text-lg font-bold text-slate-800">
                Live Sessions
              </h4>

              <p className="text-sm text-gray-500">
                Online Learning
              </p>
            </div>

            {/* FLOATING CARD 2 */}
            <div className="absolute -bottom-6 right-10 rounded-2xl bg-white p-4 shadow-xl">
              <h4 className="text-lg font-bold text-slate-800">
                Flexible Booking
              </h4>

              <p className="text-sm text-gray-500">
                Anytime Access
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}