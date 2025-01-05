"use client";

import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from "./ui/Button";
import { useToast } from "./ui/use-toast";
import { SUPPORTED_CHAINS } from '../lib/constants/chains';

interface WalletAddressDisplayProps {
  address: string | null;
  chainId: string | null;
}

const formatAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const WalletAddressDisplay: React.FC<WalletAddressDisplayProps> = ({ address, chainId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyAddress = async () => {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard!",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Copy error:", error);
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const chainInfo = chainId ? SUPPORTED_CHAINS[parseInt(chainId, 16) as keyof typeof SUPPORTED_CHAINS] : null;

  return (
    <div className="w-full max-w-sm border border-purple-500/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-purple-500/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-purple-300">
          <span className="font-medium">Wallet Address</span>
          <span className="hidden md:inline">
            {address ? formatAddress(address) : 'Not Connected'}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-purple-300 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      {isExpanded && address && (
        <div className="p-4 bg-purple-500/5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 rounded-lg">
              <span className="font-mono text-sm text-purple-300 truncate">
                {address}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-500/20"
                onClick={copyAddress}
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-300" />
                )}
              </Button>
            </div>
            {chainInfo && (
              <div className="flex flex-col gap-1 text-sm text-purple-300">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Network:</span>
                  <span>{chainInfo.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Currency:</span>
                  <span>{chainInfo.currency.symbol}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Chain ID:</span>
                  <span>{parseInt(chainInfo.chainId, 16)}</span>
                </div>
                <Button
                  variant="link"
                  className="mt-2 text-purple-400 hover:text-purple-300"
                  onClick={() => window.open(chainInfo.blockExplorerUrl[0], '_blank')}
                >
                  View on Explorer
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletAddressDisplay;

