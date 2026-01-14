"use client";

import ActionButton from "@/components/ActionButton";
import { TOKEN_ADDRESS } from "@/lib/addresses";

export default function AddTokenCard() {
  const addToMetamask = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum?.request) {
      alert("MetaMask not found");
      return;
    }

    try {
      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: TOKEN_ADDRESS,
            symbol: "CTRL",
            decimals: 18,
          },
        },
      });
    } catch (e) {
      console.error(e);
      alert("Failed to add token");
    }
  };

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white">Add CTRL to MetaMask</h2>
      <p className="mt-2 text-sm text-white/60">
        One click import token to your wallet UI.
      </p>

      <div className="mt-4">
        <ActionButton label="Add token" onClick={addToMetamask} />
      </div>
    </div>
  );
}
