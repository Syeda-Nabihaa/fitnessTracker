import React from "react";
import f1 from "../assets/f1.jpg";
import { Link } from "react-router-dom";

export default function FirstPage() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={f1}
        alt="fitness"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay (dark transparent layer) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
          Your Fitness Journey Starts Here
        </h1>
        <p className="mt-3 text-lg opacity-90">
          Track your workouts, monitor your nutrition, and achieve your goals.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
