import type { Chain } from "viem";

export const zkSyncSepolia: Chain = {
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 300),
  name: "zkSync Era Sepolia",
  // Removed invalid 'network' property to fix type error
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC || "https://sepolia.era.zksync.dev"] },
    public: { http: [process.env.NEXT_PUBLIC_RPC || "https://sepolia.era.zksync.dev"] },
  },
  blockExplorers: {
    default: { name: "zkSync Explorer", url: process.env.NEXT_PUBLIC_EXPLORER || "https://sepolia.explorer.zksync.io" },
  },
};
