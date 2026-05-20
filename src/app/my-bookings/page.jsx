"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import axios from "axios";

import { authClient } from "@/lib/auth-client";

import PrivateRoute
from "@/components/PrivateRoute";

const MyBookingsPage = () => {

    const { data: session } =
        authClient.useSession();

    const [bookings, setBookings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchBookings =
            async () => {

                if (!session?.user?.email) {

                    return;
                }

                try {

                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?email=${session.user.email}`
                        );

                    setBookings(res.data);

                } catch (error) {

                    console.log(error);

                } finally {

                    setLoading(false);

                }
            };

        fetchBookings();

    }, [session]);

    // LOADING
    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <span className="loading loading-spinner loading-lg text-blue-600"></span>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-slate-900">

                        My Bookings

                    </h1>

                    <p className="mt-3 text-gray-500">

                        Manage all your booked tutoring sessions.

                    </p>

                </div>

                {
                    bookings.length === 0 ? (

                        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

                            <h2 className="text-3xl font-bold">

                                No Bookings Found

                            </h2>

                        </div>

                    ) : (

                        <div className="space-y-6">

                            {
                                bookings.map((booking) => (

                                    <div
                                        key={booking._id}
                                        className="flex flex-col gap-6 rounded-[28px] bg-white p-6 shadow-xl lg:flex-row lg:items-center"
                                    >

                                        {/* IMAGE */}
                                        <div className="relative h-[220px] w-full overflow-hidden rounded-[24px] lg:h-[160px] lg:w-[220px]">

                                            <Image
                                                src={
                                                    booking.tutorImage ||
                                                    "/default-tutor.jpg"
                                                }
                                                alt={
                                                    booking.tutorName ||
                                                    "Tutor Image"
                                                }
                                                fill
                                                className="object-cover object-top"
                                            />

                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex-1">

                                            {/* TOP */}
                                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                                                <div>

                                                    <div className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">

                                                        {
                                                            booking.subject
                                                        }

                                                    </div>

                                                    <h2 className="text-3xl font-bold text-slate-900">

                                                        {
                                                            booking.tutorName
                                                        }

                                                    </h2>

                                                    <p className="mt-2 text-gray-500">

                                                        Booked by
                                                        {" "}
                                                        {
                                                            booking.studentName
                                                        }

                                                    </p>

                                                </div>

                                                {/* PRICE */}
                                                <div className="rounded-2xl bg-slate-100 px-5 py-4 text-center">

                                                    <p className="text-sm text-gray-500">

                                                        Hourly Fee

                                                    </p>

                                                    <h3 className="mt-1 text-2xl font-bold text-blue-600">

                                                        $
                                                        {
                                                            booking.hourlyFee
                                                        }

                                                    </h3>

                                                </div>

                                            </div>

                                            {/* BOTTOM */}
                                            <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-5 lg:flex-row lg:items-center lg:justify-between">

                                                <div className="flex flex-wrap gap-3">

                                                    <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">

                                                        Session Booked

                                                    </div>

                                                    <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">

                                                        {
                                                            booking.subject
                                                        }

                                                    </div>

                                                </div>

                                                {/* CANCEL BUTTON */}
                                                <button
                                                    className="cursor-pointer rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                                                >

                                                    Cancel Booking

                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
};

const MyBookingsWrapper = () => {

    return (

        <PrivateRoute>

            <MyBookingsPage />

        </PrivateRoute>
    );
};

export default MyBookingsWrapper;