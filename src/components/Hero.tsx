"use client"; 
import { Bitcoin, DollarSign, Wallet, CreditCard, Plus } from "lucide-react";
import { motion } from "framer-motion";

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

      {/* Central content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
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
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Send instant tips across the blockchain. Support creators, artists, and innovators with seamless cryptocurrency transactions.
        </motion.p>

        {/* Central plus icon with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-24 h-24 mx-auto mb-8"
        >
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse-purple" />
          <div className="relative glass-panel w-full h-full rounded-full flex items-center justify-center">
            <Plus className="w-10 h-10 text-purple-400" />
          </div>
        </motion.div>

        {/* Rotating ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-purple-500/20 rounded-full animate-rotate-slow" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-500/10 rounded-full animate-rotate-slow" />
      </div>
    </div>
  );
};

export default Hero;