pragma solidity ^0.6.0 <=0.6.2;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20UpgradeSafe {
  function initialize(
    string calldata _name,
    string calldata _symbol
  ) external initializer {

    __ERC20_init(_name, _symbol);
  }

  // Just for test purposes
  function mint(address account, uint256 amount) external {
    _mint(account, amount);
  }
}