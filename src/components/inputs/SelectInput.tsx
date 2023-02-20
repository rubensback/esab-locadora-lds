import { SelectHTMLAttributes } from 'react'
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form'
import { InputContainer } from './styles'

interface SelectInputProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  register: UseFormRegisterReturn
  id: string
  label: string
  placeholder: string
  options?: Array<T>
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function SelectInput<T extends { id: string; name: string }>({
  register,
  id,
  label,
  placeholder,
  options,
  ...inputProps
}: SelectInputProps<T>) {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <InputContainer error={!!errors[id]}>
      <label htmlFor={id}>{label}</label>
      <select id={id} defaultValue="" {...register} {...inputProps}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {!!options &&
          options.map((option) => (
            <option key={option.id} value={option.id} label={option.name}>
              {option.name}
            </option>
          ))}
      </select>
    </InputContainer>
  )
}
