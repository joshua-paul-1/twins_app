import React, { useState } from 'react';

export function Select({ value, onValueChange, children, className = '' }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

// The following components simulate controlled select UI parts — optionally you can omit if you don't have complex custom dropdowns:

export function SelectTrigger({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function SelectContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ children, className = '' }) {
  return <span className={className}>{children}</span>;
}

