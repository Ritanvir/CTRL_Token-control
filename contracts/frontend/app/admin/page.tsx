"use client";

import Navbar from "../../components/Navbar";

import AdminGuard from "../../components/admin/AdminGuard";
import TradingControl from "../../components/admin/TradingControl";
import PauseControl from "../../components/admin/PauseControl";
import WhitelistControl from "../../components/admin/WhitelistControl";

import FreezeControl from "../../components/admin/FreezeControl";
import LimitsControl from "../../components/admin/LimitsControl";
import VestingControl from "../../components/admin/VestingControl";
import BuybackControl from "../../components/admin/BuybackControl";

export default function AdminPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 pb-24">
      <Navbar />

      <h1 className="mt-10 text-4xl font-extrabold text-white">Admin Dashboard</h1>
      <p className="text-white/70 mt-1">Full token control panel</p>

      <AdminGuard>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <TradingControl />
          <PauseControl />
          <WhitelistControl />
          <FreezeControl />
          <LimitsControl />
          <VestingControl />
          <BuybackControl />
        </div>
      </AdminGuard>
    </main>
  );
}
