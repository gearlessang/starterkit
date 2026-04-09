# ⛓️ Web3 Starter Kit

> A production-ready boilerplate for building decentralized applications (dApps) on EVM-compatible blockchains.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?logo=solidity)
![Hardhat](https://img.shields.io/badge/Hardhat-2.x-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![wagmi](https://img.shields.io/badge/wagmi-2.x-1C1C1C)

---

## 🚀 Features

- **Smart Contract Development** — Solidity contracts with Hardhat, full test coverage with Chai & Mocha
- **Frontend Integration** — Next.js 14 + wagmi v2 + viem for seamless wallet connectivity
- **Multi-wallet Support** — MetaMask, WalletConnect, Coinbase Wallet, and more via RainbowKit
- **ERC-20 & ERC-721 Templates** — Battle-tested token and NFT contract templates
- **Deployment Scripts** — Automated deployment to testnets (Sepolia, Mumbai) and mainnets
- **Type Safety** — Auto-generated TypeScript types from ABIs with typechain
- **Gas Optimization** — Built-in gas reporter and optimizer recommendations
- **Security First** — OpenZeppelin contracts, Slither static analysis, and audit checklist

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Smart Contracts | Solidity 0.8.24 |
| Dev Framework | Hardhat |
| Frontend | Next.js 14 (App Router) |
| Web3 Hooks | wagmi v2 + viem |
| Wallet UI | RainbowKit |
| Testing | Hardhat + Chai |
| Linting | ESLint + Prettier + Solhint |
| CI/CD | GitHub Actions |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/web3-starter-kit.git
cd web3-starter-kit

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Configure Environment

```env
# .env
PRIVATE_KEY=your_deployer_private_key_here
ALCHEMY_API_KEY=your_alchemy_key_here
ETHERSCAN_API_KEY=your_etherscan_key_here

# Frontend
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia testnet
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run gas report
npm run gas-report
```

---

## 📜 Smart Contracts

### Compile

```bash
npm run compile
```

### Deploy to Sepolia Testnet

```bash
npm run deploy:sepolia
```

### Deploy to Mainnet

```bash
npm run deploy:mainnet
```

### Verify on Etherscan

```bash
npm run verify -- --network sepolia <CONTRACT_ADDRESS>
```

---

## 🖥️ Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dApp.

---

## 📁 Project Structure

```
web3-starter-kit/
├── contracts/
│   ├── token/
│   │   ├── MyToken.sol          # ERC-20 template
│   │   └── MyNFT.sol            # ERC-721 template
│   ├── governance/
│   │   └── Governor.sol         # On-chain governance
│   └── interfaces/
│       └── IMyToken.sol
├── scripts/
│   ├── deploy.ts                # Deployment script
│   └── verify.ts                # Etherscan verification
├── test/
│   ├── MyToken.test.ts
│   └── MyNFT.test.ts
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   ├── components/          # React components
│   │   ├── hooks/               # Custom wagmi hooks
│   │   └── config/              # Wagmi + chain config
│   └── public/
├── docs/
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   └── ARCHITECTURE.md
├── .github/
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
├── hardhat.config.ts
├── .env.example
└── package.json
```

---

## 🔐 Security

- All contracts inherit from audited [OpenZeppelin](https://openzeppelin.com/contracts/) libraries
- Run Slither before deploying: `npm run slither`
- Read [SECURITY.md](./docs/SECURITY.md) before mainnet deployment
- **Never commit your private key or `.env` file**

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.

---

<p align="center">Built with ❤️ for the decentralized web</p>
