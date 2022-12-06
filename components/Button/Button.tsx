import clsx from 'clsx'

type ButtonProps = {
  className?: string,
  variant?: 'primary' | 'secondary'
} & React.ComponentProps<'button'>

const Button = ({ children, className, variant = 'primary', ...rest }: ButtonProps) => {
  const primaryClasses = 'border-2 border-yellow-400 bg-yellow-400 text-black'
  const secondaryClasses = 'border-2 border-yellow-400 text-yellow-400'
  return (
    <button
      className={clsx(
        'uppercase px-3 py-2 rounded-md font-bold w-full md:w-auto',
        variant === 'primary' ? primaryClasses : secondaryClasses,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button