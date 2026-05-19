"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Image from "next/image";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { AlertDialog } from "@heroui/react";

const MyTutorsPage = () => {

    const { data: session } =
        authClient.useSession();

    const [tutors, setTutors] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [selectedTutorId, setSelectedTutorId] =
        useState(null);

    // FETCH MY TUTORS
    useEffect(() => {

        const fetchTutors =
            async () => {

                if (!session?.user?.email) {

                    return;
                }

                try {

                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors?email=${session.user.email}`
                        );

                    setTutors(
                        res.data
                    );

                } catch (error) {

                    console.log(error);

                } finally {

                    setLoading(false);

                }
            };

        fetchTutors();

    }, [session]);

    // DELETE TUTOR
    const handleDelete =
        async () => {

            try {

                await axios.delete(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${selectedTutorId}`
                );

                const remainingTutors =
                    tutors.filter(
                        (tutor) =>
                            tutor._id !== selectedTutorId
                    );

                setTutors(
                    remainingTutors
                );

                setSelectedTutorId(
                    null
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

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-slate-900">

                        My Tutors

                    </h1>

                    <p className="mt-3 text-gray-500">

                        Manage all your tutor profiles.

                    </p>

                </div>

                {
                    tutors.length === 0 ? (

                        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

                            <h2 className="text-3xl font-bold text-slate-900">

                                No Tutors Added

                            </h2>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

                            {
                                tutors.map((tutor) => (

                                    <div
                                        key={tutor._id}
                                        className="overflow-hidden rounded-[30px] bg-white shadow-xl"
                                    >

                                        {/* IMAGE */}
                                        <div className="relative h-[260px]">

                                            <Image
                                                src={
                                                    tutor.photo ||
                                                    "/default-tutor.jpg"
                                                }
                                                alt={
                                                    tutor.tutorName ||
                                                    "Tutor"
                                                }
                                                fill
                                                className="object-cover object-top"
                                            />

                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-6">

                                            {/* STATUS */}
                                            <div className="mb-5 flex items-center justify-between">

                                                <span
                                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                                        tutor.totalSlot <= 0
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-green-100 text-green-600"
                                                    }`}
                                                >

                                                    {
                                                        tutor.totalSlot <= 0
                                                            ? "Closed"
                                                            : "Active"
                                                    }

                                                </span>

                                                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-600">

                                                    Slots:
                                                    {" "}
                                                    {
                                                        tutor.totalSlot
                                                    }

                                                </span>

                                            </div>

                                            {/* NAME */}
                                            <h2 className="text-2xl font-bold text-slate-900">

                                                {
                                                    tutor.tutorName
                                                }

                                            </h2>

                                            {/* CATEGORY */}
                                            <p className="mt-2 font-medium text-blue-600">

                                                {
                                                    tutor.category
                                                }

                                            </p>

                                            {/* INFO */}
                                            <div className="mt-6 space-y-4">

                                                <div className="flex items-center justify-between">

                                                    <span className="text-gray-500">

                                                        Fee

                                                    </span>

                                                    <span className="font-bold text-slate-900">

                                                        $
                                                        {
                                                            tutor.hourlyFee
                                                        }

                                                    </span>

                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span className="text-gray-500">

                                                        Mode

                                                    </span>

                                                    <span className="font-semibold text-slate-900">

                                                        {
                                                            tutor.teachingMode
                                                        }

                                                    </span>

                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span className="text-gray-500">

                                                        Location

                                                    </span>

                                                    <span className="font-semibold text-slate-900">

                                                        {
                                                            tutor.location
                                                        }

                                                    </span>

                                                </div>

                                            </div>

                                            {/* BUTTONS */}
                                            <div className="mt-8 flex gap-3">

                                                {/* UPDATE BUTTON */}
                                                <Link
                                                    href={`/update-tutor/${tutor._id}`}
                                                    className="flex-1 cursor-pointer rounded-2xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                                                >

                                                    Update

                                                </Link>

                                                {/* DELETE BUTTON */}
                                                <button
                                                    onClick={() => {

                                                        setSelectedTutorId(
                                                            tutor._id
                                                        );

                                                    }}
                                                    className="flex-1 cursor-pointer rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
                                                >

                                                    Delete

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

            {/* DELETE MODAL */}
            {
                selectedTutorId && (

                    <AlertDialog
                        isOpen={true}
                    >

                        <AlertDialog.Backdrop
                            className="fixed inset-0 z-50 bg-black/50"
                        >

                            <AlertDialog.Container
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            >

                                <AlertDialog.Dialog
                                    className="w-full max-w-[420px] rounded-3xl bg-white p-7 shadow-2xl"
                                >

                                    {/* HEADER */}
                                    <AlertDialog.Header>

                                        <AlertDialog.Heading
                                            className="text-3xl font-bold text-slate-900"
                                        >

                                            Delete Tutor

                                        </AlertDialog.Heading>

                                    </AlertDialog.Header>

                                    {/* BODY */}
                                    <AlertDialog.Body
                                        className="mt-4"
                                    >

                                        <p className="text-lg leading-relaxed text-gray-600">

                                            Are you sure you want to delete this tutor profile?

                                        </p>

                                    </AlertDialog.Body>

                                    {/* FOOTER */}
                                    <AlertDialog.Footer
                                        className="mt-8 flex justify-end gap-3"
                                    >

                                        {/* CANCEL BUTTON */}
                                        <button
                                            onClick={() => {

                                                setSelectedTutorId(
                                                    null
                                                );

                                            }}
                                            className="cursor-pointer rounded-xl border border-gray-300 px-6 py-2.5 font-medium text-slate-700 transition hover:bg-gray-100"
                                        >

                                            Cancel

                                        </button>

                                        {/* DELETE BUTTON */}
                                        <button
                                            onClick={handleDelete}
                                            className="cursor-pointer rounded-xl bg-red-500 px-6 py-2.5 font-medium text-white transition hover:bg-red-600"
                                        >

                                            Delete

                                        </button>

                                    </AlertDialog.Footer>

                                </AlertDialog.Dialog>

                            </AlertDialog.Container>

                        </AlertDialog.Backdrop>

                    </AlertDialog>
                )
            }

        </div>
    );
};

export default MyTutorsPage;