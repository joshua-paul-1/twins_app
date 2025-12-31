import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = [
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', color: 'bg-emerald-500' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', color: 'bg-blue-500' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', color: 'bg-orange-500' },
];

export default function CurrencySelector({ value, onChange, label, excludeCurrency }) {
  const availableCurrencies = currencies.filter(c => c.code !== excludeCurrency);
  const selectedCurrency = currencies.find(c => c.code === value);

  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-400 font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-slate-800/50 border-slate-700 text-white h-14 rounded-xl">
          <SelectValue>
            {selectedCurrency && (
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedCurrency.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{selectedCurrency.code}</span>
                  <span className="text-xs text-slate-400">{selectedCurrency.name}</span>
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {availableCurrencies.map((currency) => (
            <SelectItem 
              key={currency.code} 
              value={currency.code}
              className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{currency.flag}</span>
                <div className="flex flex-col">
                  <span className="font-semibold">{currency.code}</span>
                  <span className="text-xs text-slate-400">{currency.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { currencies };
