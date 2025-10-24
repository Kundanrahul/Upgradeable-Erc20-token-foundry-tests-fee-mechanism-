// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../lib/forge-std/src/Test.sol";
import "../contracts/MyTokenUpgradeable.sol";

contract MyTokenUpgradeableTest is Test {
    MyTokenUpgradeable token;
    address deployer;
    address user = address(0x123);
    address other = address(0x456);

    function setUp() public {
        deployer = address(this); // test contract acts as deployer
        // ---Deploy token as a minimal proxy for testing--
        token = new MyTokenUpgradeable();
        token.initialize(deployer);
    }

// basic unit tests

    function testNameAndSymbol() public {
        assertEq(token.name(), "UpgradeableToken");
        assertEq(token.symbol(), "UTK");
    }

    function testMintByMinter() public {
        token.mint(user, 100 ether);
        assertEq(token.balanceOf(user), 100 ether);
    }

// access control tests

    function testGrantAndRevokeMinterRole() public {
        bytes32 MINTER_ROLE = token.MINTER_ROLE();

        // Grant role to 'other'
        token.grantRole(MINTER_ROLE, other);
        assertTrue(token.hasRole(MINTER_ROLE, other));

        // Revoke role
        token.revokeRole(MINTER_ROLE, other);
        assertFalse(token.hasRole(MINTER_ROLE, other));
    }

    function testMintRevertUnauthorized() public {
        vm.prank(other); // simulate tx from other address
        vm.expectRevert(); // generic revert for unauthorized
        token.mint(user, 1 ether);
    }

// Erc20 behaviour tests

    function testTransferInsufficientBalance() public {
        vm.expectRevert(); 
        token.transfer(user, 1 ether); // deployer has 0 initially
    }

    function testApproveAndTransferFrom() public {
        token.mint(deployer, 50 ether);
        token.approve(user, 30 ether);
        vm.prank(user);
        token.transferFrom(deployer, other, 30 ether);
        assertEq(token.balanceOf(other), 30 ether);
        assertEq(token.balanceOf(deployer), 20 ether);
    }

 // fuzz tests(limited)

    function testFuzz_Mint(uint256 amount) public {
        vm.assume(amount < 1e24); // smaller cap to prevent overflow
        address recipient = user; // only mint to known addresses
        token.mint(recipient, amount);
        assertEq(token.balanceOf(recipient), amount);
    }

    function testFuzz_Transfer(uint256 amount) public {
        vm.assume(amount < 1e24);
        // Mint only to deployer and transfer to user
        token.mint(deployer, amount);
        token.transfer(user, amount);
        assertEq(token.balanceOf(user), amount);
        assertEq(token.balanceOf(deployer), 0);
    }

}




