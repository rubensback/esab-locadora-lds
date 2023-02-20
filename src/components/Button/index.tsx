import { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './styles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: 'action' | 'cancel'
}

export const Button = ({
  label,
  variant = 'action',
  ...buttonProps
}: ButtonProps) => {
  return (
    <ButtonContainer variant={variant} {...buttonProps}>
      {label}
    </ButtonContainer>
  )
}
