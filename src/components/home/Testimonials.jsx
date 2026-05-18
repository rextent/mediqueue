"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ariana Smith",
    role: "HSC Student",
    image: "/default-tutor.png",
    review:
      "MediQueue helped me find an excellent math tutor very quickly. The booking process was smooth and professional.",
  },

  {
    id: 2,
    name: "Daniel Brown",
    role: "University Student",
    image: "/default-tutor.png",
    review:
      "I really loved the flexible scheduling system. The platform feels modern and easy to use for students.",
  },

  {
    id: 3,
    name: "Sophia Wilson",
    role: "SSC Candidate",
    image: "/default-tutor.png",
    review:
      "The tutors are very professional and supportive. I improved my academic performance significantly.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-width">
        
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          
          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Testimonials
          </div>

          <h2 className="font-heading text-4xl font-bold text-slate-900 lg:text-5xl">
            What Students Say About Us
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Thousands of students trust MediQueue for finding
            experienced tutors and managing learning sessions easily.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="rounded-[30px] bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              
              {/* STARS */}
              <div className="mb-5 flex items-center gap-1 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/* REVIEW */}
              <p className="leading-8 text-gray-600">
                “{testimonial.review}”
              </p>

              {/* USER */}
              <div className="mt-8 flex items-center gap-4">
                
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={70}
                  height={70}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-heading text-xl font-bold text-slate-900">
                    {testimonial.name}
                  </h4>

                  <p className="text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}