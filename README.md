# Upgradeable ERC20 Token with Fee Mechanism

A fully upgradeable ERC20 token built with **OpenZeppelin upgrades** and **Foundry testing**.  
Supports proxy upgrades, minting, transfers, access control, and a fee mechanism in **V2**.

---

## Project Description

This project demonstrates a professional-grade **upgradeable ERC20 token** implementation:

- ERC20 token with standard functionality (mint, transfer, approve, transferFrom)
- Proxy upgradeable (ERC1967)  
- **V2 Features**:
  - Fee collector & configurable transfer fees
  - Version tracking (`getVersion()`)
- Access control using OpenZeppelin `MINTER_ROLE`
- Scripts to **deploy**, **upgrade**, and **interact** with the token
- Robust testing using **Foundry**:
  - Unit tests
  - Fuzz testing
  - Access control testing

---

## Tech Stack

- Solidity 0.8.24+
- Hardhat + Foundry
- TypeScript
- OpenZeppelin Contracts & Upgrades
- Ethers.js

---

## Features

- Upgradeable ERC20 token
- Fee collector & transfer fee mechanism
- Access control (MINTER_ROLE)
- Version tracking for upgrades
- Tested with **Foundry** (10+ test cases)

---

## foundry tests
![Foundry Tests](https://github.com/Kundanrahul/Upgradeable-Erc20-token-foundry-tests-fee-mechanism-/blob/main/screenshots/foundry_tests.png?raw=true)

---

## Interact script
![Interact Script](https://github.com/Kundanrahul/Upgradeable-Erc20-token-foundry-tests-fee-mechanism-/blob/main/screenshots/interact_script.png?raw=true)
## Setup & Installation

```bash
git clone https://github.com/Kundanrahul/Upgradeable-Erc20-token-foundry-tests-fee-mechanism-.git
cd upgradeable-token
npm install
forge install




