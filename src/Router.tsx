import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Customer } from './pages/Customer'
import { Management } from './pages/Management'
import { Rent } from './pages/Rent'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Customer />} />
        <Route path="/aluguel" element={<Rent />} />
        <Route path="/titulos" element={<Management />} />
      </Route>
    </Routes>
  )
}
