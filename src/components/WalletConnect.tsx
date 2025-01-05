import React, { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Wallet, Copy, Check } from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import WalletAddressDisplay from './WalletAddressDisplay';


const formatAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      setIsConnected(true);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      });
    } catch (error) {
      console.error("Connection error:", error);
      setIsConnected(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
     

      <Button
        onClick={handleConnect}
        disabled={isConnected}
        className="glass-button flex items-center gap-2 text-purple-300 hover:text-purple-200"
      >
        <Wallet className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isConnected ? "Connected" : "Connect Wallet"}
        </span>
        <span className="sm:hidden">
          {isConnected ? "Connected" : "Connect Wallet"}
        </span>
      </Button>
      <WalletAddressDisplay />
    </div>
  );
};

export default WalletConnect;