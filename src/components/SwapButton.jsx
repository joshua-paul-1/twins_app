import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SwapButton({ onClick }) {
  return (
    <div className="flex justify-center -my-2 relative z-10">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95, rotate: 180 }}
      >
        <Button
          onClick={onClick}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30"
        >
          <ArrowUpDown className="w-5 h-5 text-white" />
        </Button>
      </motion.div>
    </div>
  );
}
