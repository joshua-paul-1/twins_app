import React from 'react';
import { Input } from "@/components/ui/input";
import { currencies } from './CurrencySelector';

export default function AmountInput({ value, onChange, currencyCode }) {
  const currency = currencies.find(c => c.code === currencyCode);

  const handleChange = (e) => {
    const val = e.target.value;
    // Allow only numbers and decimal point
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-400 font-medium">Amount</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-300">
          {currency?.symbol}
        </span>
        <Input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder="0.00"
          className="w-full bg-slate-800/50 border-slate-700 text-white text-2xl font-bold h-16 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
    </div>
  );
}
