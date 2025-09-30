export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'btn ' + (variant === 'primary' ? 'btn-primary' : variant === 'outline' ? 'btn-outline' : '');
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}



