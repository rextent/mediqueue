"use client";

import {
    useEffect,
    useState,
} from "react";

import Image from "next/image";

import Link from "next/link";

const TutorsPage = () => {

    const [tutors, setTutors] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [
        firstLoading,
        setFirstLoading,
    ] = useState(true);

    // SEARCH
    const [searchText, setSearchText] =
        useState("");

    // DEBOUNCED SEARCH
    const [
        debouncedSearch,
        setDebouncedSearch,
    ] = useState("");

    // DATE FILTER
    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    // DEBOUNCE
    useEffect(() => {

        const timer =
            setTimeout(() => {

                setDebouncedSearch(
                    searchText
                );

            }, 500);

        return () =>
            clearTimeout(timer);

    }, [searchText]);

    // FETCH TUTORS
    useEffect(() => {

        const fetchTutors =
            async () => {

                try {



                    let url =
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors?search=${debouncedSearch}`;

                    // DATE FILTER
                    if (
                        startDate &&
                        endDate
                    ) {

                        url +=
                            `&startDate=${startDate}&endDate=${endDate}`;
                    }

                    const res =
                        await fetch(url);

                    const data =
                        await res.json();

                    setTutors(data);

                } catch (error) {

                    console.log(error);

                } finally {

                    setLoading(false);

                    setFirstLoading(false);
                }
            };

        fetchTutors();

    }, [
        debouncedSearch,
        startDate,
        endDate,
    ]);

    // LOADING
    if (firstLoading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <span className="loading loading-spinner loading-lg text-blue-600"></span>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10">

            <div className="container-width">

                {/* TITLE */}
                <div className="mb-10 text-center">

                    <h1 className="text-4xl font-bold text-slate-900">

                        Find Your Perfect Tutor

                    </h1>

                    <p className="mt-3 text-gray-500">

                        Explore expert tutors and
                        book your learning sessions
                        easily.

                    </p>

                </div>

                {/* SEARCH + FILTER */}
                <div className="mb-10 rounded-[24px] border border-gray-100 bg-white p-4 shadow-sm">

                    <div className="grid gap-4 lg:grid-cols-4">

                        {/* SEARCH */}
                        <div className="lg:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-slate-700">

                                Search Tutor

                            </label>

                            <input
                                type="text"

                                placeholder="Search by tutor name..."

                                value={searchText}

                                onChange={(e) =>
                                    setSearchText(
                                        e.target.value
                                    )
                                }

                                className="input input-bordered h-12 w-full rounded-xl border-gray-200 bg-slate-50"
                            />

                        </div>

                        {/* START DATE */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">

                                Start Date

                            </label>

                            <input
                                type="date"

                                value={startDate}

                                onChange={(e) =>
                                    setStartDate(
                                        e.target.value
                                    )
                                }

                                className="input input-bordered h-12 w-full rounded-xl border-gray-200 bg-slate-50"
                            />

                        </div>

                        {/* END DATE */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">

                                End Date

                            </label>

                            <input
                                type="date"

                                value={endDate}

                                onChange={(e) =>
                                    setEndDate(
                                        e.target.value
                                    )
                                }

                                className="input input-bordered h-12 w-full rounded-xl border-gray-200 bg-slate-50"
                            />

                        </div>

                    </div>

                </div>

                {/* EMPTY */}
                {
                    tutors.length === 0 && (

                        <div className="rounded-3xl bg-white py-20 text-center shadow-lg">

                            <h2 className="text-2xl font-bold text-slate-800">

                                No Tutors Found

                            </h2>

                            <p className="mt-3 text-gray-500">

                                Try changing search or
                                filter options.

                            </p>

                        </div>
                    )
                }

                {/* GRID */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {
                        tutors.map((tutor) => (

                            <div
                                key={tutor._id}

                                className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >

                                {/* IMAGE */}
                                <div className="relative h-[260px] w-full overflow-hidden">

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

                                    {/* STATUS */}
                                    <div className="absolute left-4 top-4">

                                        {
                                            tutor.status === "closed" ? (

                                                <span className="rounded-full bg-red-100 px-4 py-1 text-xs font-semibold text-red-600">

                                                    Fully Booked

                                                </span>

                                            ) : (

                                                <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-600">

                                                    Available

                                                </span>

                                            )
                                        }

                                    </div>

                                </div>

                                {/* CONTENT */}
                                <div className="p-6">

                                    {/* TOP */}
                                    <div className="flex items-start justify-between gap-4">

                                        <div>

                                            <h2 className="text-2xl font-bold text-slate-900">

                                                {
                                                    tutor.tutorName
                                                }

                                            </h2>

                                            <p className="mt-1 text-sm font-medium text-blue-600">

                                                {
                                                    tutor.category
                                                }

                                            </p>

                                        </div>

                                        <div className="rounded-2xl bg-blue-50 px-4 py-2 text-right">

                                            <p className="text-xs text-gray-500">

                                                Hourly Fee

                                            </p>

                                            <h3 className="text-lg font-bold text-blue-600">

                                                $
                                                {
                                                    tutor.hourlyFee
                                                }

                                            </h3>

                                        </div>

                                    </div>

                                    {/* INFO */}
                                    <div className="mt-6 space-y-3 text-sm text-gray-600">

                                        <div className="flex items-center justify-between">

                                            <span>
                                                Available Days
                                            </span>

                                            <span className="font-medium text-slate-800">

                                                {
                                                    tutor.availableDays
                                                }

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <span>
                                                Time Slot
                                            </span>

                                            <span className="font-medium text-slate-800">

                                                {
                                                    tutor.availableTime
                                                }

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <span>
                                                Location
                                            </span>

                                            <span className="font-medium text-slate-800">

                                                {
                                                    tutor.location
                                                }

                                            </span>

                                        </div>

                                    </div>

                                    {/* BUTTON */}
                                    <div className="mt-8">

                                        <Link
                                            href={`/tutors/${tutor._id}`}

                                            className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >

                                            View Details

                                        </Link>

                                    </div>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    );
};

export default TutorsPage;