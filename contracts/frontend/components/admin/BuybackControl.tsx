"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { controlledToken } from "../../lib/contract";
import ActionButton from "../ActionButton";

export default function BuybackControl() {
  const { writeContract, isPending } = useWriteContract();

  const [router, setRouter] = useState("");
  const [stable, setStable] = useState("");
  const [pair, setPair] = useState("");

  const [stableIn, setStableIn] = useState("");
  const [minOut, setMinOut] = useState("");
  const [deadline, setDeadline] = useState("");

  const setConfig = () => {
    const r = router.trim(), s = stable.trim(), p = pair.trim();
    if (![r,s,p].every(x => x.startsWith("0x") && x.length === 42)) return alert("Invalid address");
    writeContract({
      address: controlledToken.address,
      abi: controlledToken.abi,
      functionName: "setStabilizationConfig",
      args: [r as `0x${string}`, s as `0x${string}`, p as `0x${string}`],
    });
  };

  const buyback = () => {
    if (!stableIn || !minOut || !deadline) return alert("Fill stableIn/minOut/deadline");
    writeContract({
      address: controlledToken.address,
      abi: controlledToken.abi,
      functionName: "stabilizeBuyback",
      args: [BigInt(stableIn), BigInt(minOut), BigInt(deadline)],
    });
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-xl md:col-span-2">
      <h2 className="text-xl font-bold text-white">Stabilization Buyback</h2>
      <p className="text-white/60 text-sm mt-1">
        First set config (router/stable/pair), then run buyback.
      </p>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="Router 0x..." value={router} onChange={(e) => setRouter(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="Stable token 0x..." value={stable} onChange={(e) => setStable(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="Main pair 0x..." value={pair} onChange={(e) => setPair(e.target.value)} />
      </div>

      <div className="mt-4">
        <ActionButton label="Save Buyback Config" onClick={setConfig} disabled={isPending} />
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-6">
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="stableIn (wei)" value={stableIn} onChange={(e) => setStableIn(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="minOut (wei)" value={minOut} onChange={(e) => setMinOut(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="deadline (unix seconds)" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </div>

      <div className="mt-4">
        <ActionButton label="Run Buyback" onClick={buyback} disabled={isPending} />
      </div>
    </div>
  );
}
