import styled from 'styled-components'

export const ToastContainer = styled.div`
  .Toastify__toast-theme--colored.Toastify__toast--success {
    background-color: ${(props) => props.theme['green-500']};
  }

  .Toastify__toast-theme--colored.Toastify__toast--error {
    background-color: ${(props) => props.theme['red-500']};
  }

  .Toastify__toast-theme--colored.Toastify__toast--warning {
    background-color: ${(props) => props.theme['yellow-500']};
  }
`
