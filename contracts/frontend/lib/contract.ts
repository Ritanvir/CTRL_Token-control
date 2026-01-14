import type { Abi } from "viem";
import abiJson from "./abi/ControlledToken.json";
import { TOKEN_ADDRESS } from "./addresses";

export const ABI = ((abiJson as any).abi ?? abiJson) as Abi;

export const controlledToken = {
  address: TOKEN_ADDRESS as `0x${string}`,
  abi: ABI,
} as const;
