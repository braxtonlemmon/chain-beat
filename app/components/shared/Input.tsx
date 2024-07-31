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
    <div className="w-full mb-2">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <input
        className="p-2 rounded text-background w-full mt-2"
        id={name}
        onInput={handleChange}
        {...rest}
      ></input>
    </div>
  )
}

export default Input
