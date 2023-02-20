import styled from 'styled-components'

interface InputContainerProps {
  error: boolean
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input,
  select {
    border: 2px solid
      ${(props) =>
        props.error ? props.theme['red-700'] : props.theme['gray-500']};
    background-color: ${(props) => props.theme['gray-600']};
    border-radius: 4px;
    color: ${(props) => props.theme['gray-300']};
    padding: 0.375rem;
    font-size: 0.875rem;

    ::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }

    :disabled {
      color: ${(props) => props.theme['gray-500']};
      border-color: ${(props) => props.theme['gray-600']};
    }
  }
`
