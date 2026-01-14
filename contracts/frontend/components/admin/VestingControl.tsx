"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { controlledToken } from "../../lib/contract";
import ActionButton from "../ActionButton";

export default function VestingControl() {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [start, setStart] = useState("");   // unix seconds
  const [cliff, setCliff] = useState("");   // seconds
  const [duration, setDuration] = useState(""); // seconds

  const { writeContract, isPending } = useWriteContract();

  const create = () => {
    const u = user.trim();
    if (!u.startsWith("0x") || u.length !== 42) return alert("Invalid user address");
    if (!amount || !start || !cliff || !duration) return alert("Fill all fields");

    writeContract({
      address: controlledToken.address,
      abi: controlledToken.abi,
      functionName: "createVesting",
      args: [
        u as `0x${string}`,
        BigInt(amount),
        BigInt(start),
        BigInt(cliff),
        BigInt(duration),
      ],
    });
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold text-white">Vesting Creator</h2>
      <p className="text-white/60 text-sm mt-1">
        start = unix timestamp (seconds). cliff & duration in seconds.
      </p>

      <div className="grid grid-cols-1 gap-3 mt-4">
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="User wallet 0x..." value={user} onChange={(e) => setUser(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="Amount (wei)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="Start (unix seconds)" value={start} onChange={(e) => setStart(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="Cliff (seconds)" value={cliff} onChange={(e) => setCliff(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="Duration (seconds)" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>

      <div className="mt-4">
        <ActionButton label="Create Vesting" onClick={create} disabled={isPending} />
      </div>
    </div>
  );
}
