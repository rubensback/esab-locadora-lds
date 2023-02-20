import styled from 'styled-components'
import { ButtonProps } from '.'
import { lighten } from 'polished'

type ButtonContainerProps = Pick<ButtonProps, 'variant'>

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 1rem 1.5rem;
  border: 0;
  border-radius: 6px;
  font-weight: bold;
  background-color: ${(props) =>
    props.variant === 'cancel'
      ? props.theme['red-500']
      : props.theme['green-700']};
  color: ${(props) => props.theme.white};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      lighten(
        0.1,
        props.variant === 'cancel'
          ? props.theme['red-500']
          : props.theme['green-700'],
      )};
  }
`
