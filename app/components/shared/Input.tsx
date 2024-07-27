import {ChangeEvent, InputHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  setInputValue: (val: string) => void
}

function Input({name, setInputValue, ...rest}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setInputValue(value)
  }

  return (
    <div>
      <label htmlFor={name} />
      <input id={name} onChange={handleChange} {...rest}></input>
    </div>
  )
}

export default Input
