import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from 'axios'

export async function POST(req: Request, res: Response) {
    try {
        const session = await getAuthSession()

       
        if (!session?.user) {
            return NextResponse.json({
                error: 'Você precisa estar logado'
            },
                {
                    status: 401
                }
            )
        }

        const body = await req.json()
        const { amount, topic, type } = quizCreationSchema.parse(body)

        const game = await prisma.game.create({
            data: {
                gameType: type,
                timeStarted: new Date(),
                userId: session.user.id,
                topic
            }
        })

        const { data } = await axios.post(`${process.env.API_URL}/api/questions`, {
            amount,
            topic,
            type
        })
        if (type == 'closed') {
            type closedQuestion = {
                question: string,
                answer: string,
                option1: string,
                option2: string,
                option3: string,

            }
            let questions = data.questions.map((question: closedQuestion) => {

                let options = [question.answer, question.option1, question.option2, question.option3]
                options = options.sort(() => Math.random() - 0.5)
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: 'closed'
                }
            })
            await prisma.question.createMany({
                data: questions
            })
        } else if (type === 'complete') {
            type openQuestion = {
                question: string,
                answer: string
            }
            let questions = data.questions.map((question: openQuestion) => {

                return {
                    question: question.question,
                    answer: question.answer,
                    gameId: game.id,
                    questionType: 'complete'
                }
            })
            await prisma.question.createMany({
                data: questions
            })
        }

        return NextResponse.json({
            gameId: game.id
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({
                error: error.issues
            }, { status: 400 })
        }
        console.log(error)

        return NextResponse.json({
            error: "Erro interno no servidor"
           
        }, { status: 500 })
    }
}