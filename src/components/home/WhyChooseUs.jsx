"use client";

import { motion } from "framer-motion";

import {
  FaUserCheck,
  FaCalendarCheck,
  FaLaptopHouse,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaUserCheck />,
    title: "Verified Tutors",
    description:
      "Learn from trusted and experienced tutors with verified profiles and teaching expertise.",
  },

  {
    id: 2,
    icon: <FaCalendarCheck />,
    title: "Flexible Booking",
    description:
      "Book sessions easily based on your preferred schedule and tutor availability.",
  },

  {
    id: 3,
    icon: <FaLaptopHouse />,
    title: "Online & Offline",
    description:
      "Choose your preferred learning mode for a better and more comfortable experience.",
  },

  {
    id: 4,
    icon: <FaShieldAlt />,
    title: "Secure Platform",
    description:
      "Safe authentication and organized session management for students and tutors.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-width">
        
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          
          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Why Choose Us
          </div>

          <h2 className="font-heading text-4xl font-bold text-slate-900 lg:text-5xl">
            Smarter Learning Starts Here
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            MediQueue provides a modern and organized tutor booking
            experience designed to simplify learning for students.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group rounded-[28px] bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              
              {/* ICON */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-2xl text-white shadow-lg">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-6 font-heading text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}