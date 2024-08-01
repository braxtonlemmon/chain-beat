'use client'
import {ButtonHTMLAttributes} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({children, ...rest}: ButtonProps) {
  return (
    <button
      className="bg-accent rounded-md p-2 px-4 hover:bg-lightAccent disabled:bg-background disabled:text-disabled uppercase text-sm"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
