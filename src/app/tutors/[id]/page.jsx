"use client";

import { use } from "react";
import { useEffect, useState } from "react";

import axios from "axios";

import Image from "next/image";

import { authClient } from "@/lib/auth-client";

const TutorDetailsPage = ({
    params
}) => {

    const resolvedParams =
        use(params);

    const id =
        resolvedParams.id;

    const { data: session } =
        authClient.useSession();

    const [tutor, setTutor] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [alreadyBooked, setAlreadyBooked] =
        useState(false);

    // FETCH TUTOR
    useEffect(() => {

        const fetchTutor =
            async () => {

                try {

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`
                        );

                    const data =
                        await res.json();

                    setTutor(data);

                } catch (error) {

                    console.log(error);

                } finally {

                    setLoading(false);

                }
            };

        fetchTutor();

    }, [id]);

    useEffect(() => {

        const checkBooking =
            async () => {

                if (!session?.user || !tutor?._id) {
                    return;
                }

                try {

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/check?tutorId=${tutor._id}&studentEmail=${session.user.email}`
                        );

                    const data =
                        await res.json();

                    setAlreadyBooked(
                        data.exists
                    );

                } catch (error) {

                    console.log(error);

                }
            };

        checkBooking();

    }, [session, tutor]);

    // BOOK SESSION
    const handleBooking =
        async () => {

            console.log("clicked");

            if (!session?.user) {

                alert(
                    "Please login first"
                );

                return;
            }

            const bookingData = {

                tutorId:
                    tutor._id,

                tutorName:
                    tutor.tutorName,

                tutorImage:
                    tutor.photo,

                subject:
                    tutor.category,

                hourlyFee:
                    tutor.hourlyFee,

                studentEmail:
                    session.user.email,

                studentName:
                    session.user.name,

                bookedAt:
                    new Date(),

            };

            try {

                // SAVE BOOKING
                await axios.post(
                    "http://localhost:5000/bookings",
                    bookingData
                );

                // REDUCE SLOT
                await axios.patch(
                    `http://localhost:5000/book-tutor/${tutor._id}`
                );
                setTutor({
                    ...tutor,
                    totalSlot: tutor.totalSlot - 1,
                });

                alert(
                    "Session booked successfully!"
                );

            } catch (error) {

                console.log(error);

            }
        };

    // LOADING
    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <span className="loading loading-spinner loading-lg text-blue-600"></span>

            </div>
        );
    }

    // NOT FOUND
    if (!tutor) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-3xl font-bold">
                    Tutor Not Found
                </h1>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10">

            <div className="mx-auto max-w-7xl">

                <div className="grid grid-cols-1 gap-10 rounded-[32px] bg-white p-8 shadow-xl lg:grid-cols-2">

                    {/* LEFT IMAGE */}
                    <div>

                        <div className="relative h-[500px] overflow-hidden rounded-[28px]">

                            <Image
                                src={
                                    tutor.photo ||
                                    "/default-tutor.jpg"
                                }
                                alt={
                                    tutor.tutorName
                                }
                                fill
                                className="object-cover object-top"
                            />

                        </div>

                    </div>

                    {/* RIGHT CONTENT */}
                    <div>

                        {/* CATEGORY */}
                        <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">

                            {tutor.category}

                        </div>

                        {/* NAME */}
                        <h1 className="text-5xl font-bold leading-tight text-slate-900">

                            {tutor.tutorName}

                        </h1>

                        {/* INFO */}
                        <div className="mt-8 space-y-5">

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Hourly Fee
                                </span>

                                <span className="text-xl font-bold text-blue-600">
                                    $
                                    {tutor.hourlyFee}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Available Days
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {tutor.availableDays}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Time Slot
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {tutor.availableTime}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Institution
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {tutor.institution}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Experience
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {tutor.experience}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Location
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {tutor.location}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Teaching Mode
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {tutor.teachingMode}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Available Slots
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {tutor.totalSlot}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                                <span className="text-gray-500">
                                    Session Start
                                </span>

                                <span className="font-semibold text-slate-800">
                                    {
                                        tutor.sessionStartDate
                                    }
                                </span>

                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="mt-10">

                            <button
                                onClick={handleBooking}
                                disabled={
                                    tutor.totalSlot <= 0 ||
                                    alreadyBooked
                                }
                                className={`w-full rounded-2xl px-6 py-4 text-lg font-semibold text-white transition ${tutor.totalSlot <= 0 ||
                                    alreadyBooked
                                    ? "cursor-not-allowed bg-gray-400"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {
                                    tutor.totalSlot <= 0
                                        ? "Fully Booked"
                                        : alreadyBooked
                                            ? "Already Booked"
                                            : "Book Session"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default TutorDetailsPage;