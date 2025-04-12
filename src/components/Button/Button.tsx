import React from 'react'

import { cn, } from '~/lib/utils'

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
} & React.ComponentProps<'button'>

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  const baseStyles = 'flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const primaryStyles = 'border-2 border-yellow-500 bg-yellow-500 text-gray-800 hover:bg-gray-800 hover:text-yellow-500 hover:shadow-lg'
  const secondaryStyles = 'border-2 border-yellow-500 bg-gray-800 text-white hover:bg-yellow-500 hover:text-gray-800 hover:shadow-lg'

  const buttonClassName = cn(
    baseStyles,
    sizeStyles[size],
    variant === 'primary' ? primaryStyles : secondaryStyles,
    props.className
  )

  return (
    <button
      {...props}
      className={buttonClassName}
      disabled={props.disabled}
    >
      {children}
    </button>
  )
}

export default Button
