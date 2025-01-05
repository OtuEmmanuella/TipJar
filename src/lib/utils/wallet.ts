import { SUPPORTED_CHAINS, ChainId, ChainInfo } from '../constants/chains';

// Type definition for the Ethereum provider
interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (params: any) => void) => void;
  removeListener: (event: string, callback: (params: any) => void) => void;
  removeAllListeners: (event?: string) => void;
}

// Extend the Window interface to include ethereum property
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

// Type for the parameters required to add a new Ethereum chain
interface AddEthereumChainParameter {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}

/**
 * Formats an Ethereum address by shortening it (e.g., 0x1234...5678).
 * @param address The full Ethereum address to format.
 * @returns The formatted address string.
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Gets the chain name for a given chain ID.
 * @param chainId The chain ID as a hexadecimal string.
 * @returns The name of the chain or 'Unknown Chain' if not found.
 */
export function getChainName(chainId: string): string {
  // Convert hex chainId to number and find matching chain
  const numericChainId = parseInt(chainId, 16);
  const chain = SUPPORTED_CHAINS[numericChainId as ChainId];
  return chain ? chain.name : 'Unknown Chain';
}

/**
 * Switches the connected wallet to the specified chain.
 * If the chain is not added to the wallet, it attempts to add it.
 * @param chainId The chain ID to switch to.
 * @throws Error if no crypto wallet is found or if switching/adding chain fails.
 */
export async function switchChain(chainId: ChainId): Promise<void> {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found');
  }

  const chain = SUPPORTED_CHAINS[chainId];
  if (!chain) {
    throw new Error('Unsupported chain');
  }

  const chainIdHex = chain.chainId;

  try {
    // Try to switch to the chain
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        // If the chain is not added, try to add it
        await addChain(chain);
      } catch (addError) {
        console.error('Failed to add the network', addError);
        throw new Error('Failed to add the network');
      }
    } else {
      console.error('Failed to switch network', switchError);
      throw new Error('Failed to switch the network');
    }
  }
}

/**
 * Adds a new chain to the wallet.
 * @param chain The chain information to add.
 * @throws Error if adding the chain fails.
 */
async function addChain(chain: ChainInfo): Promise<void> {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found');
  }

  const addChainParameter: AddEthereumChainParameter = {
    chainId: chain.chainId,
    chainName: chain.name,
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: [chain.rpcUrl],
    blockExplorerUrls: [chain.blockExplorerUrl],
  };

  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [addChainParameter],
  });
}

/**
 * Listens for changes in the connected accounts.
 * @param callback Function to call when accounts change.
 * @returns A function to remove the listener.
 */
export function onAccountsChanged(callback: (accounts: string[]) => void): () => void {
  if (!window.ethereum) {
    console.warn('No crypto wallet found');
    return () => {};
  }

  const handler = (accounts: string[]) => callback(accounts);
  window.ethereum.on('accountsChanged', handler);

  return () => {
    window.ethereum.removeListener('accountsChanged', handler);
  };
}

/**
 * Listens for changes in the connected chain.
 * @param callback Function to call when the chain changes.
 * @returns A function to remove the listener.
 */
export function onChainChanged(callback: (chainId: string) => void): () => void {
  if (!window.ethereum) {
    console.warn('No crypto wallet found');
    return () => {};
  }

  const handler = (chainId: string) => callback(chainId);
  window.ethereum.on('chainChanged', handler);

  return () => {
    window.ethereum.removeListener('chainChanged', handler);
  };
}

/**
 * Requests access to the user's accounts.
 * @returns An array of account addresses.
 * @throws Error if no crypto wallet is found or if the request is rejected.
 */
export async function requestAccounts(): Promise<string[]> {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts as string[];
  } catch (error) {
    console.error('Failed to request accounts', error);
    throw new Error('Failed to request accounts');
  }
}

/**
 * Gets the current chain ID.
 * @returns The current chain ID as a hexadecimal string.
 * @throws Error if no crypto wallet is found or if getting the chain ID fails.
 */
export async function getCurrentChainId(): Promise<string> {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found');
  }

  try {
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    return chainId as string;
  } catch (error) {
    console.error('Failed to get current chain ID', error);
    throw new Error('Failed to get current chain ID');
  }
}

