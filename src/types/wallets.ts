import { WALLET_PROVIDERS } from "@/lib/utils/providers";

export interface EthereumProvider {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (params: any) => void) => void;
    removeListener: (event: string, callback: (params: any) => void) => void;
    removeAllListeners: (event?: string) => void;
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
  }

  export type WalletProvider = keyof typeof WALLET_PROVIDERS;

  
  declare global {
    interface Window {
      ethereum?: EthereumProvider;
    }
  }