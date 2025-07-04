import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  // Read deployed addresses from JSON file
  const addressesPath = path.join(__dirname, "../ignition/deployments/chain-44787/deployed_addresses.json");
  const addresses = JSON.parse(fs.readFileSync(addressesPath, "utf8"));
  
  const exampleV2Address = addresses["ExampleV2Module#ExampleV2"];
  
  console.log("ExampleV2 address:", exampleV2Address);
  
  // Get contract instances
  const ExampleV2 = await ethers.getContractFactory("ExampleV2");
  const exampleV2Contract = ExampleV2.attach(exampleV2Address);
  
  // Use BigInt to handle large numbers
  const scope = BigInt("19480854580973084336140196946016910262973302484203138684155004687298069332502");
  
  // Interact with contracts
  const tx = await exampleV2Contract.setScope(scope);
  console.log("Transaction hash:", tx.hash);
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });