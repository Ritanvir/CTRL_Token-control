# CTRL Token Control (zkSync Sepolia) — Hardhat + Next.js Admin/User Dashboard

A controlled token management system deployed on **zkSync Sepolia** with:
- **Smart Contract (Solidity)**: ControlledToken with admin/operator controls
- **Hardhat (zkSync deploy plugin)**: deploy + role granting scripts
- **Next.js Frontend**: interactive UI with **RainbowKit + wagmi** for wallet connect
- **Admin Dashboard**: whitelist, pause, trading toggles, etc (role-based)
- **User Dashboard**: balance, transfers, vesting/claim (as you extend)

---

## Repo Structure

CTRL_Token-control/
└─ contracts/
├─ contracts/
│ └─ ControlledToken.sol
├─ deploy/
│ ├─ deploy.ts
│ └─ grantRoles.ts
├─ deployments-zk/
├─ hardhat.config.ts
├─ package.json
├─ frontend/
│ ├─ app/
│ │ ├─ page.tsx
│ │ ├─ admin/page.tsx
│ │ ├─ user/page.tsx
│ │ ├─ providers.tsx
│ │ └─ globals.css
│ ├─ components/
│ │ ├─ Navbar.tsx
│ │ ├─ SectionCard.tsx
│ │ └─ ActionButton.tsx
│ ├─ lib/
│ │ ├─ abi/ControlledToken.json
│ │ ├─ contract.ts
│ │ ├─ addresses.ts
│ │ ├─ wagmi.ts
│ │ └─ chains.ts
│ ├─ package.json
│ └─ next.config.js
└─ README.md (optional)

yaml
Copy code

> **Vercel deploy** frontend root: `contracts/frontend`

---

## Prerequisites

- Node.js 18+ (Recommended)
- npm 9+
- Git
- Wallet private key (zkSync Sepolia funded)
- zkSync Sepolia RPC (optional, default works)

---

## 1) Install Dependencies

### Contracts (Hardhat)
```bash
cd contracts
npm install
Frontend (Next.js)
bash
Copy code
cd frontend
npm install
2) Environment Variables
A) contracts/.env
Create contracts/.env:

env
Copy code
# Deployer private key (NEVER COMMIT THIS)
WALLET_PRIVATE_KEY=0xYOUR_PRIVATE_KEY

# After deployment put deployed token address here (used by scripts)
TOKEN_ADDRESS=0xYourDeployedTokenAddress

# Role target wallet (MetaMask address) to grant roles
TARGET_WALLET=0xYourMetamaskAddress
B) contracts/frontend/.env.local
Create contracts/frontend/.env.local:

env
Copy code
NEXT_PUBLIC_APP_NAME=ControlledToken zkSync
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
NEXT_PUBLIC_TOKEN_ADDRESS=0xYourDeployedTokenAddress
3) Compile + Deploy Contract (zkSync Sepolia)
From contracts/ folder:

bash
Copy code
cd contracts
npx hardhat compile
npx hardhat run deploy/deploy.ts --network zkSyncSepolia
After deploy, you’ll see:

 deployed address

Explorer link

Update these:

contracts/.env → TOKEN_ADDRESS=...

contracts/frontend/.env.local → NEXT_PUBLIC_TOKEN_ADDRESS=...

4) Grant Roles (Admin Access)
If Admin page shows:

Access denied — not DEFAULT_ADMIN_ROLE

Then you must grant admin/roles to your wallet.

Run from contracts/:

bash
Copy code
npx hardhat run deploy/grantRoles.ts --network zkSyncSepolia
 Make sure TOKEN_ADDRESS and TARGET_WALLET are set in .env.

5) Run Frontend Locally
bash
Copy code
cd contracts/frontend
npm run dev
If port 3000 is busy, Next will auto use 3001.

Open:

Home: http://localhost:3000 (or 3001)

User: /user

Admin: /admin

Common Issues & Fixes
A) “Unable to acquire lock … .next/dev/lock”
Another Next instance is running.

Fix:

Stop previous npm run dev terminal

Delete lock file:

PowerShell:

powershell
Copy code
Remove-Item -Force .next\dev\lock
Git Bash:

bash
Copy code
rm -f .next/dev/lock
B) Vercel build error: “No Next.js version detected”
Root directory wrong.

 Vercel Settings → Root Directory:

bash
Copy code
contracts/frontend
C) Vercel install error: RainbowKit vs wagmi mismatch (ERESOLVE)
RainbowKit v2 requires wagmi v2.

 Fix in contracts/frontend:

bash
Copy code
rm -rf node_modules package-lock.json
npm i wagmi@^2 viem@^2 @tanstack/react-query@^5 @rainbow-me/rainbowkit@^2
npm install
6) Deploy Frontend to Vercel
Push repo to GitHub

Import project in Vercel

Set Root Directory to:

contracts/frontend

Add env variables in Vercel Project Settings:

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

NEXT_PUBLIC_TOKEN_ADDRESS

NEXT_PUBLIC_APP_NAME

Deploy

Deploy Link: https://ctrl-token-control-3i3i.vercel.app/
