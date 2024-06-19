import { Console } from "console";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface OutputFormat {
    [key: string]: string | string[] | OutputFormat;
}


export async function JsonGpt(
    system_prompt: string,
    user_prompt: string | string[],
    output_format: OutputFormat,
    temperature: number = 0.5,
    model: string = "gpt-3.5-turbo",
): Promise<{ question: string; answer: string; }[]> {



    try {
        const response = await openai.chat.completions.create({
            temperature: temperature,
            model: model,
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt.toString() },
            ],
            functions: [{ name: "set_question", parameters: output_format }],
            function_call: { name: "set_question" }
        })

        let res: string = response.choices[0].message?.function_call?.arguments ?? "";
        const questions = await JSON.parse(res);

        return questions.questions;

    } catch (error) {
        console.log(error)
    }



    return []

}