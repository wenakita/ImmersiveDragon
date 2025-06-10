import { motion } from "framer-motion";

interface TokenExchangeAnimationProps {
  /** Position styling for the container */
  containerStyle?: React.CSSProperties;
  /** Container className */
  containerClassName?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Whether to show buy/sell indicators */
  showTradeIndicators?: boolean;
  /** Whether to show fee breakdown */
  showFeeBreakdown?: boolean;
  /** Scale of the animation (1 = normal size) */
  scale?: number;
  /** Repeat animation infinitely */
  repeat?: boolean;
  /** Index for staggered animations */
  index?: number;
}

// Sonic Token Component
const SonicToken = ({ 
  animateProps = {}, 
  transitionProps = {},
  size = "w-12 h-12",
  borderColor = "border-blue-400/60"
}: {
  animateProps?: any;
  transitionProps?: any;
  size?: string;
  borderColor?: string;
}) => (
  <motion.div
    className={`${size} rounded-full ${borderColor} border-2 flex items-center justify-center backdrop-blur-sm`}
    style={{
      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))",
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
    }}
    animate={animateProps}
    transition={transitionProps}
  >
    <img
      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
      alt="S Token"
      className={size === "w-12 h-12" ? "w-8 h-8" : "w-6 h-6"}
    />
  </motion.div>
);

// Dragon Token Component
const DragonToken = ({ 
  animateProps = {}, 
  transitionProps = {},
  size = "w-12 h-12"
}: {
  animateProps?: any;
  transitionProps?: any;
  size?: string;
}) => (
  <motion.div
    className={`${size} rounded-full border-2 border-amber-400/60 flex items-center justify-center backdrop-blur-sm`}
    style={{
      background: "linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.3))",
      boxShadow: "0 0 20px rgba(251, 191, 36, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
    }}
    animate={animateProps}
    transition={transitionProps}
  >
    <img
      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
      alt="DRAGON Token"
      className={size === "w-12 h-12" ? "w-8 h-8" : "w-6 h-6"}
    />
  </motion.div>
);

export default function TokenExchangeAnimation({
  containerStyle = {},
  containerClassName = "",
  delay = 0,
  duration = 4,
  showTradeIndicators = true,
  showFeeBreakdown = true,
  scale = 1,
  repeat = true,
  index = 0
}: TokenExchangeAnimationProps) {
  const baseDelay = delay + (index * 1);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-center justify-center ${containerClassName}`}
      style={{
        transform: `scale(${scale})`,
        ...containerStyle
      }}
      animate={{
        opacity: [0, 0.7, 0.7, 0],
        scale: [0.6, 1, 1, 0.6],
      }}
      transition={{
        duration: duration,
        repeat: repeat ? Infinity : 0,
        delay: baseDelay,
        ease: "easeInOut",
      }}
    >
      {/* Sonic Token */}
      <SonicToken
        animateProps={{
          x: [0, 80 * scale, 0],
          rotate: [0, 180, 360],
        }}
        transitionProps={{
          duration: duration / 2,
          repeat: repeat ? Infinity : 0,
          delay: baseDelay,
        }}
        size={scale >= 1 ? "w-12 h-12" : "w-10 h-10"}
      />

      {/* Swap Action */}
      <div className="mx-3 flex flex-col items-center relative">
        {/* Buy/Sell Indicator Above */}
        {showTradeIndicators && (
          <motion.div
            className={`absolute -top-8 text-xs font-semibold px-2 py-1 rounded ${
              isEven
                ? "text-green-400 bg-green-500/20"
                : "text-red-400 bg-red-500/20"
            }`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 1.5,
              repeat: repeat ? Infinity : 0,
              delay: baseDelay + 0.3,
            }}
          >
            {isEven ? "BUY" : "SELL"}
          </motion.div>
        )}

        <motion.div
          className="text-xl text-white"
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: repeat ? Infinity : 0,
            delay: baseDelay + 0.5,
          }}
        >
          ⇄
        </motion.div>

        {/* Fee Flow Animation Below */}
        {showFeeBreakdown && (
          <motion.div
            className="absolute top-8 flex flex-col items-center text-xs"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.8, 0], y: [5, 25, 45] }}
            transition={{
              duration: 2,
              repeat: repeat ? Infinity : 0,
              delay: baseDelay + 1,
            }}
          >
            <div className="text-red-400 font-bold mb-1">
              10% Fee
            </div>
            <div className="text-yellow-400 text-xs">
              6.9% → Jackpot
            </div>
            <div className="text-blue-400 text-xs">
              2.41% → LP Rewards
            </div>
            <div className="text-orange-400 text-xs">
              0.69% → Burn
            </div>
          </motion.div>
        )}
      </div>

      {/* Dragon Token */}
      <DragonToken
        animateProps={{
          x: [0, -80 * scale, 0],
          rotate: [0, -180, -360],
        }}
        transitionProps={{
          duration: duration / 2,
          repeat: repeat ? Infinity : 0,
          delay: baseDelay,
        }}
        size={scale >= 1 ? "w-12 h-12" : "w-10 h-10"}
      />
    </motion.div>
  );
}