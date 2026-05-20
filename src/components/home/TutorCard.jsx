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

          className="h-[240px] w-full object-cover object-top transition duration-500 group-hover:scale-105"
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
      <div className="space-y-5 p-6">

        {/* TOP */}
        <div>

          {/* NAME */}
          <h3 className="line-clamp-1 font-heading text-[30px] font-bold text-slate-900">

            {
              tutor.tutorName
            }

          </h3>

          {/* EXPERIENCE + RATING */}
          <div className="mt-3 flex items-center justify-between">

            <p className="text-gray-500">

              {
                tutor.experience
              }

            </p>

            <div className="flex items-center gap-2">

              <FaStar className="text-yellow-400" />

              <span className="font-medium text-gray-700">

                4.9

              </span>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-5">

          <div>

            <p className="text-sm text-gray-500">

              Hourly Fee

            </p>

            <h4 className="mt-1 text-3xl font-bold text-blue-600">

              $
              {
                tutor.hourlyFee
              }

            </h4>

          </div>

          <Link
            href={`/tutors/${tutor._id}`}

            className="btn h-11 min-h-0 rounded-2xl border-0 bg-blue-600 px-5 text-white shadow-md hover:bg-blue-700"
          >

            Book Session

          </Link>

        </div>

      </div>

    </div>
  );
}