'use client'
import { Game, Question } from '@prisma/client'
import { useCallback, useMemo, useState } from 'react'
import { TypographyH3, TypographyH4, TypographyLead, TypographyMuted } from './Typography'
import { TbChevronRight } from "react-icons/tb";

import { Badge } from './ui/badge'
import { TbHourglassHigh } from "react-icons/tb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import CompleteScoreboard from './CompleteScoreboard';
import { useMutation } from 'react-query';
import { checkAnswerSchema } from '@/schemas/form/quiz';
import axios from 'axios';
import { z } from 'zod';
import { toast } from 'sonner';

type Props = {
    game: Game & { questions: Pick<Question, 'id' | 'options' | 'question'>[] }
}

const Complete = ({ game }: Props) => {


    const [questionIndex, setQuestionIndex] = useState(0);
    const [selected, setSelected] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [wrong, setWrong] = useState(0)



    const currentQuestion = useMemo(() => {
        return game.questions[questionIndex]
    }, [questionIndex, game.questions])

    const options = useMemo(() => {
        if (!currentQuestion || !currentQuestion.options) {
            return [];
        }


        try {


            let parsedOptions = JSON.parse(currentQuestion.options);


            if (Array.isArray(parsedOptions)) {
                return parsedOptions;
            } else {
                console.log("not an array:", parsedOptions);
            }
        } catch (e) {
            console.error("Double parsing error:", e);
        }
        return [];
    }, [currentQuestion]);

    const {mutate: checkAnswer, isLoading: isChecking} = useMutation({
        mutationFn: async () =>{
            const payload: z.infer<typeof checkAnswerSchema> ={
                questionId: currentQuestion.id,
                userAnswer: options[selected]
            }
            const res = await axios.post('/api/checkAnswer', payload) 
            return res.data
        }
    })

    const handleNext = useCallback(()=>{ //memoizing a function trough states
        checkAnswer(undefined, {
            onSuccess: ({isCorrect}) =>{
                if(isCorrect){
                    toast.success('Resposta correta')
                    setCorrect((prev) => prev+1)
                }else{
                    toast.error('Resposta incorreta')
                    setWrong((prev) => prev+1)
                }

                setQuestionIndex((prev) => prev+1)
                
            }
        } )
    },[checkAnswer,toast])
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
            <div className="flex flex-row justify-between mb-2">

                {/* {topico} */}
                <div className=''>
                    <div className='flex items-center gap-2'>
                        <TypographyMuted>Topico</TypographyMuted>
                        <Badge>{game.topic}</Badge>
                    </div>

                    <div className="flex mt-3 text-muted-foreground">
                        <TbHourglassHigh className="mr-2 my-auto" />
                        00:00
                    </div>

                </div>



                <CompleteScoreboard correct={correct} wrong={wrong} />


            </div>

            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center'>

                        <div className='mr-5'>
                            <div className='mb-1.5'>
                                {questionIndex + 1}
                            </div>

                            <div className='text-muted-foreground'>
                                {game.questions.length}

                            </div>

                        </div>


                        <TypographyLead>{currentQuestion.question}</TypographyLead>

                    </CardTitle>


                </CardHeader>

            </Card>

            <div className='flex flex-col items-center justify-center w-full mt-4'>
                {options.map((option, index) => {
                    return (
                        <Button
                            onClick={() => {
                                setSelected(index)
                            }}
                            className='justify-start w-full mb-4 py-7 overflow-hidden'
                            variant={selected === index ? 'default' : 'outline'}
                            key={index}
                        >
                            <div className="flex items-center justify-start">
                                <div className='p-2 px-3 mr-5 font-bold'>
                                    {index + 1}
                                </div>
                                <div className='text-start'>
                                    {option}
                                </div>
                            </div>
                        </Button>
                    )
                }
                )}

                <Button onClick={handleNext} disabled={isChecking}>
                    Next
                    <TbChevronRight className="ml-2 h-4 w-4" />

                </Button>
            </div>
        </div>
    )
}

export default Complete