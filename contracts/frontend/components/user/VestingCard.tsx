"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ABI } from "@/lib/contract";
import { TOKEN_ADDRESS } from "@/lib/addresses";
import { formatUnits } from "viem";
import ActionButton from "@/components/ActionButton";

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

export default function VestingCard() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const { data, isLoading, refetch } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: ABI,
    functionName: "vesting",
    args: [address],
    query: { enabled: Boolean(isConnected && address) },
  });

  // vesting struct order:
  // total, released, start, cliff, duration, slice, revocable, revoked
  const v = (data as any) || null;

  const total = v ? BigInt(v[0]) : BigInt(0);
  const released = v ? BigInt(v[1]) : BigInt(0);
  const start = v ? Number(v[2]) : 0;
  const cliff = v ? Number(v[3]) : 0;
  const duration = v ? Number(v[4]) : 0;

  // approximate claimable (frontend estimate; contract final)
  let vested = BigInt(0);
  const t = nowSec();

  if (total > BigInt(0) && duration > 0) {
    if (t < start + cliff) {
      vested = BigInt(0);
    }
    else if (t >= start + duration) vested = total;
    else vested = (total * BigInt(t - start)) / BigInt(duration);
  }

  const claimable = vested > released ? vested - released : BigInt(0);

  const onClaim = async () => {
    writeContract({
      address: TOKEN_ADDRESS,
      abi: ABI,
      functionName: "claimVested",
      args: [],
    });

    // optional: small refetch after tx confirmed (manual refresh also ok)
    setTimeout(() => refetch(), 2500);
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white">Vesting</h2>

      {isLoading ? (
        <p className="mt-4 text-white/70">Loading...</p>
      ) : total === BigInt(0) ? (
        <p className="mt-4 text-white/70">No vesting assigned to this wallet.</p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <div className="text-white/60">Total</div>
              <div className="mt-1 font-bold text-white">{formatUnits(total, 18)} CTRL</div>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <div className="text-white/60">Released</div>
              <div className="mt-1 font-bold text-white">{formatUnits(released, 18)} CTRL</div>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <div className="text-white/60">Claimable (est.)</div>
              <div className="mt-1 font-bold text-white">{formatUnits(claimable, 18)} CTRL</div>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <div className="text-white/60">Cliff</div>
              <div className="mt-1 font-bold text-white">{cliff} sec</div>
            </div>
          </div>

          <div className="mt-5">
            <ActionButton label="Claim vested" onClick={onClaim} disabled={isPending} />
          </div>


          <p className="mt-3 text-xs text-white/60">
            Claimable estimate frontend এ হিসাব করা; final amount contract হিসাব করবে।
          </p>
        </>
      )}
    </div>
  );
}
