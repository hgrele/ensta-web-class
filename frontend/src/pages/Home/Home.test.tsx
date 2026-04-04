import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Home from './Home'

vi.mock('../../hooks/useFetchMovies', () => ({
  useFetchMovies: () => ({
    movies: [
      {
        id: 1,
        title: 'Inception',
        release_date: '2010-07-16',
        poster_path: '/inception.jpg',
      },
      {
        id: 2,
        title: 'The Matrix',
        release_date: '1999-03-31',
        poster_path: '/matrix.jpg',
      },
      {
        id: 3,
        title: 'Interstellar',
        release_date: '2014-11-07',
        poster_path: '/interstellar.jpg',
      },
    ],
  }),
}))

describe('Home - search bar', () => {
  it('displays filtered movies when user types in the search bar', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Search movies...')
    await user.type(searchInput, 'Matrix')

    expect(screen.getByText('The Matrix')).toBeInTheDocument()
    expect(screen.queryByText('Inception')).not.toBeInTheDocument()
    expect(screen.queryByText('Interstellar')).not.toBeInTheDocument()
  })

  it('displays a message when there is no movie matching the text in the search bar', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Search movies...')
    await user.type(searchInput, 'xyznonexistent')

    expect(screen.getByText('No movies found.')).toBeInTheDocument()
  })

  it('displays Home', () => {
    render(<Home />)
    expect(screen.getByText('Popular Movies.')).toBeInTheDocument()
  })
})
