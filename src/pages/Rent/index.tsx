import { SelectInput } from '../../components/inputs/SelectInput'
import {
  ButtonsContainer,
  Calendar,
  DataContainer,
  Details,
  DetailsBox,
  DetailsInfo,
  Info,
  InputsContainer,
  RentContainer,
  ResultsContainer,
  ResultsInfo,
} from './styles'
import * as zod from 'zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import ReactDatePicker from 'react-datepicker'
import { formattedPrice } from '../../utils'
import { addDays, format, subDays } from 'date-fns'

interface CustomerProps {
  id: string
  name: string
  phone: string
  discount: number
  fine: number
}

interface MovieProps {
  id: string
  name: string
  type: string
  status: string
  days: number
  value: number
}

interface EmployeeProps {
  id: string
  name: string
  rental_amount: number
}

const rentMovieFormValidationSchema = zod.object({
  customer_id: zod.string().min(1),
  employee_id: zod.string().min(1),
  movie_id: zod.string().min(1),
  date: zod.date(),
})

type rentTileFormData = zod.infer<typeof rentMovieFormValidationSchema>

// request options

const customerOptions: CustomerProps[] = [
  { id: '1', name: 'Abel', phone: '1', discount: 12.6, fine: 0 },
  { id: '2', name: 'Gustavo', phone: '', discount: 0, fine: 5.75 },
]

const movieOptions: MovieProps[] = [
  {
    id: '1',
    name: 'Cabeça fria coração quente',
    status: 'Disponivel',
    type: 'Fita VHS',
    days: 9,
    value: 48,
  },
  {
    id: '2',
    name: 'Rei leão',
    status: 'Alugado',
    type: 'DVD',
    days: 31,
    value: 15,
  },
]

const employeeOptions: EmployeeProps[] = [
  { id: '1', name: 'Dudu', rental_amount: 20 },
  { id: '2', name: 'Endrick', rental_amount: 2 },
  { id: '3', name: 'Giovanni', rental_amount: 13 },
]

export const Rent = () => {
  const [customer, setCustomer] = useState<CustomerProps>({} as CustomerProps)
  const [movie, setMovie] = useState<MovieProps>({} as MovieProps)
  const [employee, setEmployee] = useState<EmployeeProps>({} as EmployeeProps)

  const rentMovieForm = useForm<rentTileFormData>({
    resolver: zodResolver(rentMovieFormValidationSchema),
    defaultValues: {
      customer_id: '',
      employee_id: '',
      movie_id: '',
      date: new Date(),
    },
  })

  const { register, handleSubmit, control, watch, reset } = rentMovieForm

  const [customerId, movieId, employeeId, date] = watch([
    'customer_id',
    'movie_id',
    'employee_id',
    'date',
  ])

  const handleRent = useCallback(
    (formValues: rentTileFormData) => {
      try {
        // request rent
        console.log(formValues)
        reset()
      } catch (error) {}
    },
    [reset],
  )

  const findItemById = useCallback(
    <T extends { id: string }>(list: T[], itemId: string): T =>
      list.find((item) => itemId === item.id) || ({} as T),
    [],
  )

  useEffect(() => {
    setCustomer(findItemById<CustomerProps>(customerOptions, customerId))
  }, [findItemById, customerId])

  useEffect(() => {
    setMovie(findItemById<MovieProps>(movieOptions, movieId))
  }, [findItemById, movieId])

  useEffect(() => {
    setEmployee(findItemById<EmployeeProps>(employeeOptions, employeeId))
  }, [findItemById, employeeId])

  const finalValue = movie.value - customer.discount + customer.fine
  const formattedDate = format(date, 'dd/MM/yyyy')
  console.log(watch())

  return (
    <RentContainer>
      <DataContainer>
        <form id="rent-form" onSubmit={handleSubmit(handleRent)}>
          <FormProvider {...rentMovieForm}>
            <InputsContainer>
              <SelectInput
                id="customer_id"
                label="Locador"
                placeholder="Selecione um locador"
                register={register('customer_id')}
                options={customerOptions}
              />
              <SelectInput
                id="employee_id"
                label="Funcionario"
                placeholder="Selecione um Funcionario"
                register={register('employee_id')}
                options={employeeOptions}
              />
              <SelectInput
                id="movie_id"
                label="Titulo"
                placeholder="Selecione um Título"
                register={register('movie_id')}
                options={movieOptions}
              />
            </InputsContainer>
          </FormProvider>
          <ResultsContainer>
            <Calendar>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ReactDatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    inline
                    disabledKeyboardNavigation
                    includeDateIntervals={[
                      {
                        start: subDays(new Date(), 1),
                        end: addDays(new Date(), movie.days || 0),
                      },
                    ]}
                  />
                )}
              />
            </Calendar>
            {customerId && movieId && employeeId && (
              <ResultsInfo>
                <Info>
                  <h6>Subtotal:</h6>
                  <p>{formattedPrice(movie.value)}</p>
                </Info>
                <Info>
                  <h6>Total:</h6>
                  <p>{formattedPrice(finalValue)}</p>
                </Info>
                <Info>
                  <h6>Devolução:</h6>
                  <p>{formattedDate}</p>
                </Info>
              </ResultsInfo>
            )}
          </ResultsContainer>
        </form>
        <Details>
          <DetailsBox>
            <DetailsInfo>
              <h6>Titulo:</h6>
              <p>{movie.name}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Disponibilidade:</h6>
              <p>{movie.days}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Tipo:</h6>
              <p>{movie.type}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Status:</h6>
              <p>{movie.status}</p>
            </DetailsInfo>
          </DetailsBox>
          <DetailsBox>
            <DetailsInfo>
              <h6>Locador:</h6>
              <p>{customer.name}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Desconto:</h6>
              <p>{formattedPrice(customer.discount)}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Multa:</h6>
              <p>{formattedPrice(customer.fine)}</p>
            </DetailsInfo>
          </DetailsBox>
          <DetailsBox>
            <DetailsInfo>
              <h6>Funcionario:</h6>
              <p>{employee.name}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Alugueis registrados:</h6>
              <p>{employee.rental_amount}</p>
            </DetailsInfo>
          </DetailsBox>
        </Details>
      </DataContainer>

      <ButtonsContainer>
        <Button label="Alugar" type="submit" form="rent-form" />
        <Button
          label="Limpar"
          type="button"
          onClick={() => reset()}
          variant="cancel"
        />
      </ButtonsContainer>
    </RentContainer>
  )
}
