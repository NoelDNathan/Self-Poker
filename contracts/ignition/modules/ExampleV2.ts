// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Direcciones del Hub V2 de Self Protocol
const IDENTITY_VERIFICATION_HUB_V2 = {
  celoTestnet: "0x68c931C9a534D37aa78094877F46fE46a49F1A51",
  celoMainnet: "0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF"
};

const ExampleV2Module = buildModule("ExampleV2Module", (m) => {
  // Parámetros configurables del módulo
  const identityVerificationHub = m.getParameter(
    "identityVerificationHub", 
    IDENTITY_VERIFICATION_HUB_V2.celoTestnet
  );
  const scope = m.getParameter("scope", 0);


  console.log("identityVerificationHub", identityVerificationHub);
  console.log("scope", scope);
  // Deploy del contrato ExampleV2
  const exampleV2 = m.contract("ExampleV2", [
    "0x68c931C9a534D37aa78094877F46fE46a49F1A51",
    scope
  ]);

  return { exampleV2 };
});

export default ExampleV2Module;