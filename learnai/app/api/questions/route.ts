import { NextResponse } from "next/server"
import { quizCreationSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { JsonGpt } from "@/lib/openai";
import { getAuthSession } from "@/lib/nextauth";

export const POST = async (req: Request, res: Response) => {


    //try catch for if the parsing fails
    try {
        // TODO: autenticacao nao funciona de uma rota pra outra...
        //
        //
        // const session = await getAuthSession()
        // if(!session?.user){
        //     return NextResponse.json(
        //         {
        //             error: 'Voce precisa estar logado para fazer um quiz'
        //         },
        //         {
        //             status: 401
        //         }
        //     )
        // }
        //
        //parse with zod. 
        const body = await req.json();
        const { amount, topic, type } = quizCreationSchema.parse(body)
        let questions: any
        let schema: any

        if (type === 'complete') {
            schema = {
                "type": "object",
                "properties": {
                    "questions": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question": {
                                    "type": "string",
                                    "description": "challenging open-ended question about the given topic"
                                },
                                "answer": {
                                    "type": "string",
                                    "description": "correct answer for your question with max lenght of 15 words"
                                },
                            }
                        }
                    }

                }
            }

            questions = await JsonGpt(
                'You are an advanced AI skilled in creating complex and intellectually stimulating questions and answers. Each answer should be concise, not exceeding 15 words. The questions and answers should be in Brazilian Portuguese. Compile all pairs in a JSON array.',
                `You are to generate sets of intricate and challenging open-ended questions about ${topic}. The total number of question-and-answer pairs should be ${amount}.`,
                schema
            )
        }
        else if (type === 'closed') {

            schema = {
                "type": "object",
                "properties": {
                    "questions": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question": {
                                    "type": "string",
                                    "description": "challenging mcq question about the given topic"
                                },
                                "answer": {
                                    "type": "string",
                                    "description": "correct answer for your question with max lenght of 15 words"
                                },
                                "option1": {
                                    "type": "string",
                                    "description": "option1 with max lenght of 15 words"
                                },
                                "option2": {
                                    "type": "string",
                                    "description": "option2 with max lenght of 15 words"
                                },
                                "option3": {
                                    "type": "string",
                                    "description": "option3 with max lenght of 15 words"
                                },

                            }
                        }
                    }

                }
            }

            questions = await JsonGpt(
                'You are an AI that is able to generate MCQ questions and answers, the length of each answer should not exceed 15 words. The questions and answers should be generated in Brazilian Portuguese. Store all questions and their answer options in a JSON array.',
                `Your task is to create a set of challenging and advanced MCQs about ${topic}, requiring deep knowledge and analysis. Number of questions: ${amount}.`,
                schema
                // emphasizing critical thinking and complex concepts (?in the prompt?)
                // TODO TESTAR PROMPTS DIFERENTES
                
            )
        }


        return NextResponse.json({
            questions
        }, {
            status: 200
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({

                error: error.issues
            },
                {
                    status: 400
                })
        }

    }

}