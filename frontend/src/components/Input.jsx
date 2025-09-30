export default function Input({ label, error, ...props }) {
  return (
    <label className="block space-y-1">
      {label && <span className="label">{label}</span>}
      <input 
        className={`input ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`} 
        {...props} 
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </label>
  );
}



