export const SUPPORTED_CHAINS = {
    1: {
      chainId: '0x1',
      name: 'Ethereum Mainnet',
      currency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://eth-mainnet.public.blastapi.io'],
      blockExplorerUrls: ['https://etherscan.io']
    },
    137: {
      chainId: '0x89',
      name: 'Polygon Mainnet',
      currency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
      },
      rpcUrls: ['https://polygon-rpc.com'],
      blockExplorerUrls: ['https://polygonscan.com']
    },
    56: {
      chainId: '0x38',
      name: 'BNB Smart Chain',
      currency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
      },
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com']
    }
  } as const;
  
  export type ChainId = keyof typeof SUPPORTED_CHAINS;