// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { TipJar__factory } from "@/types/contract";
// import { TIPJAR_ADDRESS } from "@/lib/constants/addresses";

// export function useContract() {
//   const [contract, setContract] = useState<ReturnType<typeof TipJar__factory.connect> | null>(null);

//   useEffect(() => {
//     if (typeof window.ethereum !== "undefined") {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const tipJarContract = TipJar__factory.connect(TIPJAR_ADDRESS, signer);
//       setContract(tipJarContract);
//     }
//   }, []);

//   return { contract };
// }