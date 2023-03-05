const { ethers } = require("hardhat");

async function main() {
  const defaultAdminRole = "0x7777e4d974534Bd93C02A19d94e114Eb91216530";
  const defaultMinterRole = "0x7777e4d974534Bd93C02A19d94e114Eb91216530";
  const devAddress = await ethers.provider.getSigner().getAddress();
  const mintToAddresses = [
    "0x8888de3F1629708b94ffEE180b444C4575EF2e78",
    "0x8888dA9Eef271D9c4dE39e1b01ed29D8FeAf2D74",
    "0x8888038Aad7268213DC793e2a3623425C9c7a682",
    "0x888872f572B4B6ec182679266C0A8d18901DfE80",
    "0x8888f392E19B27c473a032AE9ca3D0DBCf14DDa5",
    "0x88888FCaFcD2c5a6C89Ed41D0D3e8518680D7fd1",
    "0x88884f43232309bDaB881Ec4902D409c99dE6544",
    "0x8888C03B1F58513a6b1294Fd6183aD6765A973Ec",
  ];
  const mintAmounts = [
    ethers.utils.parseEther("1330000"),
    ethers.utils.parseEther("1330000"),
    ethers.utils.parseEther("1710000"),
    ethers.utils.parseEther("1710000"),
    ethers.utils.parseEther("2090000"),
    ethers.utils.parseEther("1520000"),
    ethers.utils.parseEther("2280000"),
    ethers.utils.parseEther("7030000"),
  ];

  const YourNFTguru = await ethers.getContractFactory("yourNFTguru");
  const token = await YourNFTguru.deploy(
    defaultAdminRole,
    defaultMinterRole,
    mintToAddresses,
    mintAmounts,
    devAddress
  );

  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
