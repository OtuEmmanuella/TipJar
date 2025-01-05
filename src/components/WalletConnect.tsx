// "use client";

// import { useWallet } from "@/lib/hooks/useWallet";
// import { Button } from "./ui/Button";
// import { Wallet } from "lucide-react";
// import { formatAddress } from "@/lib/utils/format";

// export default function WalletConnect() {
//   const { address, isConnected, connect, disconnect } = useWallet();

//   return (
//     <div className="fixed top-4 right-4 z-50">
//       <Button
//         onClick={isConnected ? disconnect : connect}
//         variant={isConnected ? "secondary" : "default"}
//         className="glass-panel"
//       >
//         <Wallet className="w-4 h-4 mr-2" />
//         {isConnected ? formatAddress(address!) : "Connect Wallet"}
//       </Button>
//     </div>
//   );
// }