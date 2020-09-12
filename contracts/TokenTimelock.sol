// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <=0.6.2;

import "./lib/SafeERC20.sol";
import "./lib/SafeMath.sol";

/**
 * @dev A token holder contract that will allow a beneficiary to extract the
 * tokens after a given release time.
 *
 * Useful for simple vesting schedules like "advisors get all of their tokens
 * after 1 year".
 */
contract TokenTimelock {
    using SafeERC20 for IERC20;

    using SafeMath for uint256;

    /// @notice One Gregorian calendar year, has 365.2425 days, or 31556952 seconds
    uint256 private constant SECONDS_IN_YEAR = 31556952;

    // ERC20 basic token contract being held
    IERC20 public token;

    /// @notice Timestamp when token release is enabled
    uint256 public releaseTime;

    // snapshot beneficiaries of tokens after they are released
    mapping(address => uint256) public claimers;

    constructor(
        IERC20 _token,
        address[] memory _beneficiaries,
        uint256[] memory _amounts
    ) public {
        require(
            _beneficiaries.length == _amounts.length,
            "Beneficiaries and amount must be of the same length"
        );
        releaseTime = block.timestamp + SECONDS_IN_YEAR;
        token = _token;
        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            claimers[_beneficiaries[i]] = _amounts[i];
        }
    }

    /**
     * @return the amount of tokens of a beneficiary
     */
    function beneficiary(address _claimer) public view returns (uint256) {
        return claimers[_claimer];
    }

    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     */
    function release(address _claimer) external {
        uint256 claimAmount = claimers[_claimer];
        require(claimAmount > 0, "Claimer not registered on snapshot");
        require(
            block.timestamp >= releaseTime,
            "TokenTimelock: current time is before release time"
        );
        uint256 amount = token.balanceOf(address(this));
        require(amount > 0, "TokenTimelock: no tokens to release");

        token.safeTransfer(_claimer, amount);
    }
}
