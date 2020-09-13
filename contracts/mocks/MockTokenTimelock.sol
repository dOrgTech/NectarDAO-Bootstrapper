// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <=0.6.2;

import "../TokenTimelock.sol";

contract MockedTokenTimelock is TokenTimelock {
    constructor(
        IERC20 _token,
        address[] memory _beneficiaries,
        uint256[] memory _amounts
    ) public TokenTimelock(_token, _beneficiaries, _amounts) {}

    /**
     * @notice Overriding release method to remove time validation
     */
    function release() external override {
        uint256 claimAmount = claimers[msg.sender];
        require(
            claimAmount > 0,
            "TokenTimelock: Claimer not registered on snapshot"
        );
        uint256 amount = token.balanceOf(address(this));
        require(amount > 0, "TokenTimelock: no tokens to release");
        claimers[msg.sender] = 0;
        token.safeTransfer(msg.sender, claimAmount);
        emit RewardReleased(msg.sender, claimAmount);
    }
}
