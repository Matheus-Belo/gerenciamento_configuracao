'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {TbBrain} from 'react-icons/tb'
import { TypographyMuted } from '../Typography'
import Link from 'next/link'
type Props = {}

const NewQuizCard = (props: Props) => {
  return (
    <Link href={'/quiz'}><Card className='hover: cursor-pointer hover:opacity-75'>
        <CardHeader className='flex flex-row items-center justify-between pb-3'>
            <CardTitle className='text-2xl font-bold'>Novo Quiz</CardTitle>
            <TbBrain size={30}/>
        </CardHeader>
        <CardContent>
          <TypographyMuted>Teste seus conhecimentos, Comece um Quiz agora</TypographyMuted>
        </CardContent>

    </Card></Link>
  )
}

export default NewQuizCard