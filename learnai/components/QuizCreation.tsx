'use client'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { quizCreationSchema } from '@/schemas/form/quiz'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { TbBook2, TbCheck } from "react-icons/tb";
import {useMutation} from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import LoadingQuestions from './LoadingQuestions'
import { toast } from 'sonner'



type Props = {}
type Input = z.infer<typeof quizCreationSchema>

const QuizCreation = (props: Props) => {
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const router = useRouter() //TODO: should i use link?
    const {mutate: getQuestions, isLoading} = useMutation({
        mutationFn: async ({amount, topic, type}: Input) => {
            
            const response = await axios.post('/api/game',{
                amount, 
                topic, 
                type
            })
            return response.data
        }
    })

    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 3,
            topic: '',
            type: 'closed'
        }
    })

    const onSubmit = (input: Input) => {
        setShowLoader(true);
        getQuestions({
            amount: input.amount,
            topic: input.topic,
            type: input.type,
        },{
            onSuccess: ({gameId})=>{
                setFinishedLoading(true);

                if (form.getValues('type') == 'closed'){
                    router.push(`/play/closed/${gameId}`)
                }else{
                    router.push(`/play/complete/${gameId}`)
                }
            },
            onError: (error) =>{
                setShowLoader(true);
                toast.error("Algo deu errado, tente novamente mais tarde.")
                console.log(error)
            }
        }
        )

    }

    form.watch();

    if (showLoader){ // ver como fazer isso aqui funcionar bem
        return <LoadingQuestions finished={finishedLoading}/>


    }

    return (


        <Card className='min-w-[330px] '>
            <CardHeader>
                <CardTitle className='text-2xl'>Novo Quiz</CardTitle>
                <CardDescription>Escolha um tópico</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form className="space-y-6">

                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tópico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o tópico..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Informe o topico do quiz.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de Perguntas</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Quantas perguntas?"
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                                form.setValue("amount", parseInt(e.target.value));
                                            }}
                                            min={1}
                                            max={10}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between lg:flex-row flex-col min-w-[250px] lg:min-w-[400px]">
                            <Button
                                variant={
                                    form.getValues("type") === "closed" ? "default" : "secondary"
                                }
                                className="lg:w-1/2 rounded-none rounded-t-lg lg:rounded-none lg:rounded-l-lg"
                                onClick={() => {
                                    form.setValue("type", "closed");
                                }}
                                type="button"
                            >
                                <TbCheck className=" w-4 h-4 mr-2" />Multipla Escolha
                            </Button>
                            <Separator orientation="vertical" />
                            <Button
                                variant={
                                    form.getValues("type") === "complete"
                                        ? "default"
                                        : "secondary"
                                }
                                className="lg:w-1/2 rounded-none rounded-b-lg lg:rounded-none lg:rounded-r-lg"
                                onClick={() => form.setValue("type", "complete")}
                                type="button"
                            >
                                <TbBook2 className=" w-4 h-4 mr-2 " />Completar Lacunas
                            </Button>
                        </div>
                    </form>
                </Form>


            </CardContent>
            <CardFooter>
                <Button 
                    type='submit' 
                    disabled={isLoading} 
                    onClick={form.handleSubmit(onSubmit)} 
                    className='w-full'>
                        Criar Quiz!
                    </Button>
            </CardFooter>


        </Card>





    )
}

export default QuizCreation