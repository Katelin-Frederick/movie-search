type ButtonProps = {
  variant?: 'primary' | 'secondary'
} & React.ComponentProps<'button'>

const Button = ({ variant, children, ...rest }: ButtonProps) => {
  return (
    <button
      className="uppercase bg-yellow-400 px-3 py-2 rounded-md font-bold"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button