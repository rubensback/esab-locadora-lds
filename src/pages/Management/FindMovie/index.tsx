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

const findMovieFormValidationSchema = zod
  .object({
    name: zod.string(),
    type: zod.string(),
  })
  .refine(({ name, type }) => !!name || !!type, {
    message: 'Por favor escolha um um método de pesquisa',
  })

type FindMovieFormData = zod.infer<typeof findMovieFormValidationSchema>

interface FindMovieProps {
  movieTypeOptions: IdAndName[]
  selectMovie: (movie: Movie) => void
}

export const FindMovie = ({
  movieTypeOptions,
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
    if (error) alert(error.message)
  }, [errors])

  const handleSearch = useCallback((formValues: FindMovieFormData) => {
    // request pesquisa
    const movieOptions: Movie[] = [
      {
        id: '1',
        name: 'Cabeça fria coração quente',
        status: '1',
        type: '1',
        days: 9,
        value: 48,
      },
      {
        id: '2',
        name: 'Rei leão',
        status: '2',
        type: '2',
        days: 31,
        value: 15,
      },
    ]

    setMovies(movieOptions)

    console.log(formValues)
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
