import type { Metadata } from 'next'
import './globals.css'
import { Poppins as FontSans } from "next/font/google"
import { cn } from '@/lib/utils'
import NavBar from '@/components/NavBar'
import Providers from '@/components/Providers'
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader';

export const fontSans = FontSans({
  weight: ['400'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'LearnAI',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={cn(fontSans.className, 'antialiased min-h-screen pt-16')}>
        <Providers>
          <NavBar />
          <NextTopLoader 
            color="green"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #green,0 0 5px #green"/>
          <Toaster richColors/>
          {children}
        </Providers>

      </body>
    </html>
  )
}