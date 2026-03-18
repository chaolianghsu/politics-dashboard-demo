import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FakeRecaptcha from '@/components/FakeRecaptcha'

describe('FakeRecaptcha', () => {
  it('renders「我不是機器人」label', () => {
    render(<FakeRecaptcha onChange={() => {}} />)
    expect(screen.getByText('我不是機器人')).toBeInTheDocument()
  })

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(<FakeRecaptcha onChange={handleChange} />)

    await user.click(screen.getByText('我不是機器人'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('does not call onChange on second click', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(<FakeRecaptcha onChange={handleChange} />)

    await user.click(screen.getByText('我不是機器人'))
    await user.click(screen.getByText('我不是機器人'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
