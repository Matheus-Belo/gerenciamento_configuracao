import React from 'react'
import { Card } from './ui/card'
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import { Separator } from './ui/separator';
import { TypographyLead, TypographyP, TypographySmall } from './Typography';


type Props = {
    correct: number
    wrong: number
}

const CompleteScoreboard = ({correct, wrong}: Props) => {
  return (
    <Card className='flex flex-row items-center justify-center p-2 gap-1'>
        <TbCircleCheck size={30} color={'green'}/>
        <span className='text-xl font-bold text-[green]'>{correct}</span>
        <Separator className='mx-2' orientation='vertical'/>
        <span className='text-xl font-bold text-[red]'>{wrong}</span>
        <TbCircleX size={30} color={'red'}/>
        


    </Card>
  )
}

export default CompleteScoreboard