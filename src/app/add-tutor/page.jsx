"use client";

import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";

const AddTutorPage = () => {

  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const handleAddTutor = async (e) => {

    e.preventDefault();

    const form = e.target;

    const tutorData = {

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
        form.totalSlot.value,

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

      email:
        session?.user?.email,

      createdAt:
        new Date(),
      status:
        "active",

    };

    console.log(tutorData);

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`,
        {

          method: "POST",

          headers: {
            "content-type":
              "application/json",
          },

          body: JSON.stringify(
            tutorData
          ),

        }
      );

      const data =
        await res.json();

      console.log(data);

      if (data.insertedId) {

        toast.success(
          "Tutor Added Successfully"
        );

        form.reset();
        router.push("/my-tutors");

      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to add tutor"
      );

    }
  };

  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10">

      <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-8 shadow-xl">

        {/* TITLE */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-slate-900">
            Add Tutor
          </h1>

          <p className="mt-3 text-gray-500">
            Add your tutor profile and start
            teaching students.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleAddTutor}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >

          {/* Tutor Name */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tutor Name
            </label>

            <input
              type="text"
              name="tutorName"
              placeholder="Enter tutor name"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            />

          </div>

          {/* Photo URL */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              placeholder="https://imgbb.com/..."
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            />

          </div>

          {/* Category */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subject / Category
            </label>

            <select
              name="category"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Mathematics">
                Mathematics
              </option>

              <option value="Physics">
                Physics
              </option>

              <option value="Chemistry">
                Chemistry
              </option>

              <option value="Biology">
                Biology
              </option>

              <option value="English">
                English
              </option>

              <option value="ICT">
                ICT
              </option>

            </select>

          </div>

          {/* Available Days */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Available Days
            </label>

            <select
              name="availableDays"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            >

              <option value="">
                Select Days
              </option>

              <option value="Sun - Thu">
                Sun - Thu
              </option>

              <option value="Fri - Sat">
                Fri - Sat
              </option>

              <option value="Sat - Wed">
                Sat - Wed
              </option>

              <option value="Everyday">
                Everyday
              </option>

            </select>

          </div>

          {/* Available Time */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Available Time Slot
            </label>

            <select
              name="availableTime"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            >

              <option value="">
                Select Time Slot
              </option>

              <option value="8:00 AM - 11:00 AM">
                8:00 AM - 11:00 AM
              </option>

              <option value="2:00 PM - 5:00 PM">
                2:00 PM - 5:00 PM
              </option>

              <option value="5:00 PM - 8:00 PM">
                5:00 PM - 8:00 PM
              </option>

              <option value="8:00 PM - 10:00 PM">
                8:00 PM - 10:00 PM
              </option>

            </select>

          </div>

          {/* Hourly Fee */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Hourly Fee
            </label>

            <input
              type="number"
              name="hourlyFee"
              placeholder="$20"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            />

          </div>

          {/* Total Slot */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Total Slot
            </label>

            <input
              type="number"
              name="totalSlot"
              placeholder="10"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            />

          </div>

          {/* Session Start Date */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Session Start Date
            </label>

            <div className="relative">

              <input
                type="date"
                name="sessionStartDate"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                required
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                📅
              </span>

            </div>

          </div>

          {/* Institution */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Institution
            </label>

            <input
              type="text"
              name="institution"
              placeholder="Dhaka University"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            />

          </div>

          {/* Experience */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Experience
            </label>

            <input
              type="text"
              name="experience"
              placeholder="3 Years Experience"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            />

          </div>

          {/* Location */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Dhaka"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            />

          </div>

          {/* Teaching Mode */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Teaching Mode
            </label>

            <select
              name="teachingMode"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              required
            >

              <option value="">
                Select Teaching Mode
              </option>

              <option value="Online">
                Online
              </option>

              <option value="Offline">
                Offline
              </option>

              <option value="Both">
                Both
              </option>

            </select>

          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Add Tutor
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddTutorPage;