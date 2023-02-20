import { Button } from '../../components/Button'
import {
  ButtonsContainer,
  InputsContainer,
  ManagementContainer,
} from './styles'
import { FindMovie } from './FindMovie'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '../../components/inputs/TextInput'
import { SelectInput } from '../../components/inputs/SelectInput'
import { useCallback } from 'react'
import { IdAndName } from '../../utils'

// request options
const movieTypeOptions: IdAndName[] = [
  { id: '1', name: 'VHS' },
  { id: '2', name: 'DVD' },
  { id: '3', name: 'Blu-ray' },
]

const movieStatusOptions: IdAndName[] = [
  { id: '1', name: 'Disponivel' },
  { id: '2', name: 'Alugado' },
  { id: '3', name: 'Perdido' },
]

const updateMovieFormValidationSchema = zod.object({
  id: zod.string(),
  name: zod.string().min(1),
  days: zod.number().min(1),
  value: zod.number().min(0.01),
  type: zod.string().min(1),
  status: zod.string().min(1),
})

type updateMovieFormData = zod.infer<typeof updateMovieFormValidationSchema>

export const Management = () => {
  const updateMovieForm = useForm<updateMovieFormData>({
    resolver: zodResolver(updateMovieFormValidationSchema),
    defaultValues: {
      id: '',
      name: '',
      days: undefined,
      value: undefined,
      type: '',
      status: '',
    },
  })

  const { register, watch, reset, setValue, handleSubmit } = updateMovieForm

  const id = watch('id')

  const handleClearForm = useCallback(() => {
    reset()
  }, [reset])

  const selectMovie = useCallback(
    (selectedMovie: updateMovieFormData) => {
      setValue('id', selectedMovie.id)
      setValue('name', selectedMovie.name)
      setValue('days', selectedMovie.days)
      setValue('type', selectedMovie.type)
      setValue('status', selectedMovie.status)
      setValue('value', selectedMovie.value)
    },
    [setValue],
  )

  const handleSave = useCallback(
    (formValues: updateMovieFormData) => {
      try {
        if (formValues.id) {
          // request PUT
        } else {
          // request POST
        }
        reset()
      } catch (error) {
        console.log(error)
      }
    },
    [reset],
  )

  return (
    <ManagementContainer>
      <FindMovie
        movieTypeOptions={movieTypeOptions}
        selectMovie={selectMovie}
      />
      <form onSubmit={handleSubmit(handleSave)}>
        <FormProvider {...updateMovieForm}>
          <InputsContainer>
            {!!id && (
              <TextInput
                id="id"
                label="ID"
                register={register('id')}
                disabled
              />
            )}
            <TextInput
              id="name"
              label="Nome"
              register={register('name')}
              placeholder="Digite um nome"
            />
            <TextInput
              id="days"
              label="Disponibilidade"
              register={register('days', { valueAsNumber: true })}
              type="number"
              placeholder="Digite a quantidade de dias disponiveis para aluguel"
            />
            <TextInput
              id="value"
              label="Valor"
              register={register('value', { valueAsNumber: true })}
              type="number"
              placeholder="Digite o valor"
            />
            <SelectInput
              id="type"
              label="Tipo"
              register={register('type')}
              placeholder="Escolha um tipo"
              options={movieTypeOptions}
            />
            <SelectInput
              id="status"
              label="Status"
              register={register('status')}
              placeholder="Escolha um status"
              options={movieStatusOptions}
            />
          </InputsContainer>
          <ButtonsContainer>
            <Button
              label={id ? 'Editar Título' : 'Adicionar Título'}
              type="submit"
            />
            <Button
              label="Limpar"
              variant="cancel"
              type="button"
              onClick={handleClearForm}
            />
          </ButtonsContainer>
        </FormProvider>
      </form>
    </ManagementContainer>
  )
}
