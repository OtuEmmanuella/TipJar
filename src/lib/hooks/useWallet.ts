"use client";

import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { switchChain, getChainName } from '../utils/wallet';
import type { ChainId } from '../constants/chains';

interface WalletState {
  address: string | null;
  chainId: string | null;
  chainName: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  signer: JsonRpcSigner | null;
  error: Error | null;
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
  });

  const updateChainInfo = useCallback(async () => {
    if (!window.ethereum) return;

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const chainName = getChainName(chainId);

    setState(prev => ({
      ...prev,
      chainId,
      chainName,
    }));
  }, []);

  const connectWallet = async (preferredChainId?: ChainId) => {
    if (!window.ethereum) {
      setState(prev => ({
        ...prev,
        error: new Error('No wallet found')
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isConnecting: true, error: null }));

      if (preferredChainId) {
        await switchChain(preferredChainId);
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = accounts[0];

      await updateChainInfo();

      setState(prev => ({
        ...prev,
        address,
        isConnecting: false,
        isConnected: true,
        signer,
        error: null,
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

  const disconnectWallet = () => {
    setState({
      address: null,
      chainId: null,
      chainName: null,
      isConnecting: false,
      isConnected: false,
      signer: null,
      error: null,
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setState(prev => ({
            ...prev,
            address: accounts[0],
          }));
        }
      });

      window.ethereum.on('chainChanged', async () => {
        await updateChainInfo();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, [updateChainInfo]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    switchChain,
  };
}