'use client'
import React from 'react'
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




type Props = {}
type Input = z.infer<typeof quizCreationSchema>

const QuizCreationPdf = (props: Props) => {
    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 5,
            topic: '',
            type: 'closed'
        }
    })

    const onSubmit = (input: Input) => {
        console.log(input)

    }

    form.watch();

    return (


        <Card>
            <CardHeader>
                <CardTitle className='text-2xl'>Novo Quiz</CardTitle>
                <CardDescription>Faça o upload de um arquivo</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form className="space-y-6">

                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Arquivo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Faça upload de um arquivo..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        EM BREVE...
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
                <Button type='submit' onClick={form.handleSubmit(onSubmit)} className='w-full'>Criar Quiz!</Button>
            </CardFooter>


        </Card>





    )
}

export default QuizCreationPdf