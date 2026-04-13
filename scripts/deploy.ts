
  console.log("=".repeat(60));
  console.log("⛓️  Web3 Starter Kit — Deployment Script");
  console.log("=".repeat(60));
  console.log(`Network:   ${network.name}`);
  console.log(`Deployer:  ${deployer.address}`);
  console.log(`Balance:   ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH`);
  console.log("=".repeat(60));

  // ── Deploy MyToken ──────────────────────────────────────────────
  console.log("\n📦 Deploying MyToken (ERC-20)...");
  const MyTokenFactory = await ethers.getContractFactory("MyToken");
  const myToken: MyToken = await MyTokenFactory.deploy(deployer.address);
  await myToken.waitForDeployment();
  const tokenAddress = await myToken.getAddress();
  console.log(`✅ MyToken deployed to: ${tokenAddress}`);

  // ── Deploy MyNFT ────────────────────────────────────────────────
  console.log("\n🖼️  Deploying MyNFT (ERC-721)...");
  const MyNFTFactory = await ethers.getContractFactory("MyNFT");
  const myNFT: MyNFT = await MyNFTFactory.deploy(deployer.address);
  await myNFT.waitForDeployment();
  const nftAddress = await myNFT.getAddress();
  console.log(`✅ MyNFT deployed to: ${nftAddress}`);

  // ── Mint initial supply ─────────────────────────────────────────
  console.log("\n🪙  Minting initial token supply...");
  const initialSupply = ethers.parseEther("1000000"); // 1M tokens
  const mintTx = await myToken.mint(deployer.address, initialSupply);
  await mintTx.wait();
  console.log(`✅ Minted ${ethers.formatEther(initialSupply)} MTK to deployer`);

  // ── Summary ────────────────────────────────────────────────────
  console.log("\n" + "=".repeat(60));
  console.log("🎉 Deployment complete!");
  console.log("=".repeat(60));
  console.log(`MyToken (MTK):  ${tokenAddress}`);
  console.log(`MyNFT   (MNFT): ${nftAddress}`);
  console.log("=".repeat(60));

  // ── Etherscan verification (skip on local networks) ────────────
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("\n⏳ Waiting 5 confirmations before verifying...");
    await myToken.deploymentTransaction()?.wait(5);

    console.log("\n🔍 Verifying contracts on Etherscan...");
    try {
      await run("verify:verify", {
        address: tokenAddress,
        constructorArguments: [deployer.address],
      });
      console.log("✅ MyToken verified");
    } catch (e: any) {
      console.log("⚠️  MyToken verification failed:", e.message);
    }

    try {
      await run("verify:verify", {
        address: nftAddress,
        constructorArguments: [deployer.address],
      });
      console.log("✅ MyNFT verified");
    } catch (e: any) {
      console.log("⚠️  MyNFT verification failed:", e.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
