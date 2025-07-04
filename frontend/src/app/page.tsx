"use client";

import { useState, useEffect } from "react";
import SelfQRcodeWrapper, { SelfAppBuilder } from "@selfxyz/qrcode";

// You'll need to import or define your logo
// const logo = "your-base64-encoded-logo-string";

export default function HomePage() {
  const [address, setAddress] = useState<string>("");
  const [selfApp, setSelfApp] = useState<ReturnType<typeof SelfAppBuilder.prototype.build> | null>(
    null
  );

  useEffect(() => {
    // Initialize wallet connection or get user address
    // This is a placeholder - you'll need to implement actual wallet connection
    const initializeWallet = async () => {
      // Example: Get address from wallet connection
      // const userAddress = await getWalletAddress();
      // setAddress(userAddress);

      // For now, using a placeholder address
      setAddress("0x1234567890123456789012345678901234567890");
    };

    initializeWallet();
  }, []);

  useEffect(() => {
    if (address) {
      // You'll need to define your logo as a base64 string
      const logo =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDkuNzRMMTIgMTZMMTAuOTEgOS43NEw0IDlMMTAuOTEgOC4yNkwxMiAyWiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=";

      const app = new SelfAppBuilder({
        appName: "Self Example App V2",
        scope: "Self-Example-App-V2",
        endpoint: "0xDFBfA6d4E1b7F4De09F41B68F1b1C72dD0740cE4", // Your SelfVerificationRoot contract
        endpointType: "staging_celo", // "staging_celo" for testnet, "celo" for mainnet
        logoBase64: logo,
        userId: "0x70a58596794A3d67DA833963057f37E3735c1760", // User's wallet address (required)
        userIdType: "hex", // "uuid" or "hex"
        version: 2, // V2 configuration
        disclosures: {
          // Passport data fields
          date_of_birth: true,
          nationality: true,
          name: true,
          issuing_state: true,
          passport_number: true, // Passport number field
          gender: true,
          expiry_date: true,

          // Verification rules (integrated in disclosures for V2)
          minimumAge: 18, // Age requirement (10-100)
          excludedCountries: [], // Array of 3-letter country codes (e.g., ["USA", "RUS"])
          ofac: true, // OFAC compliance checking (boolean)
        },
        devMode: true, // Set to true for development/testing, false for production
        userDefinedData: "", // Optional: custom data passed to contract
      }).build();

      setSelfApp(app);
    }
  }, [address]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Self Protocol Example App V2
        </h1>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Configuration Status</h2>
            <div className="text-sm text-blue-800">
              <p>
                <strong>App Name:</strong> Self Example App V2
              </p>
              <p>
                <strong>Scope:</strong> Self-Example-App-V2
              </p>
              <p>
                <strong>Endpoint Type:</strong> staging_celo
              </p>
              <p>
                <strong>Version:</strong> 2
              </p>
              <p>
                <strong>User Address:</strong> {address || "Loading..."}
              </p>
              <p>
                <strong>Self App:</strong> {selfApp ? "Initialized" : "Not ready"}
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <h2 className="text-lg font-semibold text-green-900 mb-2">Required Actions</h2>
            <div className="text-sm text-green-800 space-y-2">
              <p>1. Replace "YOUR_DEPLOYED_CONTRACT_ADDRESS" with your actual contract address</p>
              <p>2. Implement proper wallet connection logic</p>
              <p>3. Add your actual logo as base64 string</p>
              <p>4. Set devMode to false for production</p>
            </div>
          </div>

          {selfApp && (
            <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
              <h2 className="text-lg font-semibold text-purple-900 mb-2">Self App Ready</h2>
              <p className="text-sm text-purple-800">
                The SelfAppBuilder has been successfully initialized and is ready to use.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
