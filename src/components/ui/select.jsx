import React, { useState, useRef, useEffect } from 'react';

export function Select({ value, onValueChange, children, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  let trigger = null;
  let content = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === SelectTrigger) {
        trigger = child;
      } else if (child.type === SelectContent) {
        content = child;
      }
    }
  });

  const handleSelect = (newValue) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && content && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {React.Children.map(content.props.children, (child) => {
            if (React.isValidElement(child) && child.type === SelectItem) {
              return React.cloneElement(child, {
                onClick: () => handleSelect(child.props.value),
                isSelected: child.props.value === value
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

export function SelectItem({ value, children, onClick, isSelected, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 cursor-pointer hover:bg-slate-100 transition-colors ${
        isSelected ? 'bg-slate-50' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SelectTrigger({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function SelectContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ children, className = '' }) {
  return <span className={className}>{children}</span>;
}
