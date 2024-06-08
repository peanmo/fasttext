import { authOptions } from "@/auth-options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"


export default async function Page({ params }: { params: { type: string } }){

    const session = await getServerSession(authOptions)
    console.log(session)

    const sections = await prisma.section.findMany()
    console.log(sections)
   
    return (
        <div>
        จัดซื้อจัดจ้าง รับ {params.type}
        </div>
    )
    
}