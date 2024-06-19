'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from 'react-query'


type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: Props) => {


  return (//query?, Session?
    <QueryClientProvider client={queryClient}> 


      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers