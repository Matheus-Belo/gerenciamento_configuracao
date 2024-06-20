import { TypographyH2 } from '@/components/Typography';
import HistoryCard from '@/components/dashboard/HistoryCard';
import HotTopicsCard from '@/components/dashboard/HotTopicsCard';
import NewQuizCard from '@/components/dashboard/NewQuizCard';
import RecentActivitiesCard from '@/components/dashboard/RecentActiviesCard';
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export const metadata = {
    title: "Visão Geral | LearnAI",
    description: "Seu companheiro de estudos inteligente",
};

const Dashboard = async (props: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        redirect("/"); //isso acontece no server
    }
    return (
        <main className="p-8 mx-auto max-w-7xl">
            <div className="flex items-center">
               <TypographyH2> Dashboard </TypographyH2>
               
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2">
                <NewQuizCard/>
                <HistoryCard/>
 
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
                
                <RecentActivitiesCard/>

            </div>
        </main>
    )
}

export default Dashboard