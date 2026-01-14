import { Wallet, Provider } from "zksync-ethers";
import { ethers } from "ethers";
import * as hre from "hardhat";
import * as dotenv from "dotenv";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

dotenv.config();

const DEFAULT_ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

function roleHash(name: string) {
  return ethers.keccak256(ethers.toUtf8Bytes(name));
}

function isAddress(addr?: string) {
  try {
    return !!addr && ethers.isAddress(addr);
  } catch {
    return false;
  }
}

async function main() {
  const pk = process.env.WALLET_PRIVATE_KEY;
  if (!pk) throw new Error("❌ Missing WALLET_PRIVATE_KEY in contracts/.env");

  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
  if (!isAddress(TOKEN_ADDRESS))
    throw new Error("❌ Missing/Invalid TOKEN_ADDRESS in contracts/.env");

  const TARGET = process.env.TARGET_WALLET;
  if (!isAddress(TARGET))
    throw new Error("❌ Missing/Invalid TARGET_WALLET in contracts/.env");

  const GRANT_DEFAULT_ADMIN =
    (process.env.GRANT_DEFAULT_ADMIN || "").toLowerCase() === "true";

  // ✅ zkSync provider (hardhat config network url ব্যবহার করবে)
  const rpcUrl = hre.network.config.url as string | undefined;
  if (!rpcUrl) throw new Error("❌ Missing network RPC url in hardhat config");

  const provider = new Provider(rpcUrl);

  // ✅ Wallet WITH provider (THIS FIXES "missing provider")
  const wallet = new Wallet(pk, provider);

  // deployer only for artifact load (ok)
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("ControlledToken");

  // ✅ Contract now has signer+provider
  const token = new ethers.Contract(TOKEN_ADDRESS!, artifact.abi, wallet);

  const OPERATOR_ROLE = roleHash("OPERATOR_ROLE");
  const COMPLIANCE_ROLE = roleHash("COMPLIANCE_ROLE");
  const TREASURY_ROLE = roleHash("TREASURY_ROLE");
  const PAUSER_ROLE = roleHash("PAUSER_ROLE");

  console.log("========================================");
  console.log("Network:", hre.network.name);
  console.log("RPC:", rpcUrl);
  console.log("Deployer:", wallet.address);
  console.log("Token:", TOKEN_ADDRESS);
  console.log("Target:", TARGET);
  console.log("Grant DEFAULT_ADMIN:", GRANT_DEFAULT_ADMIN);
  console.log("========================================");

  const deployerIsAdmin: boolean = await token.hasRole(
    DEFAULT_ADMIN_ROLE,
    wallet.address
  );

  if (!deployerIsAdmin) {
    console.log("❌ Deployer is NOT DEFAULT_ADMIN_ROLE on this contract.");
    console.log("➡️ TOKEN_ADDRESS ভুল বা অন্য contract address set করা আছে।");
    process.exit(1);
  }

  async function grantIfNeeded(role: string, roleName: string) {
    const has: boolean = await token.hasRole(role, TARGET);
    if (has) {
      console.log(`ℹ️ Target already has ${roleName}`);
      return;
    }
    console.log(`⏳ Granting ${roleName}...`);
    const tx = await token.grantRole(role, TARGET);
    console.log(`➡️ Tx: ${tx.hash}`);
    await tx.wait();
    console.log(`✅ Granted ${roleName}`);
  }

  if (GRANT_DEFAULT_ADMIN) {
    await grantIfNeeded(DEFAULT_ADMIN_ROLE, "DEFAULT_ADMIN_ROLE");
  }

  await grantIfNeeded(OPERATOR_ROLE, "OPERATOR_ROLE");
  await grantIfNeeded(COMPLIANCE_ROLE, "COMPLIANCE_ROLE");
  await grantIfNeeded(TREASURY_ROLE, "TREASURY_ROLE");
  await grantIfNeeded(PAUSER_ROLE, "PAUSER_ROLE");

  console.log("✅ Done.");
}

main().catch((e) => {
  console.error("❌ Script failed:", e);
  process.exit(1);
});
