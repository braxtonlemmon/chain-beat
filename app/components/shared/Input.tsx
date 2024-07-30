import {ChangeEvent, InputHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  setInputValue: (val: string) => void
  label?: string
}

function Input({name, setInputValue, label, ...rest}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setInputValue(value)
  }

  return (
    <div className="w-full">
      <label htmlFor={name}>{label}</label>
      <input
        className="p-2 rounded text-background w-full"
        id={name}
        onChange={handleChange}
        {...rest}
      ></input>
    </div>
  )
}

export default Input
