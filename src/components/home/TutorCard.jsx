import Image from "next/image";

import Link from "next/link";

import { FaStar }
from "react-icons/fa";

export default function TutorCard({
  tutor,
}) {

  return (

    <div className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <Image
          src={
            tutor.photo ||
            "/default-tutor.png"
          }

          alt={
            tutor.tutorName
          }

          width={500}
          height={400}

          className="h-[280px] w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />

        {/* CATEGORY */}
        <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">

          {
            tutor.category ||
            "Tutor"
          }

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* NAME */}
        <h3 className="font-heading text-2xl font-bold text-slate-900">

          {
            tutor.tutorName
          }

        </h3>

        {/* EXPERIENCE */}
        <p className="mt-2 text-gray-500">

          {
            tutor.experience
          }

        </p>

        {/* RATING */}
        <div className="mt-4 flex items-center gap-2">

          <FaStar className="text-yellow-400" />

          <span className="font-medium text-gray-700">

            4.9 Rating

          </span>

        </div>

        {/* PRICE */}
        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">

              Hourly Fee

            </p>

            <h4 className="text-2xl font-bold text-blue-600">

              $
              {
                tutor.hourlyFee
              }

            </h4>

          </div>

          <Link
            href={`/tutors/${tutor._id}`}

            className="btn rounded-xl border-0 bg-blue-600 text-white hover:bg-blue-700"
          >

            Book Session

          </Link>

        </div>

      </div>

    </div>
  );
}