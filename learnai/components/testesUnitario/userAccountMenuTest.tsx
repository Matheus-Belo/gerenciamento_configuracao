import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserAccountMenu from './UserAccountMenu'
import { signOut } from 'next-auth/react'

jest.mock('next-auth/react', () => ({
    signOut: jest.fn(),
}))

jest.mock('next/link', () => {
    return ({ children, href }) => <a href={href}>{children}</a>;
});

describe('UserAccountMenu', () => {
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://example.com/avatar.jpg',
    }

    test('renders user information correctly', () => {
        render(<UserAccountMenu user={user} />)
        expect(screen.getByRole('img')).toHaveAttribute('src', user.image)
        expect(screen.getByText(user.name)).toBeInTheDocument()
        expect(screen.getByText(user.email)).toBeInTheDocument()
    })

    test('renders fallback avatar when image is not provided', () => {
        render(<UserAccountMenu user={{ ...user, image: null }} />)
        expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
    })

    test('dropdown menu items work correctly', () => {
        render(<UserAccountMenu user={user} />)
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByText('Visão Geral')).toBeInTheDocument()
        expect(screen.getByText('Perfil')).toBeInTheDocument()
        fireEvent.click(screen.getByText('Sair'))
        expect(signOut).toHaveBeenCalled()
    })
})