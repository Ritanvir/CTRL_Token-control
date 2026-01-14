"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { controlledToken } from "../../lib/contract";
import ActionButton from "../ActionButton";

export default function LimitsControl() {
  const [maxTx, setMaxTx] = useState("");
  const [maxBuy, setMaxBuy] = useState("");
  const [maxSell, setMaxSell] = useState("");
  const [maxWallet, setMaxWallet] = useState("");

  const { writeContract, isPending } = useWriteContract();

  const save = () => {
    if (!maxTx || !maxBuy || !maxSell || !maxWallet) {
      alert("Fill all fields");
      return;
    }

    writeContract({
      address: controlledToken.address,
      abi: controlledToken.abi,
      functionName: "setLimits",
      args: [BigInt(maxTx), BigInt(maxBuy), BigInt(maxSell), BigInt(maxWallet)],
    });
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold text-white">Limits</h2>
      <p className="text-white/60 text-sm mt-1">
        Values are token units (wei-style). Use full decimals.
      </p>

      <div className="grid grid-cols-1 gap-3 mt-4">
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="maxTxAmount" value={maxTx} onChange={(e) => setMaxTx(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="maxBuyAmount" value={maxBuy} onChange={(e) => setMaxBuy(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="maxSellAmount" value={maxSell} onChange={(e) => setMaxSell(e.target.value)} />
        <input className="rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
          placeholder="maxWalletAmount" value={maxWallet} onChange={(e) => setMaxWallet(e.target.value)} />
      </div>

      <div className="mt-4">
        <ActionButton label="Save Limits" onClick={save} disabled={isPending} />
      </div>
    </div>
  );
}
