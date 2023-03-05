const { expect } = require("chai");
const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));

describe("yourNFTguru", function () {
  let yourNFTguru;
  let adminRole;
  let minterRole;
  let mintToAddresses;
  let mintAmounts;
  let devAddress;

  beforeEach(async function () {
    const YourNFTguru = await ethers.getContractFactory("yourNFTguru");
    [adminRole, minterRole, devAddress, ...mintToAddresses] = await ethers.getSigners();
    mintAmounts = mintToAddresses.map(() => ethers.utils.parseEther("100"));
    yourNFTguru = await YourNFTguru.connect(adminRole).deploy(
      adminRole.address,
      minterRole.address,
      mintToAddresses.map((a) => a.address),
      mintAmounts,
      devAddress.address
    );
    await yourNFTguru.deployed();
  });

  it("should have the correct name and symbol", async function () {
    expect(await yourNFTguru.name()).to.equal("yourNFTguru");
    expect(await yourNFTguru.symbol()).to.equal("YNG");
  });

  it("should have the correct total supply", async function () {
    const expectedTotalSupply = mintAmounts.reduce((acc, cur) => acc.add(cur), ethers.BigNumber.from(0));
    expect(await yourNFTguru.totalSupply()).to.equal(expectedTotalSupply);
  });

  it("should have minted the correct amount to each address", async function () {
    for (let i = 0; i < mintToAddresses.length; i++) {
      const balance = await yourNFTguru.balanceOf(mintToAddresses[i].address);
      expect(balance).to.equal(mintAmounts[i]);
    }
  });

  it("should not allow devAddress to receive tokens during deployment", async function () {
    const devBalance = await yourNFTguru.balanceOf(devAddress.address);
    expect(devBalance).to.equal(0);
  });

  it("should allow the minter role to mint new tokens", async function () {
    const to = await ethers.getSigner();
    const amount = ethers.utils.parseEther("100");
    await yourNFTguru.connect(minterRole).mint(to.address, amount);
    const toBalance = await yourNFTguru.balanceOf(to.address);
    expect(toBalance).to.equal(amount);
  });

  it("should allow the admin role to grant and revoke the minter role", async function () {
    const newMinter = await ethers.getSigner();
    await yourNFTguru.connect(adminRole).grantRole(MINTER_ROLE, newMinter.address);
    expect(await yourNFTguru.hasRole(MINTER_ROLE, newMinter.address)).to.equal(true);
    await yourNFTguru.connect(adminRole).revokeRole(MINTER_ROLE, newMinter.address);
    expect(await yourNFTguru.hasRole(MINTER_ROLE, newMinter.address)).to.equal(false);
  });
});
