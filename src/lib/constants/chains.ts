import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export enum ChainId {
  ETHEREUM = 1,
  POLYGON = 137,
  SEPOLIA = 11155111,
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
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
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
    rpcUrl: 'https://polygon-rpc.com', // No sensitive key required
    blockExplorerUrl: 'https://polygonscan.com',
  }, 
  [ChainId.SEPOLIA]: {
    chainId: '0xAa36A7',
    name: 'Sepolia Testnet',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    currency: 'ETH',
    rpcUrl: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,  // Replace with Infura RPC for Sepolia
    blockExplorerUrl: 'https://sepolia.etherscan.io',  // Block explorer for Sepolia
  },
  // Add other supported chains as needed
};
