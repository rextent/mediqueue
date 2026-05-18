"use client";

import { motion } from "framer-motion";

import {
  FaCalculator,
  FaAtom,
  FaFlask,
  FaDna,
  FaBookOpen,
  FaLaptopCode,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Mathematics",
    tutors: "120+ Tutors",
    icon: <FaCalculator />,
    color: "from-blue-500 to-cyan-500",
  },

  {
    id: 2,
    title: "Physics",
    tutors: "95+ Tutors",
    icon: <FaAtom />,
    color: "from-violet-500 to-purple-500",
  },

  {
    id: 3,
    title: "Chemistry",
    tutors: "80+ Tutors",
    icon: <FaFlask />,
    color: "from-pink-500 to-rose-500",
  },

  {
    id: 4,
    title: "Biology",
    tutors: "110+ Tutors",
    icon: <FaDna />,
    color: "from-emerald-500 to-green-500",
  },

  {
    id: 5,
    title: "English",
    tutors: "70+ Tutors",
    icon: <FaBookOpen />,
    color: "from-orange-500 to-amber-500",
  },

  {
    id: 6,
    title: "ICT",
    tutors: "60+ Tutors",
    icon: <FaLaptopCode />,
    color: "from-slate-700 to-slate-900",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20">
      <div className="container-width">
        
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          
          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Popular Categories
          </div>

          <h2 className="font-heading text-4xl font-bold text-slate-900 lg:text-5xl">
            Explore Learning Categories
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Find expert tutors from different subjects and improve
            your learning experience with personalized guidance.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[30px] border border-gray-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              
              {/* BACKGROUND GLOW */}
              <div
                className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-r ${category.color} opacity-10 blur-3xl`}
              ></div>

              {/* ICON */}
              <div
                className={`flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-r ${category.color} text-3xl text-white shadow-lg`}
              >
                {category.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-6 font-heading text-2xl font-bold text-slate-900">
                {category.title}
              </h3>

              {/* TUTORS */}
              <p className="mt-3 text-gray-500">
                {category.tutors}
              </p>

              {/* BUTTON */}
              <button className="mt-6 text-sm font-semibold text-blue-600 transition hover:translate-x-1">
                Explore Category →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}