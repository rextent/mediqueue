"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import axios from "axios";

import { authClient } from "@/lib/auth-client";

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

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

                            {
                                bookings.map((booking) => (

                                    <div
                                        key={booking._id}
                                        className="overflow-hidden rounded-[30px] bg-white shadow-xl"
                                    >

                                        <div className="relative h-[260px]">

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
                                                className="object-cover"
                                            />

                                        </div>

                                        <div className="p-6">

                                            <h2 className="text-2xl font-bold text-slate-900">

                                                {
                                                    booking.tutorName
                                                }

                                            </h2>

                                            <p className="mt-2 font-medium text-blue-600">

                                                {
                                                    booking.subject
                                                }

                                            </p>

                                            <div className="mt-6 space-y-3">

                                                <div className="flex items-center justify-between">

                                                    <span className="text-gray-500">
                                                        Hourly Fee
                                                    </span>

                                                    <span className="font-bold text-slate-900">

                                                        $
                                                        {
                                                            booking.hourlyFee
                                                        }

                                                    </span>

                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span className="text-gray-500">
                                                        Student
                                                    </span>

                                                    <span className="font-semibold text-slate-900">

                                                        {
                                                            booking.studentName
                                                        }

                                                    </span>

                                                </div>

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

export default MyBookingsPage;