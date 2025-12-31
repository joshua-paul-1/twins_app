import React, { useState, useEffect, useCallback } from 'react';
//import { base44 } from '@/api/base44Client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

import exchangeRates from '@/api/exchangeRates';  // Replace base44 import

const currencies = [
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
];

export default function Home() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TZS');
  const [amount, setAmount] = useState('1');
  const [rate, setRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rateType, setRateType] = useState('market'); // 'market', 'student', 'business'

  const fromData = currencies.find(c => c.code === fromCurrency);
  const toData = currencies.find(c => c.code === toCurrency);
  // const convertedAmount = amount && rate ? (parseFloat(amount) * rate).toFixed(2) : '0.00';

const useFallbackRates = import.meta.env.VITE_USE_FALLBACK === 'true';

// Apply markup based on rate type
  const getMarkup = () => {
    if (rateType === 'market') return 0;
    
    const studentMarkups = {
      'TZS-INR': -0.01,
      'INR-TZS': -1,
      'TZS-USD': 0.00002,
      'INR-USD': 0.001,
      'USD-TZS': 10,
      'USD-INR': 0.5,
    };
    
    const businessMarkups = {
      'TZS-INR': 0.015,
      'INR-TZS': -3,
      'TZS-USD': 0.00003,
      'INR-USD': 0.0015,
      'USD-TZS': 15,
      'USD-INR': 0.7,
    };
    
    const markups = rateType === 'student' ? studentMarkups : businessMarkups;
    return markups[`${fromCurrency}-${toCurrency}`] || 0;
  };
  
  const finalRate = rate ? rate + getMarkup() : rate;
  const convertedAmount = amount && finalRate ? (parseFloat(amount) * finalRate).toFixed(2) : '0.00';


 const fetchExchangeRate = useCallback(async () => {
  setIsLoading(true);
  
  if (useFallbackRates) {
    const fallbackRates = {
      'USD-TZS': 2500,
      'TZS-USD': 0.0004,
      'USD-INR': 83.5,
      'INR-USD': 0.012,
      'TZS-INR': 0.033,
      'INR-TZS': 30,
    };
    setRate(fallbackRates[`${fromCurrency}-${toCurrency}`] || 1);
console.log("stupid rates");
    setIsLoading(false);
    return;
  }

  try {
    const response = await exchangeRates.getRate(fromCurrency, toCurrency); 
    setRate(response.rate);
  } catch (error) {
    const fallbackRates = {
      'USD-TZS': 2500,
      'TZS-USD': 0.0004,
      'USD-INR': 83.5,
      'INR-USD': 0.012,
      'TZS-INR': 0.033,
      'INR-TZS': 30,
    };
    console.log(error);
    setRate(fallbackRates[`${fromCurrency}-${toCurrency}`] || 1);
  } finally {
    setIsLoading(false);
  }
}, [fromCurrency, toCurrency, useFallbackRates]); 

  useEffect(() => {
    fetchExchangeRate();
  }, [fetchExchangeRate]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-indigo-900 to-slate-900 px-4 pt-6 pb-10">
        <h1 className="text-xl font-bold text-white text-center">Currency Exchange</h1>
        <p className="text-slate-400 text-sm mt-1 text-center">TZS • USD • INR</p>
        
        {/* Rate Mode Toggle */}
        <div className="flex items-center justify-center gap-1 mt-4 bg-slate-800/50 rounded-full p-1 max-w-md mx-auto">
          <button
            onClick={() => setRateType('market')}
            className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              rateType === 'market'
                ? 'bg-white text-slate-900' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setRateType('student')}
            className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              rateType === 'student'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRateType('business')}
            className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              rateType === 'business'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Business
          </button>
        </div>
      </div>

      {/* Main Card - pulled up over header */}
      <div className="px-4 -mt-4 flex-1">
        <Card className="bg-white rounded-2xl shadow-xl p-5 max-w-md mx-auto">
          
          {/* Amount Display */}
          <div className="mb-4">
            <p className="text-slate-500 text-sm mb-1">Amount</p>
            <div className="flex items-center border-b-2 border-slate-200 pb-2">
              <span className="text-slate-400 text-2xl mr-2">{fromData?.symbol}</span>
              <Input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="border-0 text-2xl font-bold text-slate-800 p-0 h-auto focus-visible:ring-0 shadow-none"
              />
            </div>
          </div>

          {/* Converted Result */}
          <motion.div 
            key={convertedAmount}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-4"
          >
            <p className="text-slate-500 text-sm mb-1">You get</p>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-slate-400">Fetching rate...</span>
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-slate-800">
                  {toData?.symbol}{parseFloat(convertedAmount).toLocaleString()}
                </p>
                {finalRate && (
                  <div className="space-y-0.5">
                    <p className="text-xs text-slate-500">
                      1 {fromCurrency} = {finalRate.toFixed(4)} {toCurrency}
                    </p>
                    {rateType !== 'market' && getMarkup() !== 0 && (
                      <p className="text-xs text-amber-600 font-medium">
                        ✓ {rateType.charAt(0).toUpperCase() + rateType.slice(1)} rate ({getMarkup() > 0 ? '+' : ''}{getMarkup().toFixed(4)} markup)
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Currency Selectors */}
          <div className="space-y-3">
            {/* From */}
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
              <span className="text-slate-500 text-sm w-12">From</span>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="flex-1 border-0 bg-transparent shadow-none h-auto p-0 focus:ring-0">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {/* <span className="text-2xl">{fromData?.flag}</span> */}
                      {/* <span className="font-semibold text-slate-800">{fromCurrency}</span> */}
                      {/* <span className="text-slate-200 text-xl">- {fromData?.name}</span> */}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <div className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span className="font-medium">{c.code}</span>
                        <span className="text-slate-500">- {c.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <motion.button
                whileTap={{ rotate: 180 }}
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md"
              >
                <ArrowUpDown className="w-4 h-4 text-white" />
              </motion.button>
            </div>

            {/* To */}
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
              <span className="text-slate-500 text-sm w-12">To</span>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="flex-1 border-0 bg-transparent shadow-none h-auto p-0 focus:ring-0">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{toData?.flag}</span>
                      <span className="font-semibold text-slate-800">{toCurrency}</span>
                      <span className="text-slate-500 text-sm">- {toData?.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <div className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span className="font-medium">{c.code}</span>
                        <span className="text-slate-500">- {c.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Refresh */}
          <Button
            onClick={fetchExchangeRate}
            disabled={isLoading}
            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl h-12"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Rate
          </Button>
        </Card>
      </div>
    </div>
  

  );
}
