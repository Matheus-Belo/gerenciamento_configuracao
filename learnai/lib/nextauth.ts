import { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth"

declare module "next-auth"{
    interface Session extends DefaultSession{
        user: {
            id: string;
        } & DefaultSession['user']
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        id: string
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        jwt: async  ({token}) => {
            const db_user = await prisma.user.findFirst({
                where: {
                    email: token?.email
                }
            })
            if(db_user){// colocar o id do user no token ao autenticar
                token.id = db_user.id
            }
            return token
        },
        session: ({session, token}) =>{
            if(token){ // ligar informacoes do token com a sessao do usuario
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ]
}

export const getAuthSession = () =>{
    return getServerSession(authOptions)
}