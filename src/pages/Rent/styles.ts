import styled from 'styled-components'

export const RentContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3rem;
  }
`
export const DataContainer = styled.div`
  display: flex;
  flex: 1;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > * {
    width: 40rem;
  }
`

export const ResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40rem;
`

export const Calendar = styled.div`
  .react-datepicker__day--selected {
    background-color: ${(props) => props.theme['green-700']} !important;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${(props) => props.theme['green-500']} !important;
  }
`

export const ResultsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
`

export const Info = styled.div`
  display: flex;
  align-items: center;

  h5 {
    font-size: 1.25rem;
    font-weight: bold;
    width: 12rem;
  }

  h6 {
    font-size: 1rem;
    font-weight: bold;
    width: 12rem;
  }
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 3rem;
`

export const DetailsBox = styled.div`
  background-color: ${(props) => props.theme['gray-400']};
  border: 2px solid ${(props) => props.theme['gray-600']};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const DetailsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  h6 {
    font-size: 1rem;
    font-weight: bold;
    color: white;
  }

  p {
    color: ${(props) => props.theme['gray-100']};
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`
