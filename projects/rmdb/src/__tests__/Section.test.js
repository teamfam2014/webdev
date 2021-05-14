import { Section } from '../Section'
import { render, screen } from '@testing-library/react'

describe('Section', () => {
  it('should render a title and subtitle', () => {
    render(<Section title="Test Testing" subtitle="Yay a test" />)
    expect(screen.getByText('Test Testing')).toBeInTheDocument()
    expect(screen.getByText('Yay a test')).toBeInTheDocument()
  })

  it('should render children', () => {
    render(
      <Section>
        <p>Hello world</p>
      </Section>,
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
