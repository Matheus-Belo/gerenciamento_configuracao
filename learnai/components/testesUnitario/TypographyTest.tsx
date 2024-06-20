// Typography.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from './Typography'

describe('Typography components', () => {
  test('TypographyH1 renders correctly', () => {
    render(<TypographyH1>Heading 1</TypographyH1>)
    expect(screen.getByText('Heading 1')).toBeInTheDocument()
    expect(screen.getByText('Heading 1')).toHaveClass('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl')
  })

  test('TypographyH2 renders correctly', () => {
    render(<TypographyH2>Heading 2</TypographyH2>)
    expect(screen.getByText('Heading 2')).toBeInTheDocument()
    expect(screen.getByText('Heading 2')).toHaveClass('scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0')
  })

  test('TypographyH3 renders correctly', () => {
    render(<TypographyH3>Heading 3</TypographyH3>)
    expect(screen.getByText('Heading 3')).toBeInTheDocument()
    expect(screen.getByText('Heading 3')).toHaveClass('scroll-m-20 text-2xl font-semibold tracking-tight')
  })

  test('TypographyH4 renders correctly', () => {
    render(<TypographyH4>Heading 4</TypographyH4>)
    expect(screen.getByText('Heading 4')).toBeInTheDocument()
    expect(screen.getByText('Heading 4')).toHaveClass('scroll-m-20 text-xl font-semibold tracking-tight')
  })

  test('TypographyP renders correctly', () => {
    render(<TypographyP>Paragraph</TypographyP>)
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toHaveClass('leading-7 [&:not(:first-child)]:mt-6')
  })

  test('TypographyBlockquote renders correctly', () => {
    render(<TypographyBlockquote>Blockquote</TypographyBlockquote>)
    expect(screen.getByText('Blockquote')).toBeInTheDocument()
    expect(screen.getByText('Blockquote')).toHaveClass('mt-6 border-l-2 pl-6 italic')
  })

  test('TypographyInlineCode renders correctly', () => {
    render(<TypographyInlineCode>Inline Code</TypographyInlineCode>)
    expect(screen.getByText('Inline Code')).toBeInTheDocument()
    expect(screen.getByText('Inline Code')).toHaveClass('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold')
  })

  test('TypographyLead renders correctly', () => {
    render(<TypographyLead>Lead Text</TypographyLead>)
    expect(screen.getByText('Lead Text')).toBeInTheDocument()
    expect(screen.getByText('Lead Text')).toHaveClass('text-xl text-muted-foreground')
  })

  test('TypographyLarge renders correctly', () => {
    render(<TypographyLarge>Large Text</TypographyLarge>)
    expect(screen.getByText('Large Text')).toBeInTheDocument()
    expect(screen.getByText('Large Text')).toHaveClass('text-lg font-semibold')
  })

  test('TypographySmall renders correctly', () => {
    render(<TypographySmall>Small Text</TypographySmall>)
    expect(screen.getByText('Small Text')).toBeInTheDocument()
    expect(screen.getByText('Small Text')).toHaveClass('text-sm font-medium leading-none')
  })

  test('TypographyMuted renders correctly', () => {
    render(<TypographyMuted>Muted Text</TypographyMuted>)
    expect(screen.getByText('Muted Text')).toBeInTheDocument()
    expect(screen.getByText('Muted Text')).toHaveClass('text-sm text-muted-foreground')
  })
})
