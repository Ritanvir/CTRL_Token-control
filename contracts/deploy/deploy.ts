import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Wallet } from "zksync-ethers";
import * as hre from "hardhat";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function main() {
  const pk = process.env.WALLET_PRIVATE_KEY;
  if (!pk) throw new Error("Missing WALLET_PRIVATE_KEY");

  const wallet = new Wallet(pk);
  const deployer = new Deployer(hre, wallet);

  const artifact = await deployer.loadArtifact("ControlledToken");

  const name = "ControlledToken";
  const symbol = "CTRL";
  const initialSupply = BigInt("100000000") * 10n ** 18n;
  const admin = wallet.address;

  const contract = await deployer.deploy(artifact, [
    name,
    symbol,
    initialSupply.toString(),
    admin,
  ]);

  const addr = await contract.getAddress();

  console.log("✅ Deployed to:", addr);
  console.log("👤 Admin (deployer):", admin);
  console.log("Explorer:", `https://sepolia.explorer.zksync.io/address/${addr}`);

  // ✅ Save address to frontend env automatically
  const envPath = "./frontend/.env.local";
  const envLine = `NEXT_PUBLIC_TOKEN_ADDRESS=${addr}\n`;
  fs.writeFileSync(envPath, envLine, { encoding: "utf8" });

  console.log("✅ Saved to:", envPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
