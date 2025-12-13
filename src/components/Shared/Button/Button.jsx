const Button = ({
  label,
  children,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-3xl
        hover:opacity-80
        transition
        cursor-pointer
        px-4
        w-full
        ${outline ? 'bg-white' : 'bg-pink-500'}
        ${outline ? 'border-black' : 'border-pink-400'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border' : 'border-2'}
        ${className}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}

      {/* label priority, then children */}
      {label || children}
    </button>
  );
};

export default Button;
