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
import {
  addDays,
  differenceInDays,
  format,
  startOfDay,
  subDays,
} from 'date-fns'
import { api } from '../../api'
import { toast } from 'react-toastify'

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
  days: number
  value: number
  cost_by_day: number
  movie_type_name: string
  movie_status_name: string
}

interface EmployeeProps {
  id: string
  name: string
  qty_rents: number
}

const rentMovieFormValidationSchema = zod.object({
  customer_id: zod.string().min(1),
  employee_id: zod.string().min(1),
  movie_id: zod.string().min(1),
  expire: zod.date(),
})

type rentTileFormData = zod.infer<typeof rentMovieFormValidationSchema>

export const Rent = () => {
  const [customerOptions, setCustomerOptions] = useState<CustomerProps[]>([])
  const [movieOptions, setMovieOptions] = useState<MovieProps[]>([])
  const [employeeOptions, setEmployeeOptions] = useState<EmployeeProps[]>([])
  const [customer, setCustomer] = useState<CustomerProps>({} as CustomerProps)
  const [movie, setMovie] = useState<MovieProps>({} as MovieProps)
  const [employee, setEmployee] = useState<EmployeeProps>({} as EmployeeProps)
  const [triggerRequest, setTriggerRequest] = useState(false)

  const rentMovieForm = useForm<rentTileFormData>({
    resolver: zodResolver(rentMovieFormValidationSchema),
    defaultValues: {
      customer_id: '',
      employee_id: '',
      movie_id: '',
      expire: new Date(),
    },
  })

  const { register, handleSubmit, control, watch, reset } = rentMovieForm

  const [customerId, movieId, employeeId, expire] = watch([
    'customer_id',
    'movie_id',
    'employee_id',
    'expire',
  ])

  useEffect(() => {
    const loadOptions = async () => {
      const {
        data: { customers },
      } = await api.get('/customers')
      const {
        data: { movies },
      } = await api.get('/movies', { params: { status: '1' } })
      const {
        data: { employees },
      } = await api.get('/employees')

      setCustomerOptions(customers)
      setMovieOptions(movies)
      setEmployeeOptions(employees)
    }

    loadOptions()
  }, [triggerRequest])

  const handleRent = useCallback(
    async (formValues: rentTileFormData) => {
      try {
        await api.post('/rents', formValues)
        reset()
        setCustomer({} as CustomerProps)
        setMovie({} as MovieProps)
        setEmployee({} as EmployeeProps)
        toast.success('Título alugado com sucesso!')
        setTriggerRequest((state) => !state)
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
    if (customerId)
      setCustomer(findItemById<CustomerProps>(customerOptions, customerId))
  }, [findItemById, customerId, customerOptions])

  useEffect(() => {
    if (movieId) setMovie(findItemById<MovieProps>(movieOptions, movieId))
  }, [findItemById, movieId, movieOptions])

  useEffect(() => {
    if (employeeId)
      setEmployee(findItemById<EmployeeProps>(employeeOptions, employeeId))
  }, [findItemById, employeeId, employeeOptions])

  const rentalDays = differenceInDays(
    startOfDay(expire),
    startOfDay(new Date()),
  )
  const costForDays = movie.cost_by_day * (rentalDays || 0)
  const fineAndDiscount = customer.fine - customer.discount
  const finalValue = movie.value + fineAndDiscount + costForDays
  const formattedDate = format(expire, 'dd/MM/yyyy')

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
                name="expire"
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
                  <h6>Título:</h6>
                  <p>{formattedPrice(movie.value)}</p>
                </Info>
                <Info>
                  <h6>Acrescimo por dias ({rentalDays}):</h6>
                  <p>{formattedPrice(costForDays)}</p>
                </Info>
                <Info>
                  <h6>Descontos - multas:</h6>
                  <p>{formattedPrice(fineAndDiscount)}</p>
                </Info>
                <Info>
                  <h5>Total:</h5>
                  <p>{formattedPrice(finalValue)}</p>
                </Info>
                <Info>
                  <h5>Devolução:</h5>
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
              <h6>Dias disponíveis:</h6>
              <p>{movie.days}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Tipo:</h6>
              <p>{movie.movie_type_name}</p>
            </DetailsInfo>
            <DetailsInfo>
              <h6>Status:</h6>
              <p>{movie.movie_status_name}</p>
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
              <p>{employee.qty_rents}</p>
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
