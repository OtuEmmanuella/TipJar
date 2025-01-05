"use client";

import React, { useState } from 'react';
import { Copy, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/use-toast";

const DEMO_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

const formatAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const WalletAddressDisplay: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_WALLET_ADDRESS);
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

  return (
    <div className="w-full max-w-sm border border-purple-500/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-purple-500/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-purple-300">
          <span className="font-medium">Wallet Address</span>
          <span className="hidden md:inline">
            {formatAddress(DEMO_WALLET_ADDRESS)}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-purple-300 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-purple-500/5">
          <div className="flex items-center justify-between gap-2 rounded-lg">
            <span className="font-mono text-sm text-purple-300 truncate">
              {DEMO_WALLET_ADDRESS}
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
        </div>
      )}
    </div>
  );
};

export default WalletAddressDisplay;