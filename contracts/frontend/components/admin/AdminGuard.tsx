"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { controlledToken } from "../../lib/contract";

const DEFAULT_ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const args = useMemo(() => [DEFAULT_ADMIN_ROLE, address] as const, [address]);

  const { data, isLoading } = useReadContract({
    address: controlledToken.address,
    abi: controlledToken.abi,
    functionName: "hasRole",
    args,
    query: { enabled: !!address },
  });

  if (!mounted) {
    return (
      <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-6 text-white/70">
        Loading...
      </div>
    );
  }

  if (!isConnected || !address) {
    return (
      <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-6 text-white/70">
        Please connect wallet.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-6 text-white/70">
        Checking admin role...
      </div>
    );
  }

  const isAdmin = Boolean(data);

  if (!isAdmin) {
    return (
      <div className="mt-8 rounded-3xl bg-red-500/10 border border-red-500/20 p-6 text-white">
        <div className="font-bold text-lg">Access denied</div>
        <div className="text-white/70 mt-1">
          This wallet is not DEFAULT_ADMIN_ROLE.
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
