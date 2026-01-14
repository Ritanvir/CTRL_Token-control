"use client";

import { useWriteContract } from "wagmi";
import { ABI } from "../../lib/contract";
import { TOKEN_ADDRESS } from "../../lib/addresses";
import ActionButton from "../ActionButton";

export default function PauseControl() {
  const { writeContract, isPending } = useWriteContract();

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white">Emergency Pause</h2>
      <p className="text-white/60 text-sm mt-1">
        Pause or resume all transfers.
      </p>

      <div className="flex gap-3 mt-4">
        <ActionButton
          label="Pause"
          onClick={() =>
            writeContract({
              address: TOKEN_ADDRESS,
              abi: ABI,
              functionName: "pause",
            })
          }
          disabled={isPending}
        />
        <ActionButton
          label="Unpause"
          onClick={() =>
            writeContract({
              address: TOKEN_ADDRESS,
              abi: ABI,
              functionName: "unpause",
            })
          }
          disabled={isPending}
        />
              // (Removed invalid duplicate code block; the functionName and button code here duplicated code above and caused JSX parsing errors.)
      </div>
    </div>
  );
}
