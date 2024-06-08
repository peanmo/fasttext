import prisma from "@/lib/prisma"
import UserManagement from "./users"

export default async function Page(){
    const sections = await prisma.section.findMany({
        select: {
            id: true,
            name: true,
            shortName: true
        }
    })
    return (
        <UserManagement sections={sections} />
    )
    
}