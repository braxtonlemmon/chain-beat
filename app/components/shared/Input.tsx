import {InputHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

function Input({name, ...rest}: InputProps) {
  return (
    <div>
      <label htmlFor={name} />
      <input id={name} {...rest}></input>
    </div>
  )
}

export default Input
