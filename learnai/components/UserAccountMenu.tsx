'use client'
import React from 'react'
import { User } from 'next-auth'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import {signOut} from "next-auth/react"


import {LuUser2 as UserIcon, LuLogOut as LogOut} from 'react-icons/lu'





type Props = {
    user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountMenu = ({ user }: Props) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {user.image ? (<AvatarImage src={user.image} />):<AvatarFallback><UserIcon  /></AvatarFallback> }
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <div className=' flex items-center justify-start gap-2 p-2'>
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        )}
                    </div>

                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href={'/'}>Visão Geral</Link></DropdownMenuItem>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault();
                        signOut().catch(console.error);
                    }}>Sair <LogOut className="w-4 h-4 ml-2 " /></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserAccountMenu