import { authOptions } from "@/auth-options"
import {getServerSession} from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import Profile from "./profile"

export default async function Page(){
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect("/api/auth/signin")
    }
    return (
        <div>
            <Profile session={session}/>
        </div>
    )
}