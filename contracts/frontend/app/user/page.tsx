"use client";

import Navbar from "@/components/Navbar";
import BalanceCard from "@/components/user/BalanceCard";
import TransferCard from "@/components/user/TransferCard";
import VestingCard from "@/components/user/VestingCard";
import AddTokenCard from "@/components/user/AddTokenCard";

export default function UserPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <Navbar />

      <div className="mt-10">
        <h1 className="text-4xl font-extrabold text-white">User Dashboard</h1>
        <p className="mt-2 text-white/70">
          Balance, vesting claim, transfer info — সব এখানে থাকবে।
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <BalanceCard />
        <AddTokenCard />
        <VestingCard />
        <TransferCard />
      </div>
    </main>
  );
}
