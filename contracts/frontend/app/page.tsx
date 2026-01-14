"use client";

import Navbar from "../components/Navbar";

export default function AdminPage() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <Navbar />

      <div className="mt-10 text-white">
        <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>
        <p className="text-white/70 mt-2">
          Now background + styles should work ✅
        </p>

        <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
          <div className="text-white/70">Route:</div>
          <div className="text-white font-semibold mt-1">/admin</div>
        </div>
      </div>
    </main>
  );
}
