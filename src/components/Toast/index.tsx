import { ToastContainer } from './styles'
import { ToastContainer as ToastifyContainer } from 'react-toastify'

export const Toast = () => {
  return (
    <ToastContainer>
      <ToastifyContainer
        hideProgressBar
        theme="colored"
        autoClose={2500}
        draggable={false}
      />
    </ToastContainer>
  )
}
