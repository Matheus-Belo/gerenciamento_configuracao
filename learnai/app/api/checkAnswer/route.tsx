import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import stringSimilarity from "string-similarity";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { questionId, userAnswer } = checkAnswerSchema.parse(body)
        const question = await prisma.question.findUnique({
            where: { id: questionId }
        })
        if (!question) {
            return NextResponse.json(
                {
                    error: 'Question not found'
                },
                {
                    status: 404
                }
            )
        }

        await prisma.question.update({
            where: { id: questionId },
            data: {
                userAnswer
            }
        })

        if (question.questionType === 'closed') {
            const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()

            await prisma.question.update({
                where: { id: questionId },
                data: {
                    isCorrect,
                }
            });
            return NextResponse.json(
                {
                    isCorrect
                },
                {
                    status: 200
                }
            )
        }else {

            // console.log(question.id)
            let percentageSimilar = stringSimilarity.compareTwoStrings(
              question.answer.toLowerCase().trim(),
              userAnswer.toLowerCase().trim()
            );
            percentageSimilar = Math.round(percentageSimilar * 100);
            await prisma.question.update({
              where: { id: questionId },
              data: { percentageCorrect: percentageSimilar },
            });
            return NextResponse.json({
              percentageSimilar,
            });
          }

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: error.issues
                },
                {
                    status: 400
                }
            )
        }
        console.log(error)
        return NextResponse.json(
            {
                error: 'Internal Server Error'
                
            },
            {
                status: 500
            }
        )
    }
}