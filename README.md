# Chain Beat

Chain Beat allows user to connect their Web3 wallets, review past transactions, view wallet balance, send ETH, and monitor current prices of popular tokens.

## Installation

1. Clone repository
   `git clone https://github.com/braxtonlemmon/chain-beat.git`
   `cd chain-beat`
2. Install the dependencies
   `npm install`
3. Create `.env.local` at the root level of the application directory. Define variable values.
   Sample `.env.local` file:

```
 NEXT_PUBLIC_ETHERSCAN_API_KEY=
 NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
 NEXT_PUBLIC_SEPOLIA_RPC_URL=
 NEXT_PUBLIC_COINMARKETCAP_API_KEY=
 NEXT_PUBLIC_ENVIRONMENT=
```

4. Run development server:
   `npm run dev`

## Features

- Address validator that detects a valid Ethereum address.
- Table that displays user's transactions. The table refreshes every 10 seconds to show user latest transactions in real-time. Data pulled from Etherscan API.
- The user is able to connect (and disconnect) their wallet using several different wallet providers. The user can choose from Brave Wallet, Metamask and Phantom. A WalletConnect option also exists that allows the user to scan a QR code and connect to the app using their mobile device.
- Current prices for several ERC-20 tokens (Ethereum, Solana, Avalanche, Cardano, and BNB) are displayed. Prices are refreshed every 60 seconds to show latest price. Also displayed is the token price trend (up or down) based on data from the past 24 hours.
- User is able to send Sepolia ETH to another wallet address. This feature ensures the entered "receiver" address is valid, and ensures that the amount entered is not greater than the user's current wallet balance.
- From the Account page, the user is able to view their currently-connected address and also view the current balance in their wallet. The user is also able to toggle between the Testnet and Mainnet networks and view their respective balances accordingly.
- The application is responsive and is designed to have full functionality down to a viewport width of 375px.

## Tech stack

- Application code written in TypeScript within the NextJS 14 React framework
- Styling done with Tailwind CSS
- Data management handled with GraphQL and Apollo Client
- Wallet connectors and blockchain interactions handled using the Wagmi library
- Web3 utility functions used from Ethers.js and Viem libraries

## Contact

Contact me at braxtonlemmon@gmail.com.
