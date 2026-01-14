import { NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import type { Abi } from "viem";

import { zkSyncSepolia } from "@/lib/chains";
import abiJson from "@/lib/abi/ControlledToken.json";

const abi = abiJson.abi as Abi;

export async function GET() {
  try {
    const address = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;
    if (!address) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_TOKEN_ADDRESS" },
        { status: 500 }
      );
    }

    const client = createPublicClient({
      chain: zkSyncSepolia,
      transport: http(process.env.NEXT_PUBLIC_RPC || "https://sepolia.era.zksync.dev"),
    });

    // Basic reads
    const [
      name,
      symbol,
      decimals,
      totalSupply,
      tradingEnabled,
      maxTxAmount,
      maxBuyAmount,
      maxSellAmount,
      maxWalletAmount,
      cooldownEnabled,
      cooldownSeconds,
      stableToken,
      mainPair,
    ] = await Promise.all([
      client.readContract({ address, abi, functionName: "name" }) as Promise<string>,
      client.readContract({ address, abi, functionName: "symbol" }) as Promise<string>,
      client.readContract({ address, abi, functionName: "decimals" }) as Promise<number>,
      client.readContract({ address, abi, functionName: "totalSupply" }) as Promise<bigint>,
      client.readContract({ address, abi, functionName: "tradingEnabled" }) as Promise<boolean>,
      client.readContract({ address, abi, functionName: "maxTxAmount" }) as Promise<bigint>,
      client.readContract({ address, abi, functionName: "maxBuyAmount" }) as Promise<bigint>,
      client.readContract({ address, abi, functionName: "maxSellAmount" }) as Promise<bigint>,
      client.readContract({ address, abi, functionName: "maxWalletAmount" }) as Promise<bigint>,
      client.readContract({ address, abi, functionName: "cooldownEnabled" }) as Promise<boolean>,
      client.readContract({ address, abi, functionName: "cooldownSeconds" }) as Promise<bigint>,
      client.readContract({ address, abi, functionName: "stableToken" }) as Promise<`0x${string}`>,
      client.readContract({ address, abi, functionName: "mainPair" }) as Promise<`0x${string}`>,
    ]);

    // NOTE: bigint JSON এ যাবে না, তাই string বানাচ্ছি
    return NextResponse.json({
      ok: true,
      address,
      name,
      symbol,
      decimals,
      totalSupply: totalSupply.toString(),
      tradingEnabled,
      limits: {
        maxTxAmount: maxTxAmount.toString(),
        maxBuyAmount: maxBuyAmount.toString(),
        maxSellAmount: maxSellAmount.toString(),
        maxWalletAmount: maxWalletAmount.toString(),
      },
      cooldown: {
        enabled: cooldownEnabled,
        seconds: cooldownSeconds.toString(),
      },
      stabilization: {
        stableToken,
        mainPair,
      },
      explorer: `${process.env.NEXT_PUBLIC_EXPLORER || "https://sepolia.explorer.zksync.io"}/address/${address}`,
      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 300),
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
