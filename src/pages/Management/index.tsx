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
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../api'
import { toast } from 'react-toastify'

const updateMovieFormValidationSchema = zod.object({
  id: zod.string(),
  name: zod.string().min(1),
  days: zod.number().min(1),
  value: zod.number().min(0.01),
  movie_type_id: zod.string().min(1),
  movie_status_id: zod.string().min(1),
})

type updateMovieFormData = zod.infer<typeof updateMovieFormValidationSchema>

export const Management = () => {
  const [movieTypeOptions, setMovieTypeOptions] = useState([])
  const [movieStatusOptions, setMovieStatusOptions] = useState([])

  const updateMovieForm = useForm<updateMovieFormData>({
    resolver: zodResolver(updateMovieFormValidationSchema),
    defaultValues: {
      id: '',
      name: '',
      days: undefined,
      value: undefined,
      movie_type_id: '',
      movie_status_id: '',
    },
  })

  const { register, watch, reset, setValue, handleSubmit } = updateMovieForm

  const id = watch('id')

  useEffect(() => {
    const loadOptions = async () => {
      const { data: dataTypes } = await api.get('/movies/types')
      const { data: dataStatus } = await api.get('/movies/status')

      setMovieTypeOptions(dataTypes.movie_types)
      setMovieStatusOptions(dataStatus.movie_status)
    }

    loadOptions()
  }, [])

  const handleClearForm = useCallback(() => {
    reset()
  }, [reset])

  const selectMovie = useCallback(
    (selectedMovie: updateMovieFormData) => {
      setValue('id', selectedMovie.id)
      setValue('name', selectedMovie.name)
      setValue('days', selectedMovie.days)
      setValue('movie_type_id', selectedMovie.movie_type_id)
      setValue('movie_status_id', selectedMovie.movie_status_id)
      setValue('value', selectedMovie.value)
    },
    [setValue],
  )

  const handleSave = useCallback(
    async (formValues: updateMovieFormData) => {
      try {
        const { id } = formValues

        if (id) {
          await api.put(`/movies/${id}`, formValues)
          toast.success('Título editado com sucesso!')
        } else {
          await api.post(`/movies/${id}`, formValues)
          toast.success('Título criado com sucesso!')
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
        movieStatusOptions={movieStatusOptions}
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
              step={0.01}
              type="number"
              placeholder="Digite o valor"
            />
            <SelectInput
              id="movie_type_id"
              label="Tipo"
              register={register('movie_type_id')}
              placeholder="Escolha um tipo"
              options={movieTypeOptions}
            />
            <SelectInput
              id="movie_status_id"
              label="Status"
              register={register('movie_status_id')}
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
