# Self Protocol Frontend Integration

This frontend application demonstrates how to integrate Self Protocol V2 for on-chain identity verification using the Self Protocol SDK.

## Features

- **Wallet Connection**: Connect user wallets to get unique identifiers
- **Multiple Verification Configurations**: Different verification scenarios (age verification, geographic restrictions, OFAC compliance)
- **Real-time Verification Status**: Poll for verification completion
- **On-chain Integration**: Verification results processed through smart contracts
- **Responsive UI**: Modern, clean interface with Tailwind CSS

## Prerequisites

1. **Self Protocol SDK**: Install the official SDK
2. **Smart Contract**: Deployed `ExampleV2` contract on Celo testnet/mainnet
3. **Self Mobile App**: Users need the Self app installed on their mobile devices

## Installation

### 1. Install Dependencies

```bash
cd frontend
npm install @self-protocol/sdk
```

### 2. Configure Contract Addresses

Update the contract addresses in `src/lib/self-config.ts`:

```typescript
const CONTRACT_ADDRESSES = {
  celoTestnet: "YOUR_DEPLOYED_CONTRACT_ADDRESS", // Your ExampleV2 contract
  celoMainnet: "0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF" // Mainnet hub address
};
```

### 3. Update Configuration

Modify the configuration in `src/lib/self-config.ts` to match your requirements:

```typescript
export const defaultSelfConfig: SelfAppConfig = {
  appName: "Your App Name",
  scope: "Your-App-Scope",
  endpoint: CONTRACT_ADDRESSES.celoTestnet,
  endpointType: "staging_celo", // or "celo" for mainnet
  userId: "",
  userIdType: "hex",
  version: 2,
  devMode: true, // Set to false for production
  disclosures: {
    // Configure your verification requirements
    date_of_birth: true,
    nationality: true,
    name: true,
    minimumAge: 18,
    ofac: true
  }
};
```

## Configuration Options

### Available Disclosures

```typescript
disclosures: {
  // Passport data fields (boolean)
  name?: boolean,                 // Full name
  date_of_birth?: boolean,        // Date of birth
  nationality?: boolean,          // Nationality/citizenship
  gender?: boolean,               // Gender
  issuing_state?: boolean,        // Document issuing country
  passport_number?: boolean,      // Passport number
  expiry_date?: boolean,         // Document expiration date
  
  // Verification rules
  minimumAge?: number,           // Minimum age requirement (10-100)
  excludedCountries?: string[],  // Array of 3-letter country codes (max 40)
  ofac?: boolean,               // OFAC compliance checking
}
```

### Configuration Examples

#### Age Verification (21+)
```typescript
const ageVerificationConfig: SelfAppConfig = {
  appName: "Age Verification App",
  scope: "Age-Verification-App",
  disclosures: {
    date_of_birth: true,
    minimumAge: 21
  }
};
```

#### Geographic Restrictions
```typescript
const geographicRestrictionConfig: SelfAppConfig = {
  appName: "Geographic Restricted App",
  scope: "Geographic-App",
  disclosures: {
    nationality: true,
    issuing_state: true,
    excludedCountries: ["USA", "RUS", "CHN"]
  }
};
```

#### OFAC Compliance
```typescript
const ofacComplianceConfig: SelfAppConfig = {
  appName: "OFAC Compliant App",
  scope: "OFAC-App",
  disclosures: {
    name: true,
    date_of_birth: true,
    ofac: true
  }
};
```

## Usage

### 1. Start Development Server

```bash
npm run dev
```

### 2. Connect Wallet

- Click "Connect Wallet" to simulate wallet connection
- In production, integrate with MetaMask, WalletConnect, or other wallet providers

### 3. Select Verification Configuration

Choose from predefined configurations or create custom ones based on your use case.

### 4. Start Verification

- Click "Start Verification" to generate a QR code
- Scan the QR code with the Self mobile app
- Complete identity verification in the app
- Wait for on-chain verification completion

## Smart Contract Integration

The frontend integrates with your `ExampleV2` smart contract:

```solidity
contract ExampleV2 is SelfVerificationRoot, Ownable {
    constructor(
        address i_identityVerificationHubV2,
        uint256 i_scope
    ) SelfVerificationRoot(i_identityVerificationHubV2, i_scope) {
        // Initialize contract
    }

    function customVerificationHook(
        ISelfVerificationRoot.GenericDiscloseOutputV2 memory output,
        bytes memory userData
    ) internal virtual override {
        // Your custom business logic here
        require(bytes(output.nationality).length > 0, "Nationality required");
    }
}
```

## Environment Configuration

### Development
- Use `staging_celo` endpoint type
- Set `devMode: true`
- Use testnet contract addresses

### Production
- Use `celo` endpoint type
- Set `devMode: false`
- Use mainnet contract addresses
- Ensure proper error handling and user feedback

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   └── page.tsx              # Main application page
│   ├── components/
│   │   ├── SelfVerification.tsx  # Verification component
│   │   └── WalletConnection.tsx  # Wallet connection component
│   └── lib/
│       └── self-config.ts        # Configuration management
└── README-SELF-PROTOCOL.md       # This file
```

## Customization

### Adding New Verification Types

1. Create a new configuration in `src/lib/self-config.ts`:

```typescript
export const customVerificationConfig: SelfAppConfig = {
  ...defaultSelfConfig,
  appName: "Custom Verification App",
  scope: "Custom-App",
  disclosures: {
    // Your custom requirements
  }
};
```

2. Add it to the configuration options in `src/app/page.tsx`:

```typescript
const configOptions = [
  // ... existing options
  { name: 'Custom Verification', config: customVerificationConfig }
];
```

### Integrating with Real Wallets

Replace the demo wallet connection in `WalletConnection.tsx` with real wallet integration:

```typescript
// Example with MetaMask
const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      onConnect(accounts[0]);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }
};
```

## Troubleshooting

### Common Issues

1. **SDK Not Found**: Ensure `@self-protocol/sdk` is installed
2. **Contract Address Error**: Verify contract addresses in configuration
3. **QR Code Not Generating**: Check network connectivity and SDK initialization
4. **Verification Timeout**: Increase polling interval or timeout duration

### Debug Mode

Enable debug logging by setting `devMode: true` in your configuration.

## Security Considerations

1. **Never expose private keys** in frontend code
2. **Validate all user inputs** before sending to contracts
3. **Use HTTPS** in production
4. **Implement proper error handling** for failed verifications
5. **Rate limiting** for verification requests

## Support

For issues related to:
- **Self Protocol SDK**: Check the official documentation
- **Smart Contract Integration**: Review your contract implementation
- **Frontend Issues**: Check browser console for errors

## Next Steps

1. Deploy your smart contract to testnet/mainnet
2. Update contract addresses in configuration
3. Test with real wallet connections
4. Implement production error handling
5. Add analytics and monitoring
6. Deploy to production environment 