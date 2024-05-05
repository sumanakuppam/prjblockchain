# DApp for listing and purchasing the Items

This is the Decentralized app that allows the users to add the items to the list, View the existing items in the list and purchase the items that are present in the list.

## Table of Contents
- [Project Overview](#project-overview)
- [Setting Up the Environment](#setting-up-the-environment)
- [Smart Contract Development](#smart-contract-development)
- [Frontend Development](#frontend-development)
- [Integration and Testing](#integration-and-testing)
- [Usage Instructions](#usage-instructions)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This is a decentralized application (DApp) built using Solidity, Next.js, and Remix. It operates on the Ethereum blockchain, specifically the Sepolia testnet. Users can list items with relevant information, and others can purchase them using test Ether. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setting Up the Environment
To set up this project, below are required
- Node.js (version 16 or later)
- NPM or Yarn
- A wallet extension (e.g., MetaMask)
- A configured Ethereum wallet on the Sepolia testnet
- Test Ether from a Sepolia faucet

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Set Up the Metamask wallet:
- Install the MetaMask extension in your browser.
- Create a wallet and configure it to use the Sepolia testnet.
- Obtain test Ether from a Sepolia faucet by entering your wallet address and requesting Ether.

### Smart Contract Development

The smart contract is written in Solidity and allows users to list items and manage the purchase process. It includes:

- Function to list items with a title, description, and price.
- Function to purchase items and transfer ownership.
- Function to display all the items in list
- Events to track item listing and purchase.

### Compile and Deploy the Smart Contract

- Use Remix to compile the Solidity contract.
- Deploy the contract to the Sepolia testnet.
- Record the contract address and ABI for frontend integration.

### Frontend Development
The frontend is built using Next.js and React. It includes:

- An interface for connecting Ethereum wallets.
- Forms for listing new items.
- Functionality to purchase listed items.
- Integration with smart-contract.ts (ethers.js) to interact with the smart contract.

### Run the Frontend
Start the Next.js development server:
- Run the command "npm run dev"
- Open the app in your browser at http://localhost:3000.

### Integration and Testing
Integration involves connecting the frontend to the smart contract using smart-contract.ts. This step includes:

- Initializing ```smart-contract.ts``` with the contract address and ABI and import it to the ```page.tsx``` file
- Interacting with the contract to list and purchase items.
- Testing the DApp on the Sepolia testnet.

### Google Cloud Deployment
This project is deployed on Google Cloud. To access the deployed application:

- Visit the deployed application's URL:[`Marketplace App`](https://blckproject-jx44r3yqfq-vp.a.run.app/)
- Ensure that your MetaMask or other wallet extension is configured for the Sepolia testnet.
- If the site uses HTTPS with Let's Encrypt, ensure your browser recognizes the certificate.
- Google Cloud provides reliable hosting for this DApp, allowing users to interact with it from anywhere.

### Instructions
After setting up the environment, follow these steps to interact with the DApp:

- Open the app in your browser.
- Click "Connect Wallet" to connect your MetaMask or other wallet extension.
- List a new item by entering the title, description, and price.
- Purchase an item by clicking the "Purchase" button and confirming the transaction in MetaMask.
  
