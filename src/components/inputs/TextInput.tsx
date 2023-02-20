import { InputHTMLAttributes } from 'react'
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form'
import { InputContainer } from './styles'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn
  id: string
  label: string
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const TextInput = ({
  register,
  id,
  label,
  ...inputProps
}: TextInputProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <InputContainer error={!!errors[id]}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...register} {...inputProps} />
    </InputContainer>
  )
}
