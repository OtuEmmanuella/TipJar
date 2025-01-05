// import { useState, useEffect, useCallback } from "react";
// import { ethers } from "ethers";

// export function useWallet() {
//   const [address, setAddress] = useState<string | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   const connect = useCallback(async () => {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         setAddress(address);
//         setIsConnected(true);
//       } catch (error) {
//         console.error("Error connecting wallet:", error);
//       }
//     }
//   }, []);

//   const disconnect = useCallback(() => {
//     setAddress(null);
//     setIsConnected(false);
//   }, []);

//   useEffect(() => {
//     if (typeof window.ethereum !== "undefined") {
//       window.ethereum.on("accountsChanged", (accounts: string[]) => {
//         if (accounts.length > 0) {
//           setAddress(accounts[0]);
//           setIsConnected(true);
//         } else {
//           setAddress(null);
//           setIsConnected(false);
//         }
//       });
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeAllListeners();
//       }
//     };
//   }, []);

//   return { address, isConnected, connect, disconnect };
// }