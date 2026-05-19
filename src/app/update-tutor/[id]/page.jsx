"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { useParams, useRouter } from "next/navigation";

import Swal from "sweetalert2";

const UpdateTutorPage = () => {

    const params = useParams();

    const router = useRouter();

    const [tutor, setTutor] =
        useState(null);

    // FETCH SINGLE TUTOR
    useEffect(() => {

        const fetchTutor =
            async () => {

                try {

                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${params.id}`
                        );

                    setTutor(
                        res.data
                    );

                } catch (error) {

                    console.log(error);

                }
            };

        fetchTutor();

    }, [params.id]);

    // LOADING
    if (!tutor) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <span className="loading loading-spinner loading-lg text-blue-600"></span>

            </div>
        );
    }

    // UPDATE TUTOR
    const handleUpdateTutor =
        async (e) => {

            e.preventDefault();

            const form =
                e.target;

            const updatedTutor =
                {

                    tutorName:
                        form.tutorName.value,

                    photo:
                        form.photo.value,

                    category:
                        form.category.value,

                    availableDays:
                        form.availableDays.value,

                    availableTime:
                        form.availableTime.value,

                    hourlyFee:
                        form.hourlyFee.value,

                    totalSlot:
                        parseInt(
                            form.totalSlot.value
                        ),

                    sessionStartDate:
                        form.sessionStartDate.value,

                    institution:
                        form.institution.value,

                    experience:
                        form.experience.value,

                    location:
                        form.location.value,

                    teachingMode:
                        form.teachingMode.value,
                };

            try {

                await axios.patch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${params.id}`,
                    updatedTutor
                );

                Swal.fire({

                    icon: "success",

                    title:
                        "Tutor Updated Successfully",

                    showConfirmButton:
                        false,

                    timer: 1500,
                });

                router.push(
                    "/my-tutors"
                );

            } catch (error) {

                console.log(error);

            }
        };

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10">

            <div className="mx-auto max-w-4xl rounded-[30px] bg-white p-8 shadow-xl">

                <h1 className="mb-8 text-4xl font-bold text-slate-900">

                    Update Tutor

                </h1>

                <form
                    onSubmit={handleUpdateTutor}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >

                    {/* TUTOR NAME */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Tutor Name

                        </label>

                        <input
                            type="text"
                            name="tutorName"
                            defaultValue={tutor.tutorName}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* PHOTO */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Photo URL

                        </label>

                        <input
                            type="text"
                            name="photo"
                            defaultValue={tutor.photo}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* CATEGORY */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Category

                        </label>

                        <select
                            name="category"
                            defaultValue={tutor.category}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        >

                            <option>
                                Mathematics
                            </option>

                            <option>
                                Physics
                            </option>

                            <option>
                                Chemistry
                            </option>

                            <option>
                                Biology
                            </option>

                            <option>
                                English
                            </option>

                        </select>

                    </div>

                    {/* AVAILABLE DAYS */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Available Days

                        </label>

                        <input
                            type="text"
                            name="availableDays"
                            defaultValue={tutor.availableDays}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* AVAILABLE TIME */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Available Time

                        </label>

                        <input
                            type="text"
                            name="availableTime"
                            defaultValue={tutor.availableTime}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* HOURLY FEE */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Hourly Fee

                        </label>

                        <input
                            type="number"
                            name="hourlyFee"
                            defaultValue={tutor.hourlyFee}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* TOTAL SLOT */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Total Slot

                        </label>

                        <input
                            type="number"
                            name="totalSlot"
                            defaultValue={tutor.totalSlot}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* SESSION DATE */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Session Start Date

                        </label>

                        <input
                            type="date"
                            name="sessionStartDate"
                            defaultValue={tutor.sessionStartDate}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* INSTITUTION */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Institution

                        </label>

                        <input
                            type="text"
                            name="institution"
                            defaultValue={tutor.institution}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* EXPERIENCE */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Experience

                        </label>

                        <input
                            type="text"
                            name="experience"
                            defaultValue={tutor.experience}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* LOCATION */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Location

                        </label>

                        <input
                            type="text"
                            name="location"
                            defaultValue={tutor.location}
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* TEACHING MODE */}
                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Teaching Mode

                        </label>

                        <select
                            name="teachingMode"
                            defaultValue={tutor.teachingMode}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        >

                            <option>
                                Online
                            </option>

                            <option>
                                Offline
                            </option>

                            <option>
                                Both
                            </option>

                        </select>

                    </div>

                    {/* BUTTON */}
                    <div className="md:col-span-2">

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                        >

                            Update Tutor

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UpdateTutorPage;