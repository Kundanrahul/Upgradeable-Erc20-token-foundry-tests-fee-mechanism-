import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyTokenUpgradeable");
  const token = await upgrades.deployProxy(MyToken, [deployer.address], {
    initializer: "initialize",
  });

  // Ethers v6 does not have token.deployed()
  console.log("✅ Token deployed at:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

