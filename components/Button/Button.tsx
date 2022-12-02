import clsx from 'clsx'

type ButtonProps = {
  className?: string,
} & React.ComponentProps<'button'>

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'uppercase bg-yellow-400 px-3 py-2 rounded-md font-bold w-full md:w-auto',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button