import { upgrades } from "hardhat";

async function main() {
  // Replace this with your deployed proxy address
  const proxyAddress = "0x8DBA69171De65C0cEA375F0D74624c7f41a77051";

  // Get the implementation contract behind the proxy
  const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log("✅ Proxy address:", proxyAddress);
  console.log("✅ Implementation address:", implAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
