import prisma from "@/lib/prisma"
import UserManagement from "./users"
import { authOptions } from "@/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Page(){
    const session = await getServerSession(authOptions)
    if(session?.pea?.role != "admin"){
        redirect("/")
    }
    const sections = await prisma.section.findMany({
        select: {
            id: true,
            name: true,
            shortName: true
        },
        where: {
            name: {
                not: "admin"
            }
        }
    })

    const users = await prisma.user.findMany({
        select : {
            id: true,
            user: true,
            name: true,
            suspend: true,
            role: true
        }
    })
    return (
        <UserManagement sections={sections} users={users} />
    )
    
}