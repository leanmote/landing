import './Button.css';

function Button({
  variant = 'primary',
  as = 'button',
  href,
  type = 'button',
  onClick,
  children,
  className = '',
}) {
  const classes = `btn btn--${variant}${className ? ` ${className}` : ''}`;

  if (as === 'a') {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
