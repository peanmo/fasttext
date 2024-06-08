import prisma from "@/lib/prisma"
import SectionsManager from "./sections"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth-options"
import { redirect } from 'next/navigation'

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
        }
    })
    return (
        <SectionsManager sections={sections} />
    )
    
}