// "use client";

// import { useEffect, useState } from "react";
// import { useContract } from "@/lib/hooks/useContract";
// import { formatEther, formatAddress } from "@/lib/utils/format";
// import { Tip } from "@/types/transaction";


// export default function TransactionHistory() {
//   const [tips, setTips] = useState<Tip[]>([]);
//   const { contract } = useContract();

//   useEffect(() => {
//     const fetchTips = async () => {
//       if (!contract) return;
//       try {
//         const tipData = await contract.getTips();
//         setTips(tipData.reverse());
//       } catch (error) {
//         console.error("Error fetching tips:", error);
//       }
//     };

//     fetchTips();
//   }, [contract]);

//   return (
//     <div className="space-y-4 max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">Recent Tips</h2>
//       <div className="space-y-4">
//         {tips.map((tip, index) => (
//           <Card key={index} className="glass-panel p-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-purple-400">
//                   From: {formatAddress(tip.sender)}
//                 </p>
//                 <p className="mt-2">{tip.message}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-lg font-bold text-purple-400">
//                   {formatEther(tip.amount)} ETH
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(tip.timestamp.toNumber() * 1000).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }