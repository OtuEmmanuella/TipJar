import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { SUPPORTED_CHAINS, ChainId } from '../constants/chains';
import { WALLET_PROVIDERS } from '../utils/providers';
import { detectDevice, DEVICE_TYPES, DeviceType, isInAppBrowser } from '../utils/device';
import { getWalletDeepLink, switchChain } from '../utils/wallet';

interface WalletState {
  address: string | null;
  chainId: string | null;
  chainName: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  signer: JsonRpcSigner | null;
  error: Error | null;
  deviceType: DeviceType;
  isInAppBrowser: boolean;
  provider: keyof typeof WALLET_PROVIDERS | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    chainName: null,
    isConnecting: false,
    isConnected: false,
    signer: null,
    error: null,
    deviceType: detectDevice(),
    isInAppBrowser: isInAppBrowser(),
    provider: null
  });

  const detectProvider = useCallback(() => {
    if (!window.ethereum) return null;
    if (window.ethereum.isMetaMask) return 'METAMASK';
    if (window.ethereum.isCoinbaseWallet) return 'COINBASE';
    return null;
  }, []);

  const updateChainInfo = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdNum = parseInt(chainId, 16);
      const chainInfo = SUPPORTED_CHAINS[chainIdNum as ChainId];

      setState(prev => ({
        ...prev,
        chainId,
        chainName: chainInfo?.name || 'Unknown Chain',
      }));
    } catch (error) {
      console.error('Error updating chain info:', error);
    }
  }, []);

  const connectWallet = async (preferredProvider?: keyof typeof WALLET_PROVIDERS, preferredChainId?: ChainId) => {
    const deviceType = detectDevice();
    const inAppBrowser = isInAppBrowser();
    
    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      if (deviceType !== DEVICE_TYPES.DESKTOP && !inAppBrowser) {
        const provider = preferredProvider || 'METAMASK';
        const deepLink = getWalletDeepLink(
          provider,
          `${window.location.href}?connect=true`,
          preferredChainId
        );
        window.location.href = deepLink;
        return;
      }

      if (!window.ethereum) {
        throw new Error('Please install a wallet');
      }

      if (preferredChainId) {
        await switchChain(preferredChainId);
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      await updateChainInfo();

      setState(prev => ({
        ...prev,
        address: accounts[0],
        isConnecting: false,
        isConnected: true,
        signer,
        error: null,
        provider: detectProvider()
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  const disconnectWallet = useCallback(() => {
    setState(prev => ({
      ...prev,
      address: null,
      chainId: null,
      chainName: null,
      isConnected: false,
      signer: null,
      error: null,
      provider: null
    }));
  }, []);

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setState(prev => ({
          ...prev,
          address: accounts[0],
        }));
      }
    };

    const handleChainChanged = async () => {
      await updateChainInfo();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [disconnectWallet, updateChainInfo]);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    switchChain,
  };
}

