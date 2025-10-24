// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MyTokenUpgradeable.sol";

contract MyTokenV2Upgradeable is MyTokenUpgradeable {
    // New storage (append only!)

    string public version;
    uint256 public feePercentage; // e.g., 100 = 1%
    address public feeCollector;

    // New initializer

    function initializeV2(address _feeCollector, uint256 _feePercentage) public {
        require(bytes(version).length == 0, "V2 already initialized");
        require(_feeCollector != address(0), "Invalid fee collector");
        require(_feePercentage <= 1000, "Fee too high (>10%)"); // safety limit

        version = "V2";
        feeCollector = _feeCollector;
        feePercentage = _feePercentage;
    }

    // Override transfer with fee logic
    function transfer(address to, uint256 amount) public override returns (bool) {
        uint256 fee = (amount * feePercentage) / 10000; // basis points (10000 = 100%)
        uint256 sendAmount = amount - fee;

        // Send fee to collector if any
        if (fee > 0) {
            super.transfer(feeCollector, fee);
        }

        // Normal transfer
        return super.transfer(to, sendAmount);
    }

    // -----------------------------
    // Admin management
    // -----------------------------
    function updateFeeSettings(address _collector, uint256 _percentage) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_collector != address(0), "Invalid collector");
        require(_percentage <= 1000, "Fee too high");
        feeCollector = _collector;
        feePercentage = _percentage;
    }
    // Utility function
    function getVersion() public view returns (string memory) {
        return version;
    }
}


