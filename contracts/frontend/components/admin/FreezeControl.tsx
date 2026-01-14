"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { controlledToken } from "../../lib/contract";
import ActionButton from "../ActionButton";

export default function FreezeControl() {
  const [wallet, setWallet] = useState("");
  const [seconds, setSeconds] = useState("0");
  const { writeContract, isPending } = useWriteContract();

  const freeze = () => {
    const w = wallet.trim();
    const sec = BigInt(seconds || "0");
    if (!w.startsWith("0x") || w.length !== 42) return alert("Invalid address");
    writeContract({
      address: controlledToken.address,
      abi: controlledToken.abi,
      functionName: "freeze",
      args: [w as `0x${string}`, sec],
    });
  };

  const unfreeze = () => {
    const w = wallet.trim();
    if (!w.startsWith("0x") || w.length !== 42) return alert("Invalid address");
    writeContract({
      address: controlledToken.address,
      abi: controlledToken.abi,
      functionName: "unfreeze",
      args: [w as `0x${string}`],
    });
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold text-white">Freeze / Unfreeze</h2>
      <p className="text-white/60 text-sm mt-1">
        sec=0 means permanent freeze (based on your contract logic).
      </p>

      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Wallet 0x..."
        className="mt-4 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
      />

      <input
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        placeholder="Seconds (0 = permanent)"
        className="mt-3 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
      />

      <div className="mt-4 flex gap-3">
        <ActionButton label="Freeze" onClick={freeze} disabled={isPending} />
        <ActionButton label="Unfreeze" onClick={unfreeze} disabled={isPending} />
      </div>
    </div>
  );
}
