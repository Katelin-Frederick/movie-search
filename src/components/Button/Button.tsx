import React from 'react'

import { cn, } from '~/lib/utils'

type ButtonProps = {
  variant?: 'primary' | 'secondary';
} & React.ComponentProps<'button'>

const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  if (variant === 'primary') {
    return (
      <button
        {...props}
        className={cn('border-2 border-yellow-500 bg-yellow-500 px-3 py-1 rounded-sm text-gray-800 font-bold hover:bg-gray-800 hover:shadow-md hover:shadow-yellow-500 hover:text-yellow-500', props.className)}
      >
        {children}
      </button>
    )
  }

  (
    <button
      {...props}
      className={cn('border-2 border-yellow-500 bg-gray-800/70 px-3 py-1 rounded-sm text-white font-bold hover:text-yellow-500 hover:shadow-md hover:shadow-yellow-500', props.className)}
    >
      {children}
    </button>
  )
}

export default Button