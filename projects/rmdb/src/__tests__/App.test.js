import { App } from '../App'
import { newMovie } from '../factories'
import axios from 'axios'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('axios')

describe('App', () => {
  const movie1 = newMovie({ Title: 'Movie 1' })
  const movie2 = newMovie({ Title: 'Movie 2' })
  const movie3 = newMovie({ Title: 'Movie 3' })

  it('should allow editing a movie', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [movie1, movie2, movie3] }))
    axios.put.mockImplementation((url, val) => Promise.resolve({ data: val }))

    render(<App />)

    expect(await screen.findByText('All Movies')).toBeInTheDocument()

    // click to edit movie 2
    await userEvent.click(getByText(screen.getByText('Movie 2'), 'Edit'))

    // edit the title of movie
    await userEvent.type(await screen.findByDisplayValue('Movie 2'), ' Edited')

    // click save
    await userEvent.click(screen.getByText('Save'))

    expect(await screen.findByText('Movie 2 Edited')).toBeInTheDocument()
    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:3001/movies/${movie2.id}`,
      { ...movie2, Title: 'Movie 2 Edited' },
    )
  })
})
