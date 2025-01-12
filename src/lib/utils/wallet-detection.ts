// import { WALLET_PROVIDERS } from '@/lib/utils/providers';

// export type WalletProviderType = keyof typeof WALLET_PROVIDERS;

// export const detectProvider = (): WalletProviderType | null => {
//   if (!window.ethereum) return null;
//   if (window.ethereum.isMetaMask) return 'METAMASK';
//   if (window.ethereum.isCoinbaseWallet) return 'COINBASE';
//   return null;
// };

// export const getWalletDeepLink = (
//   provider: WalletProviderType,
//   callbackUrl: string,
//   chainId?: number
// ): string => {
//   const walletInfo = WALLET_PROVIDERS[provider];
//   const encodedUrl = encodeURIComponent(callbackUrl);
  
//   // Use native URL scheme for direct app opening if available
//   if (walletInfo.mobile.native) {
//     return `${walletInfo.mobile.native}//dapp/${encodedUrl}`;
//   }
  
//   // Fallback to universal link
//   const baseUrl = walletInfo.mobile.universal;
//   const chainParam = chainId ? `&chain_id=${chainId}` : '';
//   return `${baseUrl}?dappUrl=${encodedUrl}${chainParam}`;
// };