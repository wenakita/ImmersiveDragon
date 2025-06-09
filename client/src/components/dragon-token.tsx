import { motion } from "framer-motion";

interface DragonTokenProps {
  size?: string;
  borderColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  imageSize?: string;
  animateProps?: any;
  transitionProps?: any;
  style?: any;
}

export const DragonToken = ({
  size = "w-12 h-12",
  borderColor = "border-gold-400",
  gradientFrom = "from-amber-400",
  gradientTo = "to-gold-500",
  imageSize = "w-full h-full",
  animateProps = {},
  transitionProps = {},
  style = {},
}: DragonTokenProps) => (
  <motion.div
    className={`${size} rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg border-2 ${borderColor} overflow-hidden`}
    animate={animateProps}
    transition={transitionProps}
    style={style}
  >
    <img
      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
      alt="DRAGON Token"
      className={imageSize}
    />
  </motion.div>
);

export default DragonToken;