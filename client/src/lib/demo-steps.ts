export interface DemoStep {
  title: string;
  subtitle: string;
  description: string;
  educationalTitle: string;
  educationalContent: string[];
}

export const demoSteps: DemoStep[] = [
  {
    title: "Select Tokens",
    subtitle: "Choose your trading pair",
    description: "Choose the tokens you want to swap. In DeFi, you can exchange one cryptocurrency for another directly from your wallet.",
    educationalTitle: "How Token Selection Works",
    educationalContent: [
      "Decentralized exchanges (DEXs) allow you to trade tokens directly from your wallet without intermediaries. Each trading pair has its own liquidity pool that determines the exchange rate.",
      "The rates are calculated automatically based on supply and demand, using algorithms like Automated Market Makers (AMM) to ensure fair pricing and sufficient liquidity for trades."
    ]
  },
  {
    title: "Enter Amount",
    subtitle: "Specify swap quantity",
    description: "Specify how much you want to swap. The interface automatically calculates the output amount based on current exchange rates.",
    educationalTitle: "Understanding Swap Calculations",
    educationalContent: [
      "When you enter an amount, the DEX calculates the output using the constant product formula (x * y = k). This ensures the pool maintains balance.",
      "Larger trades may experience slippage - a change in price between when you submit and when the transaction executes due to market movements."
    ]
  },
  {
    title: "Review Rate",
    subtitle: "Check exchange details",
    description: "Check the exchange rate, fees, and estimated output. This step helps you understand exactly what you'll receive.",
    educationalTitle: "Exchange Rate Mechanics",
    educationalContent: [
      "Exchange rates fluctuate based on liquidity pool ratios. Higher liquidity means more stable rates and lower slippage.",
      "DEX fees typically range from 0.1% to 0.3% and are distributed to liquidity providers who supply tokens to the pools."
    ]
  },
  {
    title: "Approve Transaction",
    subtitle: "Authorize the swap",
    description: "Authorize the smart contract to access your tokens. This is a security feature that gives you control over your assets.",
    educationalTitle: "Token Approvals & Security",
    educationalContent: [
      "Token approvals allow smart contracts to move your tokens on your behalf. You can set spending limits to maintain control.",
      "This two-step process (approve, then swap) prevents unauthorized access to your entire token balance and enhances security."
    ]
  },
  {
    title: "Execute Swap",
    subtitle: "Complete the exchange",
    description: "The smart contract processes your swap, updating both liquidity pools and transferring tokens to your wallet.",
    educationalTitle: "Smart Contract Execution",
    educationalContent: [
      "The swap executes atomically - either the entire transaction succeeds or fails completely, ensuring you never lose tokens.",
      "Gas fees compensate network validators for processing your transaction. Complex swaps may require higher gas limits."
    ]
  },
  {
    title: "Confirmation",
    subtitle: "Transaction complete",
    description: "Your swap has been successfully executed. The new tokens are now in your wallet and the transaction is recorded on the blockchain.",
    educationalTitle: "Transaction Finality",
    educationalContent: [
      "Blockchain transactions are immutable once confirmed. Your swap is permanently recorded and can be verified by anyone.",
      "You can view your transaction on blockchain explorers using the transaction hash provided in your wallet."
    ]
  }
];
