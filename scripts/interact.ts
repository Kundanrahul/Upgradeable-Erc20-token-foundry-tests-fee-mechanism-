import { ethers } from "hardhat";

async function main() {
  const proxyAddress = "0x8DBA69171De65C0cEA375F0D74624c7f41a77051";

  // Use V2 ABI to access new functions
  const MyToken = await ethers.getContractAt("MyTokenV2Upgradeable", proxyAddress);

  console.log("🔹 Interacting with MyTokenV2Upgradeable at:", proxyAddress);

  // Basic info
  const name = await MyToken.name();
  const symbol = await MyToken.symbol();
  console.log(`Token Name: ${name}, Symbol: ${symbol}`);

  const [signer] = await ethers.getSigners();

  // Initial balance
  let balance = await MyToken.balanceOf(signer.address);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} ${symbol}`);

  // Mint 10 tokens to deployer
  console.log("\nMinting 10 tokens to deployer...");
  const mintTx = await MyToken.mint(signer.address, ethers.parseEther("10"));
  await mintTx.wait();
  console.log("✅ Minted 10 tokens!");

  balance = await MyToken.balanceOf(signer.address);
  console.log(`Updated deployer balance: ${ethers.formatEther(balance)} ${symbol}`);

  // Version info
  const version = await MyToken.getVersion();
  console.log("\nToken version:", version);

  // Fee info
  const feeCollector = await MyToken.feeCollector();
  const feePercentage = await MyToken.feePercentage();
  console.log("Fee Collector:", feeCollector);
  console.log("Fee Percentage (bps):", feePercentage);

  // -----------------------------
  // Test transfer with fee
  // -----------------------------
  const recipient = "0x1234567890123456789012345678901234567890";
  const transferAmount = ethers.parseEther("5");

  console.log(`\nTransferring ${ethers.formatEther(transferAmount)} ${symbol} to ${recipient}...`);
  const tx = await MyToken.transfer(recipient, transferAmount);
  await tx.wait();

  const deployerBalance = await MyToken.balanceOf(signer.address);
  const recipientBalance = await MyToken.balanceOf(recipient);
  const feeBalance = await MyToken.balanceOf(feeCollector);

  console.log(`Deployer balance after transfer: ${ethers.formatEther(deployerBalance)}`);
  console.log(`Recipient balance: ${ethers.formatEther(recipientBalance)}`);
  console.log(`Fee Collector balance: ${ethers.formatEther(feeBalance)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


