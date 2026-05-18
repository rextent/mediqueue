"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-16">
      
      <div className="container-width">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-8 py-20 text-center shadow-2xl lg:px-20"
        >
          
          {/* GLOW EFFECTS */}
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

          {/* CONTENT */}
          <div className="relative z-10 mx-auto max-w-4xl">
            
            {/* BADGE */}
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
              🚀 Start Learning Smarter
            </div>

            {/* TITLE */}
            <h2 className="font-heading text-4xl font-extrabold leading-tight text-white lg:text-6xl">
              Start Your Learning Journey Today
            </h2>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Connect with experienced tutors, book personalized
              sessions, and improve your learning experience with
              MediQueue.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              
              <Link
                href="/tutors"
                className="btn border-0 bg-white px-8 py-3 text-blue-700 hover:bg-slate-100"
              >
                Find Tutors
              </Link>

              <Link
                href="/register"
                className="btn border border-white/30 bg-white/10 px-8 py-3 text-white backdrop-blur-md hover:bg-white/20"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}