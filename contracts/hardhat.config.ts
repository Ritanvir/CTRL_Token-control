import { HardhatUserConfig } from "hardhat/config";
import "@matterlabs/hardhat-zksync";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-deploy";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  zksolc: {
    // zkSolc settings — zkSync docs example style
    version: "1.5.12",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
        mode: "3",
      },
      // Use EVM legacy assembly codegen to match solc behavior (avoids future hard errors)
      codegen: "evmla",
    },
  },
  solidity: {
    version: "0.8.20",
  },
  defaultNetwork: "zkSyncSepolia",
  networks: {
    zkSyncSepolia: {
      url: process.env.ZKSYNC_RPC || "https://sepolia.era.zksync.dev",
      ethNetwork: process.env.ETH_SEPOLIA_RPC || "sepolia",
      zksync: true,
    },
  },
};

export default config;
