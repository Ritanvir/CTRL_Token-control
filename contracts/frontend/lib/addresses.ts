// frontend/lib/addresses.ts

// ✅ fallback: যদি .env.local missing হয় তাও app চলবে
const FALLBACK_TOKEN_ADDRESS =
  "0xcde3E313D02fEf1868aF23127043F7aCa693a1C1"; // <-- তোমার deployed token address

export const TOKEN_ADDRESS =
  (process.env.NEXT_PUBLIC_TOKEN_ADDRESS || FALLBACK_TOKEN_ADDRESS) as `0x${string}`;

// Optional: runtime check (dev এ helpful)
if (!TOKEN_ADDRESS || !TOKEN_ADDRESS.startsWith("0x") || TOKEN_ADDRESS.length !== 42) {
  // eslint-disable-next-line no-console
  console.warn(
    "⚠️ TOKEN_ADDRESS invalid. Set NEXT_PUBLIC_TOKEN_ADDRESS in .env.local"
  );
}
