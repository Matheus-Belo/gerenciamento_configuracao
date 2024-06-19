import {z} from 'zod';

export const quizCreationSchema = z.object({
    topic: z.string().min(3, {message: 'O Topico precisa ter pelo menos 3 caracteres'}).max(50),
    type: z.enum(['closed', 'complete']),
    amount: z.number().min(1, {message: 'O Quiz deve ter pelo menos 1 pergunta'}).max(10, {message: 'O Quiz deve ter no máximo 10 perguntas'}),
})

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string()
})