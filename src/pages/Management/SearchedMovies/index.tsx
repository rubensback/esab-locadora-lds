import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './styles'
import { Movie } from '../../../utils'

interface SearchedMoviesProps {
  moviesList: Movie[]
  selectMovie: (movie: Movie) => void
}

export const SearchedMovies = ({
  moviesList,
  selectMovie,
}: SearchedMoviesProps) => {
  return (
    <DropdownMenu.Root open={!!moviesList?.length} modal={false}>
      <DropdownMenuContent>
        {moviesList.map((movie, idx) => (
          <>
            <Dialog.Close asChild>
              <DropdownMenuItem
                key={movie.id}
                onClick={() => selectMovie(movie)}
              >
                {movie.name}
              </DropdownMenuItem>
            </Dialog.Close>
            {idx !== moviesList.length - 1 && <DropdownMenuSeparator />}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu.Root>
  )
}
