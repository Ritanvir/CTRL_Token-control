"use client";

import { useAccount, useReadContract } from "wagmi";
import { ABI } from "@/lib/contract";
import { TOKEN_ADDRESS } from "@/lib/addresses";
import { formatUnits } from "viem";

export default function BalanceCard() {
  const { address, isConnected } = useAccount();

  const { data, isLoading } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: ABI,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: Boolean(isConnected && address) },
  });

  const bal = data ? formatUnits(data as bigint, 18) : "0";

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">My Balance</h2>
        <span className="text-xs rounded-full bg-white/10 px-3 py-1 text-white/70">
          CTRL
        </span>
      </div>

      <div className="mt-4 text-3xl font-extrabold text-white">
        {isLoading ? "Loading..." : bal}
      </div>

      <p className="mt-2 text-sm text-white/60">
        Wallet: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
      </p>
    </div>
  );
}
