"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { ABI } from "../../lib/contract";
import { TOKEN_ADDRESS } from "../../lib/addresses";
import ActionButton from "../ActionButton";

export default function WhitelistControl() {
  const [wallet, setWallet] = useState("");
  const { writeContract, isPending } = useWriteContract();

  const onAdd = () => {
    if (!wallet || !wallet.startsWith("0x") || wallet.length !== 42) {
      alert("Please enter a valid wallet address (0x...)");
      return;
    }

    writeContract({
      address: TOKEN_ADDRESS,
      abi: ABI,
      functionName: "setWhitelist",
      args: [wallet as `0x${string}`, true],
    });
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold text-white">Whitelist Wallet</h2>
      <p className="text-white/60 text-sm mt-1">
        Add a wallet to whitelist (bypass limits / trading off rules).
      </p>

      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value.trim())}
        placeholder="0x..."
        className="mt-4 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/25"
      />

      <div className="mt-4 flex gap-3">
        <ActionButton
          label={isPending ? "Processing..." : "Add to Whitelist"}
          onClick={onAdd}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
