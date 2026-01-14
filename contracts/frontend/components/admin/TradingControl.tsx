"use client";

import { useWriteContract } from "wagmi";
import { ABI } from "../../lib/contract";
import { TOKEN_ADDRESS } from "../../lib/addresses";
import ActionButton from "../ActionButton";

export default function TradingControl() {
  const { writeContract, isPending } = useWriteContract();

  const toggle = (enabled: boolean) => {
    writeContract({
      address: TOKEN_ADDRESS,
      abi: ABI,
      functionName: "setTradingEnabled",
      args: [enabled],
    });
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold text-white">Trading Control</h2>
      <p className="text-white/60 text-sm mt-1">
        Enable / disable trading.
      </p>

      <div className="flex gap-3 mt-4">
        <ActionButton label="Enable" onClick={() => toggle(true)} disabled={isPending} />
        <ActionButton label="Disable" onClick={() => toggle(false)} disabled={isPending} />
      </div>
    </div>
  );
}
