"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { ABI } from "@/lib/contract";
import { TOKEN_ADDRESS } from "@/lib/addresses";
import ActionButton from "@/components/ActionButton";

export default function TransferCard() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const { writeContract, isPending } = useWriteContract();

  const onTransfer = () => {
    if (!to || !amount) return;

    writeContract({
      address: TOKEN_ADDRESS,
      abi: ABI,
      functionName: "transfer",
      args: [to as `0x${string}`, parseUnits(amount, 18)],
    });
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white">Transfer CTRL</h2>

      <div className="mt-4 grid gap-3">
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Receiver address (0x...)"
          className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (e.g. 10)"
          className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
        />

        <ActionButton label="Transfer" onClick={onTransfer} disabled={isPending} />
      </div>

      <p className="mt-3 text-xs text-white/60">
        Note: Frozen/limits/cooldown enabled থাকলে transfer fail হতে পারে।
      </p>
    </div>
  );
}
