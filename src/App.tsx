import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import 'react-datepicker/dist/react-datepicker.css'
import { Toast } from './components/Toast'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toast />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
