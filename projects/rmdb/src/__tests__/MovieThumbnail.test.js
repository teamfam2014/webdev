import { MovieThumbnail } from '../MovieThumbnail'
import { render, screen } from '@testing-library/react'
import { nanoid } from 'nanoid'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { newMovie } from '../factories'

describe('MovieThumbnail', () => {
  it('should render movie information', () => {
    const movie = newMovie()
    render(
      <MemoryRouter>
        <MovieThumbnail movie={movie} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Movie Title')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', `/movies/${movie.id}`)
    expect(screen.getByAltText('Movie poster')).toHaveAttribute('src', movie.Poster)
  })

  it('should render children', () => {
    const movie = newMovie()
    render(
      <MemoryRouter>
        <MovieThumbnail movie={movie}>
          <p>Hello world</p>
        </MovieThumbnail>
      </MemoryRouter>,
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('should render buttons and pass movie back', () => {
    const movie = newMovie()
    const onAdd = jest.fn()
    const onEdit = jest.fn()
    const onRemove = jest.fn()
    render(
      <MemoryRouter>
        <MovieThumbnail movie={movie} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} />
      </MemoryRouter>,
    )
    expect(onAdd).not.toHaveBeenCalledWith(movie)
    expect(onEdit).not.toHaveBeenCalledWith(movie)
    expect(onRemove).not.toHaveBeenCalledWith(movie)

    userEvent.click(screen.getByText('+'))
    expect(onAdd).toHaveBeenCalledWith(movie)
    userEvent.click(screen.getByText('Edit'))
    expect(onEdit).toHaveBeenCalledWith(movie)
    userEvent.click(screen.getByText('Remove'))
    expect(onRemove).toHaveBeenCalledWith(movie)
  })
})
