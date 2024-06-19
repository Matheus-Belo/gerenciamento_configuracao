import QuizCreation from '@/components/QuizCreation';
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuizCreationPdf from '@/components/QuizCreationPdf';


type Props = {}

const QuizPage = async (props: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect('/')
    }
    return (
        <Tabs defaultValue="topic" className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value="topic">Tópico</TabsTrigger>
                <TabsTrigger value="pdf">PDF</TabsTrigger>
            </TabsList>
            <TabsContent value="topic">
                <QuizCreation />
            </TabsContent>
            <TabsContent value="pdf">
                <QuizCreationPdf/>
            </TabsContent>
        </Tabs>
    )
}

export default QuizPage