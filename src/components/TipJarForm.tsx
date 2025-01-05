// "use client";

// import { useState } from "react";
// import { useContract } from "@/lib/hooks/useContract";
// import { useWallet } from "@/lib/hooks/useWallet";
// import { Button } from "./ui/Button";
// import { Input } from "./ui/Input";
// import { ethers } from "ethers";
// import { Send } from "lucide-react";

// export default function TipJarForm() {
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const { contract } = useContract();
//   const { address, isConnected } = useWallet();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!contract || !isConnected) return;

//     try {
//       setLoading(true);
//       const tx = await contract.sendTip(message, {
//         value: ethers.utils.parseEther(amount)
//       });
//       await tx.wait();
//       setAmount("");
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending tip:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 glass-panel p-6 max-w-md w-full mx-auto">
//       <div>
//         <Input
//           type="number"
//           step="0.01"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Amount in ETH"
//           className="w-full"
//           required
//         />
//       </div>
//       <div>
//         <Input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Leave a message..."
//           className="w-full"
//           required
//         />
//       </div>
//       <Button
//         type="submit"
//         disabled={!isConnected || loading}
//         className="w-full"
//       >
//         <Send className="w-4 h-4 mr-2" />
//         Send Tip
//       </Button>
//     </form>
//   );
// }


"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export default function TipJarForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative z-10 glass-panel p-8 rounded-xl border border-purple-500/20 backdrop-blur-xl
                 bg-gradient-to-b from-purple-500/10 to-transparent shadow-2xl"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-purple-300">
            Amount (ETH)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.05"
            className="w-full px-4 py-3 bg-purple-500/5 border border-purple-500/20 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent
                       placeholder-purple-300/50 text-purple-100 transition-all duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-purple-300">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message..."
            rows={3}
            className="w-full px-4 py-3 bg-purple-500/5 border border-purple-500/20 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent
                       placeholder-purple-300/50 text-purple-100 transition-all duration-300 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full px-4 py-3 bg-purple-500 text-white rounded-lg font-medium
                     transform transition-all duration-300 hover:bg-purple-600 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center justify-center gap-2">
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            {loading ? "Processing..." : "Send Tip"}
          </span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 
                        opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        </button>
      </div>
    </motion.form>
  );
}