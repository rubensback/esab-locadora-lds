import * as Dialog from '@radix-ui/react-dialog'
import { TextInput } from '../../../components/inputs/TextInput'
import {
  ButtonContainer,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  InputsContainer,
} from './styles'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectInput } from '../../../components/inputs/SelectInput'
import { Button } from '../../../components/Button'
import { useCallback, useEffect, useState } from 'react'
import { SearchedMovies } from '../SearchedMovies'
import { IdAndName, Movie } from '../../../utils'
import { api } from '../../../api'
import { toast } from 'react-toastify'

const findMovieFormValidationSchema = zod.object({
  name: zod.string().optional(),
  type: zod.string().optional(),
  status: zod.string().optional(),
})

type FindMovieFormData = zod.infer<typeof findMovieFormValidationSchema>

interface FindMovieProps {
  movieTypeOptions: IdAndName[]
  movieStatusOptions: IdAndName[]
  selectMovie: (movie: Movie) => void
}

export const FindMovie = ({
  movieTypeOptions,
  movieStatusOptions,
  selectMovie,
}: FindMovieProps) => {
  const findMovieForm = useForm<FindMovieFormData>({
    resolver: zodResolver(findMovieFormValidationSchema),
    defaultValues: { name: '', type: '' },
  })
  const [movies, setMovies] = useState<Movie[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = findMovieForm

  useEffect(() => {
    const error = Object.values(errors).find(({ message }) => message)
    if (error) toast.error(error.message)
  }, [errors])

  const handleSearch = useCallback(async (formValues: FindMovieFormData) => {
    const { name, type, status } = formValues
    const {
      data: { movies: moviesOptions },
    } = await api.get('/movies', {
      params: {
        name,
        type,
        status,
      },
    })

    if (!moviesOptions?.length) toast.error('Não foram encontrados titulos.')
    setMovies(moviesOptions)
  }, [])

  const handleCloseModal = useCallback(
    (open: boolean) => {
      if (!open) {
        reset()
        setMovies([])
      }
    },
    [reset],
  )

  return (
    <Dialog.Root onOpenChange={handleCloseModal}>
      <Dialog.Trigger asChild>
        <Button label="Encontrar Título" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Títulos</DialogTitle>
          <DialogDescription>
            Procure aqui o titulo que deseja editar
          </DialogDescription>
          <form onSubmit={handleSubmit(handleSearch)}>
            <FormProvider {...findMovieForm}>
              <InputsContainer>
                <TextInput
                  id="name"
                  label="Nome"
                  register={register('name')}
                  placeholder="Pesquisar por Nome"
                />
                <SelectInput
                  id="type"
                  label="Tipo"
                  placeholder="Pesquisar por Tipo"
                  register={register('type')}
                  options={movieTypeOptions}
                />
                <SelectInput
                  id="status"
                  label="Status"
                  placeholder="Pesquisar por Status"
                  register={register('status')}
                  options={movieStatusOptions}
                />
              </InputsContainer>
              <ButtonContainer>
                <Button label="Pesquisar" type="submit" />
              </ButtonContainer>
            </FormProvider>
          </form>
          <SearchedMovies moviesList={movies} selectMovie={selectMovie} />
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
