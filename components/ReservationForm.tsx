"use client";

import { useState } from "react";

const inputStyles =
  "w-full border border-sand bg-white px-4 py-3 text-base text-ink placeholder:text-ink/35 focus:border-red focus:outline-none transition-colors";

const TIME_SLOTS = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "4:00 PM",
  "5:30 PM",
  "7:00 PM",
  "8:30 PM",
];

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    name?: string;
    date?: string;
    time?: string;
    guests?: string;
    email?: string;
  }>({});

  // Prevents picking past dates
  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    setBookingDetails({
      name: data.name as string,
      date: data.date as string,
      time: data.time as string,
      guests: data.guests as string,
      email: data.email as string,
    });

    setIsSubmitting(false);
    setIsSent(true);
  }

  function handleReset() {
    setIsSent(false);
    setBookingDetails({});
  }

  if (isSent) {
    return (
      <div className="border border-sand bg-cream p-8 md:p-10">
        <div className="flex items-center gap-2 text-red text-xs font-semibold uppercase tracking-[0.24em]">
          <span className="h-2 w-2 rounded-full bg-red animate-pulse" />
          Request Received
        </div>
        <h3 className="mt-2 display text-2xl">
          We look forward to seeing you, {bookingDetails.name}!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          We&apos;ve logged your reservation request for{" "}
          <strong className="text-ink">{bookingDetails.guests} guests</strong>{" "}
          on <strong className="text-ink">{bookingDetails.date}</strong> at{" "}
          <strong className="text-ink">{bookingDetails.time}</strong>.
        </p>

        {bookingDetails.email && (
          <p className="mt-2 text-xs text-ink/50">
            A confirmation draft has been assigned to {bookingDetails.email}.
          </p>
        )}

        <div className="mt-6 pt-6 border-t border-sand flex flex-wrap gap-4 items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline on-light text-xs"
          >
            Submit another reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 border border-sand bg-cream p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className={inputStyles}
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+63 9XX XXX XXXX"
            className={inputStyles}
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className={inputStyles}
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            required
            className={inputStyles}
          />
        </div>

        {/* Time */}
        <div>
          <label
            htmlFor="time"
            className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Preferred Time
          </label>
          <select id="time" name="time" required className={inputStyles}>
            <option value="">Select a slot</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Guests */}
        <div>
          <label
            htmlFor="guests"
            className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={20}
            defaultValue={2}
            required
            className={inputStyles}
          />
        </div>

        {/* Seating Preference */}
        <div>
          <label
            htmlFor="seating"
            className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Seating Preference
          </label>
          <select id="seating" name="seating" className={inputStyles}>
            <option value="Standard">Standard Dining</option>
            <option value="Window">Window Seat</option>
            <option value="Bar">Bar Counter</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
        >
          Special Requests / Dietary Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="e.g., High chair needed, celebrating a birthday, gluten allergy..."
          className={inputStyles}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending request...
          </span>
        ) : (
          "Request a table"
        )}
      </button>
    </form>
  );
}
