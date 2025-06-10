export interface DemoStep {
  title: string;
  subtitle: string;
  description: string;
  educationalTitle: string;
  educationalContent: string[];
}

export const demoSteps: DemoStep[] = [
  {
    title: "Welcome to Sonic Red Dragon",
    subtitle: "Revolutionary Token Ecosystem",
    description: "Experience the next generation of DeFi with Sonic Red Dragon - where speed meets power through innovative tokenomics and cross-chain mechanics.",
    educationalTitle: "The Sonic Red Dragon Vision",
    educationalContent: [
      "Sonic Red Dragon combines two powerful forces: the lightning-fast speed of Sonic tokens and the raw power of Dragon tokens, creating a unique dual-token ecosystem.",
      "Our protocol leverages Chainlink VRF 2.5 and LayerZero technology to deliver provably fair gaming mechanics and seamless cross-chain interactions."
    ]
  },
  {
    title: "Discover S ↔ DRAGON Swap",
    subtitle: "The Heart of Our Ecosystem",
    description: "Watch our signature token swap animation as S (Sonic) tokens transform into DRAGON tokens through our innovative exchange mechanism.",
    educationalTitle: "Dual-Token Innovation",
    educationalContent: [
      "The S ↔ DRAGON swap represents more than a simple exchange - it's the core mechanic that balances speed and power in our ecosystem.",
      "Each swap triggers our unique fee distribution: 6.9% goes to jackpot rewards, 2.41% to liquidity pools, and 0.69% to token burns, creating deflationary pressure."
    ]
  },
  {
    title: "Experience the Animation",
    subtitle: "Advanced Token Convergence",
    description: "Our cubic-bezier powered animations showcase the smooth convergence of tokens, representing the harmony between speed and power.",
    educationalTitle: "Visual Innovation Meets Function",
    educationalContent: [
      "The token exchange animation uses advanced cubic-bezier curves for smooth convergence (0.25, 0.1, 0.25, 1.0) and sharp acceleration exit (0.76, 0, 0.24, 1).",
      "This visual representation reflects our protocol's efficiency - smooth entry, powerful execution, creating an immersive user experience."
    ]
  },
  {
    title: "Smart Fee Distribution",
    subtitle: "Automatic Reward Mechanics",
    description: "Every swap automatically distributes fees across jackpot pools, liquidity incentives, and token burns, creating a self-sustaining ecosystem.",
    educationalTitle: "Tokenomics Excellence",
    educationalContent: [
      "Our 9.9% total fee structure is carefully designed: 6.9% builds jackpot pools for VRF-powered rewards, 2.41% incentivizes liquidity providers.",
      "The 0.69% burn mechanism creates deflationary pressure, making remaining tokens more valuable over time while funding ecosystem growth."
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
