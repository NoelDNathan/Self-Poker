# Self Protocol Contracts

This project contains smart contracts built with Hardhat and Hardhat Ignition for deployment management. The main contract is `ExampleV2`, which integrates with Self Protocol's identity verification system.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hardhat CLI
- API keys for block explorers (Etherscan, Celoscan)

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# API Keys for Contract Verification
ETHERSCAN_API_KEY=your_etherscan_api_key
CELOSCAN_API_KEY=your_celoscan_api_key

# Private Keys for Deployment
CELO_KEY=your_celo_private_key
CELO_ALFAJORES_KEY=your_celo_alfajores_private_key

# RPC URLs (optional - defaults provided)
SEPOLIA_RPC_URL=your_sepolia_rpc_url
CELO_RPC_URL=your_celo_rpc_url
CELO_ALFAJORES_RPC_URL=your_celo_alfajores_rpc_url
```

##  Available Networks

The project is configured to deploy on the following networks:

- **Sepolia** (Testnet): `chainId: 11155111`
- **Celo** (Mainnet): `chainId: 42220`
- **Celo Alfajores** (Testnet): `chainId: 44787`

## 🏗️ Deployment & Verification

### Deploy and Verify on Sepolia

```bash
npx hardhat ignition deploy ignition/modules/ExampleV2.ts --network sepolia --verify
```

### Deploy and Verify on Celo Alfajores

```bash
npx hardhat ignition deploy ignition/modules/ExampleV2.ts --network celoAlfajores --verify
```

### Deploy on Celo Mainnet

```bash
npx hardhat ignition deploy ignition/modules/ExampleV2.ts --network celo
```

### Verify Existing Deployments

If you need to verify contracts that were already deployed:

```bash
# For Sepolia
npx hardhat ignition verify chain-11155111

# For Celo Alfajores
npx hardhat ignition verify chain-44787
```

## 🔧 Development

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Run Tests with Gas Reporting

```bash
REPORT_GAS=true npx hardhat test
```

### Start Local Node

```bash
npx hardhat node
```

### Deploy to Local Network

```bash
npx hardhat ignition deploy ignition/modules/ExampleV2.ts
```

##  Contract Details

### ExampleV2 Contract

The main contract `ExampleV2` extends `SelfVerificationRoot` and integrates with Self Protocol's identity verification system.

**Key Features:**
- Identity verification through Self Protocol Hub V2
- Configurable scope for application-specific use cases
- Custom verification hooks for business logic
- Owner-controlled scope management

**Constructor Parameters:**
- `_identityVerificationHubV2`: Address of the Self Protocol Hub V2
- `_scope`: Application-specific scope identifier

##  Getting API Keys

### Etherscan (for Sepolia)
1. Visit [Etherscan](https://etherscan.io)
2. Sign up or log in
3. Go to "API Keys" tab
4. Click "Add" and create a new API key
5. Add to `.env` as `ETHERSCAN_API_KEY`

### Celoscan (for Celo networks)
1. Visit [Celoscan](https://celoscan.io)
2. Sign up or log in
3. Navigate to "API Keys" section
4. Create a new API key
5. Add to `.env` as `CELOSCAN_API_KEY`

## ️ Troubleshooting

### Common Issues

1. **"Address does not have bytecode"**
   - Wait a few minutes for the block explorer to index your contract
   - Try the verification command again

2. **"Already verified"**
   - Your contract might already be verified with identical bytecode
   - Check the block explorer for existing verification

3. **API key errors**
   - Verify your API keys are correct
   - Ensure environment variables are properly set
   - Check network configuration in `hardhat.config.ts`

4. **Insufficient funds**
   - Ensure your deployment account has enough native tokens for gas fees
   - Use faucets for testnet deployments

### Testnet Faucets

- **Sepolia**: [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- **Celo Alfajores**: [Celo Faucet](https://faucet.celo.org/)

## 📁 Project Structure
