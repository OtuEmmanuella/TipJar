"use client";
import { Bitcoin, DollarSign, Wallet, CreditCard, Plus, History } from "lucide-react";
import { motion } from "framer-motion";
import TipJarForm from "./TipJarForm";
import WalletConnect from "./WalletConnect";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-purple-900/20" />
      
      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Bitcoin className="w-8 h-8 text-purple-400 animate-float" />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-1/4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <DollarSign className="w-8 h-8 text-purple-400 animate-float-delay-1" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Wallet className="w-8 h-8 text-purple-400 animate-float-delay-2" />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <CreditCard className="w-8 h-8 text-purple-400 animate-float-delay-3" />
        </motion.div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="px-4 py-1.5 text-sm font-medium text-purple-300 glass-panel inline-block">
              BLOCKCHAIN TIPPING
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            The Future of Digital <br />
            <span className="text-gradient">Appreciation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl"
          >
            Send instant tips across the blockchain. Support creators, artists, and innovators with seamless cryptocurrency transactions.
          </motion.p>

          {/* Transaction History Button */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 
                         text-purple-300 rounded-lg transition-all duration-300 backdrop-blur-sm border border-purple-500/20
                         hover:border-purple-500/40"
              onClick={() => {/* Add your transaction history logic here */}}
            >
              <History className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
              <span className="font-medium">View Transaction History</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 
                            opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <WalletConnect />
            </motion.div>
          </div>
        </div>

        {/* Right side - Tip Jar Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex-1 w-full max-w-md"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/5 rounded-2xl blur-2xl transform rotate-3" />
            <TipJarForm />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-rotate-slow" />
        <div className="absolute inset-0 border border-purple-500/10 rounded-full animate-rotate-slow-reverse scale-90" />
      </div>
    </div>
  );
};

export default Hero;