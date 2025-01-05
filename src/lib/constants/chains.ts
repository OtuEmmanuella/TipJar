export enum ChainId {
    ETHEREUM = 1,
    POLYGON = 137,
    // Add other chain IDs as needed
  }
  
  export interface NativeCurrency {
    name: string;
    symbol: string;
    decimals: number;
  }
  
  export interface ChainInfo {
    currency: any;
    chainId: string;
    name: string;
    nativeCurrency: NativeCurrency;
    rpcUrl: string;
    blockExplorerUrl: string;
  }
  
  export const SUPPORTED_CHAINS: Record<ChainId, ChainInfo> = {
    [ChainId.ETHEREUM]: {
      chainId: '0x1',
      name: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      currency: 'ETH',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      blockExplorerUrl: 'https://etherscan.io',
    },
    [ChainId.POLYGON]: {
      chainId: '0x89',
      name: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      currency: 'MATIC', 
      rpcUrl: 'https://polygon-rpc.com',
      blockExplorerUrl: 'https://polygonscan.com',
    },
    // Add other supported chains as needed
  };
  