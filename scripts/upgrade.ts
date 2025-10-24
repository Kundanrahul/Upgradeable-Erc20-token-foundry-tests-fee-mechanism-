import { ethers, upgrades } from "hardhat";
import { MyTokenV2Upgradeable } from "../typechain-types"; // Type-safe import

async function main() {
  const proxyAddress = "0x8DBA69171De65C0cEA375F0D74624c7f41a77051";
  const feeCollector = "0xbEDDB491255cc57e07Ae15acc1CAEAc1df1F0E39";
  const feePercentage = 100; // 1% (bps)

  console.log("🚀 Starting upgrade for proxy:", proxyAddress);

  // Load new implementation
  const MyTokenV2 = await ethers.getContractFactory("MyTokenV2Upgradeable");
  const upgraded = (await upgrades.upgradeProxy(
    proxyAddress,
    MyTokenV2
  )) as MyTokenV2Upgradeable;

  console.log("✅ Proxy successfully upgraded!");
  const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
  console.log("📜 Implementation address:", implAddress);

  // Check if V2 is already initialized
  const currentVersion = await upgraded.getVersion();
  if (currentVersion === "V2") {
    console.log("⚠️ V2 already initialized — updating fee settings via admin function...");

    // Use admin function to set feeCollector and feePercentage
    const tx = await upgraded.updateFeeSettings(feeCollector, feePercentage);
    await tx.wait();
    console.log("✅ Fee settings updated successfully!");
  } else {
    console.log("🔹 Initializing V2...");
    const tx = await upgraded.initializeV2(feeCollector, feePercentage);
    await tx.wait();
    console.log("✅ V2 initialized successfully!");
  }

  // Log current configuration
  console.log("🔹 Version:", await upgraded.getVersion());
  console.log("🔹 Fee Collector:", await upgraded.feeCollector());
  console.log("🔹 Fee Percentage (bps):", await upgraded.feePercentage());
}

main().catch((error) => {
  console.error("❌ Error during upgrade:", error);
  process.exitCode = 1;
});



