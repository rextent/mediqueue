"use client";

import { useEffect, useState } from "react";

import SectionTitle from "../ui/SectionTitle";

import TutorCard from "./TutorCard";

const FeaturedTutors = () => {

  const [tutors, setTutors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchTutors =
      async () => {

        try {

          const res =
            await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`
            );

          const data =
            await res.json();

          // ONLY FIRST 6
          setTutors(
            data.slice(0, 6)
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchTutors();

  }, []);

  return (

    <section className="bg-white py-20">

      <div className="container-width">

        <SectionTitle
          badge="Featured Tutors"
          title="Meet Our Professional Tutors"
          description="Connect with experienced and verified tutors for personalized online and offline learning sessions."
        />

        {/* LOADING */}
        {
          loading ? (

            <div className="flex justify-center py-20">

              <span className="loading loading-spinner loading-lg text-blue-600"></span>

            </div>

          ) : (

            <>

              {/* GRID */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {
                  tutors.map(
                    (tutor) => (

                      <TutorCard
                        key={tutor._id}
                        tutor={tutor}
                      />

                    )
                  )
                }

              </div>

            </>

          )
        }

      </div>

    </section>
  );
};

export default FeaturedTutors;