"use client";

import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Wallet, Copy, Check } from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../components/ui/dropdown-menu";

const DEMO_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Replace with your actual wallet address

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    // This is where you'd implement actual wallet connection logic
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected!",
    });
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(DEMO_WALLET_ADDRESS);
    setIsCopied(true);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard!",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
    <div className="fixed top-4 right-4 z-50">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="glass-button flex items-center gap-2 text-purple-300 hover:text-purple-200"
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {isCopied ? "Copied!" : "Copy Address"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-background/80 backdrop-blur-sm border-purple-500/20">
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <span className="font-mono text-sm truncate">{DEMO_WALLET_ADDRESS}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
        {/* Connect Wallet Button - To be placed in Hero.tsx */}
        <Button
        onClick={handleConnect}
        disabled={isConnected}
        className="glass-button flex items-center gap-2 text-purple-300 hover:text-purple-200 ml-4"
      >
        <Wallet className="w-4 h-4" />
        {isConnected ? "Connected" : "Connect Wallet"}
      </Button>
    </>
  );
}