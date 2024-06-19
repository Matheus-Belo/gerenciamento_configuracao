import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/logo.png'
import SignInButton from './SignInButton'
import { getAuthSession } from '@/lib/nextauth'
import UserAccountMenu from './UserAccountMenu'
import { ThemeToggle } from './ThemeToggle'

type Props = {}

const NavBar = async (props: Props) => { //server component = roda no server uma vez e devolve o html

  const session = await getAuthSession();

  return (
    <div className='fixed inset-x-0 top-0 bg-background z-10 h-fit border-b  py-2'>
      <div className='flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl'>
        <Link href={"/"} className="flex items-center gap-2">
          
          <p className="rounded-lg flex items-center gap-2 text-primary px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px]">

            LearnAI
          </p>
        </Link>
        <div className='flex items-center gap-2'>
          <ThemeToggle/>
          {session?.user ? (
            <UserAccountMenu user = {session.user}/>
          ):(

            <SignInButton text='Entrar'/>
          )}

        </div>
        

      </div>

    </div>
  )
}

export default NavBar