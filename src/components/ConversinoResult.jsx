import React from 'react';
import { currencies } from './CurrencySelector';
import { motion } from 'framer-motion';

export default function ConversionResult({ amount, fromCurrency, toCurrency, rate, isLoading }) {
  const toCurrencyData = currencies.find(c => c.code === toCurrency);
  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  
  const convertedAmount = amount && rate ? (parseFloat(amount) * rate).toFixed(2) : '0.00';

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50">
      <p className="text-sm text-slate-400 mb-2">Converted Amount</p>
      
      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-400">Fetching rates...</span>
        </div>
      ) : (
        <motion.div
          key={convertedAmount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">
              {toCurrencyData?.symbol}{parseFloat(convertedAmount).toLocaleString()}
            </span>
            <span className="text-xl text-slate-400">{toCurrency}</span>
          </div>
          
          {rate && (
            <p className="text-sm text-slate-500 mt-3">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
