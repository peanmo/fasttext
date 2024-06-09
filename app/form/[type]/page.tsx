import { authOptions } from "@/auth-options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import FormDocument from "./form"


export default async function Page({ params }: { params: { type: string } }){
    
    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/api/auth/signin")
    }

    // const sections = await prisma.section.findMany()
    // console.log(sections)
   
    return (
        <div>
        จัดซื้อจัดจ้าง รับ {params.type}
        <FormDocument session={session} type={params.type} />
        </div>
    )
    
}