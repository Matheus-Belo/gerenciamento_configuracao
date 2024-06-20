import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useTheme } from 'next-themes'
import { ThemeToggle } from './ThemeToggle'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('ThemeToggle', () => {
  const setTheme = jest.fn()

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      setTheme,
    })
  })

  test('renders toggle button with icons', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument()
  })

  test('opens dropdown menu on button click', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('System')).toBeInTheDocument()
  })

  test('sets theme to light', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Light'))
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  test('sets theme to dark', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Dark'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  test('sets theme to system', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('System'))
    expect(setTheme).toHaveBeenCalledWith('system')
  })
})