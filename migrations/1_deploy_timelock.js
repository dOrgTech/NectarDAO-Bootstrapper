const TestERC20 = artifacts.require("TestERC20");
const TokenTimelock = artifacts.require("TokenTimelock");
const MockTokenTimelock = artifacts.require("MockedTokenTimelock");

module.exports = async function(deployer, network, accounts) {
  const [ _, from ] = accounts
  await deployer.deploy(TestERC20, { from });
  const claimers = [accounts[0], accounts[2], accounts[5]];
  const rewards = [100, 200, 300];
  const erc20 = await TestERC20.deployed();
  const { address: timelockAddress } = await deployer.deploy(TokenTimelock, erc20.address, claimers, rewards);
  const { address: mockTimelockAddress } = await deployer.deploy(MockTokenTimelock, erc20.address, claimers, rewards);

  // Let's mint tokens for the timelock contracts
  await erc20.mint(timelockAddress, 600)
  await erc20.mint(mockTimelockAddress, 600)
};