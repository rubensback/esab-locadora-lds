import { NavLink, Outlet } from 'react-router-dom'
import { Content, Main, NavBar, Header, LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header>
        <h1>Locadora Almeida</h1>
      </Header>
      <Main>
        <NavBar>
          <NavLink to={'/'} end title="Locador">
            <p>Cadastrar Locador</p>
          </NavLink>
          <NavLink to={'/aluguel'} end title="Aluguel">
            <p>Alugar Título</p>
          </NavLink>
          <NavLink to={'/titulos'} end title="Titulos">
            <p>Gerenciar Títulos</p>
          </NavLink>
        </NavBar>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </LayoutContainer>
  )
}
