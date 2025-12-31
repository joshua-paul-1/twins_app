export function Card({ children, className = '' }) {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-white ${className}`}>
      {children}
    </div>
  );
}

