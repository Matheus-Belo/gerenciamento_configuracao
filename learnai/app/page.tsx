import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignInButton from '@/components/SignInButton'
import {redirect} from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'


export default async function Home() {// TODO: fazer uma home mais bonita

  const session = await getAuthSession()
  if(session?.user){
    return redirect('/dashboard')
  }
  return (

    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao LearnAI</CardTitle>
          <CardDescription>Você precisa fazer login para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton provider='google' text='Entrar com google'/>
        </CardContent>

      </Card>


    </div>
  )
}
