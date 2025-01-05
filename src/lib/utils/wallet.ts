import { SUPPORTED_CHAINS, ChainId, ChainInfo } from '../constants/chains';
import { WALLET_PROVIDERS } from './providers';
import { detectDevice, DEVICE_TYPES, isInAppBrowser } from './device';

export function getWalletDeepLink(provider: keyof typeof WALLET_PROVIDERS, dappUrl: string, chainId?: number): string {
  const walletInfo = WALLET_PROVIDERS[provider];
  const deviceType = detectDevice();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (deviceType === DEVICE_TYPES.DESKTOP) {
    return walletInfo.desktop.downloadUrl;
  }

  const params = new URLSearchParams({
    url: dappUrl,
    ...(chainId && { chain_id: chainId.toString() })
  });

  if (isIOS) {
    // iOS-specific deep linking
    const mmUrl = `metamask://dapp/${dappUrl}`;
    
    // First try opening MetaMask directly
    setTimeout(() => {
      window.location.href = mmUrl;
    }, 10);
    
    // If direct deep link fails, try universal link as fallback
    setTimeout(() => {
      const universalUrl = `https://metamask.app.link/dapp/${dappUrl}`;
      window.location.href = universalUrl;
    }, 2000);

    return mmUrl;
  } else {
    // Android deep linking
    return `${walletInfo.mobile.universal}?${params.toString()}`;
  }
}

export async function switchChain(chainId: ChainId): Promise<void> {
  if (!window.ethereum) throw new Error('No wallet found');

  const chain = SUPPORTED_CHAINS[chainId];
  if (!chain) throw new Error('Unsupported chain');

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.chainId }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      await addChain(chain);
    } else {
      throw error;
    }
  }
}

async function addChain(chain: ChainInfo): Promise<void> {
  if (!window.ethereum) throw new Error('No wallet found');

  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: chain.chainId,
      chainName: chain.name,
      nativeCurrency: chain.nativeCurrency,
      rpcUrls: [chain.rpcUrl],
      blockExplorerUrls: [chain.blockExplorerUrl],
    }],
  });
}

