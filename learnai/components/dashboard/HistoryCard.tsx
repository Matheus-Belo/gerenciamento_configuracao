'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {TbHistory} from 'react-icons/tb'
import { TypographyMuted } from '../Typography'
import Link from 'next/link'

type Props = {}

const HistoryCard = (props: Props) => {

    return (
        <Link href={'/history'}><Card className='hover: cursor-pointer hover:opacity-75'>
            <CardHeader className='flex flex-row items-center justify-between pb-3'>
                <CardTitle className='text-2xl font-bold'>Histórico</CardTitle>
                <TbHistory size={30} />
            </CardHeader>
            <CardContent>
                <TypographyMuted>Sua jornada até agora</TypographyMuted>
            </CardContent>
        </Card>
        </Link>
    )
}

export default HistoryCard