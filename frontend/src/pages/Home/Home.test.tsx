import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'

import Home from './Home'

// mock the return function in the test file
vi.mock('../../hooks/useFetchMovies', () => ({
  useFetchMovies: () => ({
    movies: [
      { title: 'Inception', poster_path: '/inception.jpg' },
      { title: 'Film A', poster_path: '/film_a.jpg' },
      { title: 'Film B', poster_path: '/film_b.jpg' },
    ],
    isLoading: false,
    error: null,
  }),
}))

it('displays Home title with Popular Movies', () => {
  render(<Home />)
  expect(screen.getByText('Popular Movies')).toBeInTheDocument()
})

it('displays all movies when search bar is empty', () => {
  render(<Home />)
  expect(screen.getByText('Inception')).toBeInTheDocument()
  expect(screen.getByText('Film A')).toBeInTheDocument()
  expect(screen.getByText('Film B')).toBeInTheDocument()
})

it('displays filtered movies when user types in the research bar', async () => {
  const user = userEvent.setup()
  render(<Home />)

  const searchBar = screen.getByPlaceholderText('Search movies...')
  await user.type(searchBar, 'Film')

  expect(screen.queryByText('Inception')).not.toBeInTheDocument()
  expect(screen.getByText('Film A')).toBeInTheDocument()
  expect(screen.getByText('Film B')).toBeInTheDocument()
})

it('doesnt display any movie when there arent compatible movies', async () => {
  const user = userEvent.setup()
  render(<Home />)

  const searchBar = screen.getByPlaceholderText('Search movies...')
  await user.type(searchBar, 'XXX')

  expect(screen.queryByText('Inception')).not.toBeInTheDocument()
  expect(screen.queryByText('Film A')).not.toBeInTheDocument()
  expect(screen.queryByText('Film B')).not.toBeInTheDocument()
})
