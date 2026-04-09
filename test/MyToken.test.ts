import { expect } from "chai";
import { ethers } from "hardhat";
import { MyToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("MyToken", () => {
  let token: MyToken;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  const MAX_SUPPLY = ethers.parseEther("1000000000"); // 1B

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MyToken");
    token = await Factory.deploy(owner.address);
  });

  // ── Deployment ───────────────────────────────────────────────────
  describe("Deployment", () => {
    it("Should set correct name and symbol", async () => {
      expect(await token.name()).to.equal("MyToken");
      expect(await token.symbol()).to.equal("MTK");
    });

    it("Should set the correct owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should start with zero supply", async () => {
      expect(await token.totalSupply()).to.equal(0n);
    });

    it("Should have correct MAX_SUPPLY", async () => {
      expect(await token.MAX_SUPPLY()).to.equal(MAX_SUPPLY);
    });
  });

  // ── Minting ──────────────────────────────────────────────────────
  describe("Minting", () => {
    it("Owner can mint tokens", async () => {
      const amount = ethers.parseEther("1000");
      await token.mint(alice.address, amount);
      expect(await token.balanceOf(alice.address)).to.equal(amount);
    });

    it("Non-owner cannot mint", async () => {
      await expect(
        token.connect(alice).mint(alice.address, ethers.parseEther("1"))
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });

    it("Should revert when exceeding MAX_SUPPLY", async () => {
      await expect(
        token.mint(alice.address, MAX_SUPPLY + 1n)
      ).to.be.revertedWith("MyToken: max supply exceeded");
    });

    it("Should emit Minted event", async () => {
      const amount = ethers.parseEther("500");
      await expect(token.mint(alice.address, amount))
        .to.emit(token, "Minted")
        .withArgs(alice.address, amount);
    });
  });

  // ── Burning ──────────────────────────────────────────────────────
  describe("Burning", () => {
    beforeEach(async () => {
      await token.mint(alice.address, ethers.parseEther("1000"));
    });

    it("Token holder can burn their tokens", async () => {
      const burnAmount = ethers.parseEther("100");
      await token.connect(alice).burn(burnAmount);
      expect(await token.balanceOf(alice.address)).to.equal(ethers.parseEther("900"));
    });

    it("Cannot burn more than balance", async () => {
      await expect(
        token.connect(alice).burn(ethers.parseEther("9999"))
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
  });

  // ── Pause ────────────────────────────────────────────────────────
  describe("Pause / Unpause", () => {
    beforeEach(async () => {
      await token.mint(alice.address, ethers.parseEther("1000"));
    });

    it("Owner can pause transfers", async () => {
      await token.pause();
      await expect(
        token.connect(alice).transfer(bob.address, ethers.parseEther("100"))
      ).to.be.revertedWithCustomError(token, "EnforcedPause");
    });

    it("Owner can unpause transfers", async () => {
      await token.pause();
      await token.unpause();
      await expect(
        token.connect(alice).transfer(bob.address, ethers.parseEther("100"))
      ).not.to.be.reverted;
    });

    it("Non-owner cannot pause", async () => {
      await expect(
        token.connect(alice).pause()
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });

  // ── Transfers ────────────────────────────────────────────────────
  describe("Transfers", () => {
    it("Should transfer tokens correctly", async () => {
      await token.mint(alice.address, ethers.parseEther("500"));
      await token.connect(alice).transfer(bob.address, ethers.parseEther("200"));
      expect(await token.balanceOf(alice.address)).to.equal(ethers.parseEther("300"));
      expect(await token.balanceOf(bob.address)).to.equal(ethers.parseEther("200"));
    });
  });
});
