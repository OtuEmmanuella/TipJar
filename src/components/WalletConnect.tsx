"use client";

import React, { useState } from 'react';
import { Button } from "./ui/Button";
import { Wallet, ChevronDown, X } from 'lucide-react';
import { useToast } from "./ui/use-toast";
import WalletAddressDisplay from './WalletAddressDisplay';
import { useWallet } from '../lib/hooks/useWallet';
import { SUPPORTED_CHAINS, ChainId } from '../lib/constants/chains';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

const WalletConnect: React.FC = () => {
  const { address, chainId, isConnected, isConnecting, connectWallet, disconnectWallet, switchChain } = useWallet();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnect = async (preferredChainId?: ChainId) => {
    try {
      setIsDialogOpen(false);
      await connectWallet(preferredChainId);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${SUPPORTED_CHAINS[preferredChainId as ChainId].name}`,
      });
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const handleSwitchChain = async (chainId: ChainId) => {
    try {
      await switchChain(chainId);
      toast({
        title: "Chain Switched",
        description: `Switched to ${SUPPORTED_CHAINS[chainId].name}`,
      });
    } catch (error) {
      console.error("Chain switch error:", error);
      toast({
        title: "Chain Switch Failed",
        description: "Failed to switch chain. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isConnected ? (
        <>
          <Button
            onClick={handleDisconnect}
            className="glass-button flex items-center gap-2 text-purple-300 hover:text-purple-200"
          >
            <Wallet className="w-4 h-4" />
            <span>Disconnect Wallet</span>
          </Button>
          <WalletAddressDisplay address={address} chainId={chainId} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                Switch Chain <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(SUPPORTED_CHAINS).map(([id, chain]) => (
                <DropdownMenuItem key={id} onSelect={() => handleSwitchChain(Number(id) as ChainId)}>
                  {chain.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={isConnecting}
              className="glass-button flex items-center gap-2 text-purple-300 hover:text-purple-200"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect to a wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {Object.entries(SUPPORTED_CHAINS).map(([id, chain]) => (
                <Button
                  key={id}
                  onClick={() => handleConnect(Number(id) as ChainId)}
                  className="w-full justify-start text-left font-normal"
                >
                  <img
                    src={`/chain-icons/${chain.name.toLowerCase().replace(' ', '-')}.svg`}
                    alt={chain.name}
                    className="w-5 h-5 mr-2"
                  />
                  {chain.name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WalletConnect;

