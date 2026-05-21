"use client";

import { use } from "react";

import PrivateRoute from "@/components/PrivateRoute";

import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import Image from "next/image";

import { toast } from "react-toastify";

import {
    authClient,
} from "@/lib/auth-client";

const TutorDetailsContent = ({
    params,
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

    const [isOpen, setIsOpen] =
        useState(false);

    const [phone, setPhone] =
        useState("");

    const [studentName, setStudentName] =
        useState(
            session?.user?.name || ""
        );

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

    // CHECK EXPIRED
    const isExpired =
        tutor?.sessionStartDate &&
        new Date(
            tutor.sessionStartDate
        ) < new Date();

    // CHECK ALREADY BOOKED
    useEffect(() => {

        const checkBooking =
            async () => {

                if (
                    !session?.user ||
                    !tutor?._id
                ) {

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

    // HANDLE BOOKING
    const handleBooking =
        async () => {

            // LOGIN CHECK
            if (!session?.user) {

                alert(
                    "Please login first"
                );

                return;
            }

            // EXPIRED CHECK
            if (isExpired) {

                toast.error(
                    "This session has expired"
                );

                return;
            }

            try {

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

                    studentName:
                        studentName,

                    studentEmail:
                        session.user.email,

                    studentPhone:
                        phone,

                    bookedAt:
                        new Date(),
                };

                // SAVE BOOKING
                await axios.post(

                    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,

                    bookingData,

                    {
                        withCredentials: true,
                    }
                );

                // REDUCE SLOT
                await axios.patch(

                    `${process.env.NEXT_PUBLIC_SERVER_URL}/book-tutor/${tutor._id}`,

                    {},

                    {
                        withCredentials: true,
                    }
                );

                // UPDATE UI
                setTutor({

                    ...tutor,

                    totalSlot:
                        tutor.totalSlot - 1,
                });

                setAlreadyBooked(
                    true
                );

                setIsOpen(false);

                setPhone("");

                toast.success(
                    "Booking successful!"
                );

            } catch (error) {

                console.log(error);

                toast.error(
                    "Booking failed!"
                );

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

                            {/* STATUS BADGE */}
                            <div className="absolute left-5 top-5">

                                {
                                    isExpired ? (

                                        <span className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">

                                            Session Closed

                                        </span>

                                    ) : tutor.totalSlot <= 0 ? (

                                        <span className="rounded-full bg-gray-700 px-5 py-2 text-sm font-semibold text-white shadow-lg">

                                            Fully Booked

                                        </span>

                                    ) : (

                                        <span className="rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">

                                            Available

                                        </span>

                                    )
                                }

                            </div>

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

                                <div className="flex items-center">

                                    <span className="font-semibold text-slate-800">

                                        {
                                            tutor.sessionStartDate
                                        }

                                    </span>

                                    {
                                        isExpired && (

                                            <span className="ml-3 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">

                                                Expired

                                            </span>
                                        )
                                    }

                                </div>

                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="mt-10">

                            <button
                                onClick={() =>
                                    setIsOpen(true)
                                }

                                disabled={
                                    tutor.totalSlot <= 0 ||
                                    alreadyBooked ||
                                    isExpired
                                }

                                className={`w-full rounded-2xl px-6 py-4 text-lg font-semibold text-white transition ${
                                    tutor.totalSlot <= 0 ||
                                    alreadyBooked ||
                                    isExpired
                                        ? "cursor-not-allowed bg-gray-400"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >

                                {
                                    isExpired
                                        ? "Session Closed"
                                        : tutor.totalSlot <= 0
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

            {/* MODAL */}
            {
                isOpen && (

                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">

                        <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">

                            {/* TITLE */}
                            <h2 className="text-4xl font-bold text-slate-900">

                                Confirm Booking

                            </h2>

                            <p className="mt-3 text-gray-500">

                                Please confirm your tutor booking information.

                            </p>

                            {/* FORM */}
                            <div className="mt-8 space-y-5">

                                {/* TUTOR ID */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">

                                        Tutor ID

                                    </label>

                                    <input
                                        type="text"

                                        value={tutor._id}

                                        readOnly

                                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                                    />

                                </div>

                                {/* TUTOR NAME */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">

                                        Tutor Name

                                    </label>

                                    <input
                                        type="text"

                                        value={tutor.tutorName}

                                        readOnly

                                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                                    />

                                </div>

                                {/* STUDENT NAME */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">

                                        Student Name

                                    </label>

                                    <input
                                        type="text"

                                        placeholder="Enter your name"

                                        value={studentName}

                                        onChange={(e) =>
                                            setStudentName(
                                                e.target.value
                                            )
                                        }

                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                    />

                                </div>

                                {/* STUDENT EMAIL */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">

                                        Student Email

                                    </label>

                                    <input
                                        type="text"

                                        value={session?.user?.email || ""}

                                        readOnly

                                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                                    />

                                </div>

                                {/* PHONE */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">

                                        Phone Number

                                    </label>

                                    <input
                                        type="text"

                                        placeholder="Enter your phone number"

                                        value={phone}

                                        onChange={(e) =>
                                            setPhone(
                                                e.target.value
                                            )
                                        }

                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                    />

                                </div>

                            </div>

                            {/* BUTTONS */}
                            <div className="mt-8 flex items-center justify-end gap-4">

                                <button
                                    onClick={() =>
                                        setIsOpen(false)
                                    }

                                    className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-gray-100"
                                >

                                    Cancel

                                </button>

                                <button
                                    onClick={handleBooking}

                                    disabled={!phone}

                                    className={`rounded-xl px-6 py-3 font-semibold text-white transition ${
                                        !phone
                                            ? "cursor-not-allowed bg-gray-400"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >

                                    Confirm Booking

                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    );
};

const TutorDetailsPage = (props) => {

    return (

        <PrivateRoute>

            <TutorDetailsContent
                {...props}
            />

        </PrivateRoute>
    );
};

export default TutorDetailsPage;