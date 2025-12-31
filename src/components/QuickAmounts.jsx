import React from 'react';
import { Button } from "@/components/ui/button";

const quickAmounts = [100, 500, 1000, 5000, 10000];

export default function QuickAmounts({ onSelect, currencyCode }) {
  return (
    <div className="mt-4">
      <p className="text-xs text-slate-500 mb-2">Quick amounts</p>
      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            size="sm"
            onClick={() => onSelect(amount.toString())}
            className="bg-slate-800/30 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white text-xs"
          >
            {amount.toLocaleString()}
          </Button>
        ))}
      </div>
    </div>
  );
}
