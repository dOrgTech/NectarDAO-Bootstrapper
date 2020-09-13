const TokenTimelock = artifacts.require("TokenTimelock");
const MockedTokenTimelock = artifacts.require("MockedTokenTimelock");
const ERC20 = artifacts.require("TestERC20");
const truffleAssert = require("truffle-assertions");

contract("TokenTimelock", async (accounts) => {
  const [
    rewardedAccount,
    notRewardedAccount,
    anotherRewardedAccount,
  ] = accounts;
  let token;
  let tokenTimeLock;
  let mockTokenTimeLock;

  let initialized = false;

  beforeEach(async () => {
    token = await ERC20.deployed();
    if (!initialized) await token.initialize("Reward Token", "REWARD");
    initialized = true;
    tokenTimeLock = await TokenTimelock.deployed();
    mockTokenTimeLock = await MockedTokenTimelock.deployed();
  });

  it("Attributes are correct", async () => {
    const tokenToLock = await tokenTimeLock.token();
    const releaseTime = await tokenTimeLock.releaseTime();
    assert.equal(
      tokenToLock.valueOf(),
      token.address,
      "Token locked is not the same"
    );
    assert.isBelow(
      Date.now(),
      releaseTime.valueOf().toNumber(),
      "Release time is higher than now"
    );
    const yearFromNow = Date.now() + 31556952000;
    assert.isBelow(
      releaseTime.valueOf().toNumber(),
      yearFromNow,
      "Release time is less that a year from now"
    );
  });

  it("Dont allow release before release time", async () => {
    await truffleAssert.reverts(
      tokenTimeLock.release({ from: rewardedAccount }),
      "TokenTimelock: current time is before release time"
    );
  });

  it("Dont allow release to address that's not a claimer", async () => {
    await truffleAssert.reverts(
      tokenTimeLock.release({ from: notRewardedAccount }),
      "Claimer not registered on snapshot"
    );
  });

  it("Without time validation, it release the tokens", async () => {
    let rewardedAccountBalance = await token.balanceOf(rewardedAccount);
    assert.equal(
      rewardedAccountBalance.valueOf().toNumber(),
      0,
      "User should not have any tokens before release"
    );
    await mockTokenTimeLock.release({ from: rewardedAccount });
    rewardedAccountBalance = await token.balanceOf(rewardedAccount);
    assert.equal(
      rewardedAccountBalance.valueOf().toNumber(),
      100,
      "User should have 100 tokens after release"
    );
  });

  it("When a claimer gets the reward, he wont be able to ask for it again", async () => {
    await mockTokenTimeLock.release({ from: anotherRewardedAccount });
    await truffleAssert.reverts(
      mockTokenTimeLock.release({ from: anotherRewardedAccount }),
      "TokenTimelock: Claimer not registered on snapshot"
    );
  });
});
