import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

it('First commit', async () => {
  render(<App />)
  const loading = screen.getByText('loading', { exact: false })
  expect(loading).toBeInTheDocument()

  const helloText = await screen.findByText('hello')
  expect(helloText).toBeInTheDocument()
})
