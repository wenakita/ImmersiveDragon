/**
 * IPFS Asset URLs
 * Centralized storage for all blockchain and brand assets
 */

export const IPFS_ASSETS = {
  // Token Assets
  DRAGON: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam",
  S: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy",

  // Chainlink Branding
  CHAINLINK: {
    WHITE_LOGO: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreihd7zmhnirvf2hxcmnbdsm5x2fukyzuiepjgdusbobgi67jbjs7aa",
    BLUE_LOGO: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreidb6qonavkklty52niy5hja7nszibcqqoxaloifhjwhwe5lfxsqei",
    BLUE_SYMBOL: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreif26ewtypdcvbwhvzsj6ujg3acvcqoqsj4vj6rvkkjmdd2kryhrfy",
    WHITE_SYMBOL: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreia6gvcvo7bk52hr7pphega2i63rxh5xbijlkjko7wf24ycutfelfm",
    BLACK_SYMBOL: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreiazfbarxjrqiwwzohgrhjzmhweeylzaqj24pwy5ba5ktku5eaazdm",
  },

  // LayerZero Branding
  LAYER_ZERO: {
    WHITE_EMBLEM: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreihml3nahd2duwdjg2ltoeixax2xdj2ldp5unnrjwntyicar74nwra",
    WHITE_LOGO: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreidp4x62pp27pf6cdtddvas7e3d2cshozgzi3yhmr2whhcefo5anly",
  },

  // Cloud Provider Assets
  GOOGLE_CLOUD_LOGO: "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreiakod4kohwf2p74tyv6rs5r7nyocn4mjd5lypagjxnwy2rs7u5knq",
} as const;

/**
 * Helper function to get asset URL by path
 * Usage: getAssetUrl('CHAINLINK.WHITE_LOGO') or getAssetUrl('DRAGON')
 */
export function getAssetUrl(path: string): string {
  const keys = path.split('.');
  let current: any = IPFS_ASSETS;
  
  for (const key of keys) {
    current = current[key];
    if (!current) {
      throw new Error(`Asset not found: ${path}`);
    }
  }
  
  return current;
}

/**
 * Get all Chainlink assets
 */
export function getChainlinkAssets() {
  return IPFS_ASSETS.CHAINLINK;
}

/**
 * Get all LayerZero assets
 */
export function getLayerZeroAssets() {
  return IPFS_ASSETS.LAYER_ZERO;
}

/**
 * Get token assets
 */
export function getTokenAssets() {
  return {
    DRAGON: IPFS_ASSETS.DRAGON,
    S: IPFS_ASSETS.S,
  };
}