import { authOptions } from "@/auth-options"
import prisma from "@/lib/prisma"
import { nextStatusList } from "@/lib/status-state"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ChangeStatus from "./change-status"

async function getDocument(id: string){
    const document = await prisma.document.findFirst({
        where: {
            id
        },
        select: {
            status : {
                orderBy: {
                    date: "desc"
                },
                select : {
                    id: true,
                    name: true,
                    date: true,
                    note: true,
                    updatedByUser: {
                        select : {
                            name: true
                        }
                    }
                }
            },
            id: true,
            docNo: true,
            type: true,
            name: true,
            amount: true,
            note: true,
            fromSection: true,
            user: {
                select : {
                    name: true,
                }
            }
        }
    })
    return document
}

export default async function Page({ params }: { params: { id: string } }){
    
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect("/")
    }

    try {
        const document = await getDocument(params.id)
        if(!document || !document.status || document.status.length == 0){
            return (
                <div>ไม่พบเอกสาร</div>
            )
        }
        const nextStatuses = nextStatusList(document.status[0].name,session.pea.role)
        return (
            <div className="flex flex-col gap-1 p-3">
                <span>{document.docNo}</span>
                <span>{document.type}</span>
                <span>{document.user.name}</span>
                <span>{document.name}</span>
                <span>{document.fromSection.name}</span>
                <span>{document.amount}</span>
                <span>{document.note}</span>
                <ChangeStatus nextStatuses={nextStatuses} documentId={params.id}/>
                {document.status.map((val,i)=>{
                    return (
                        <div key={i} className="flex flex-row gap-3">
                            <span> ๐ </span>
                            <span>{val.date.toDateString()}</span>
                            <span>{val.name}</span>
                            <span>{val.note}</span>
                            <span>{val.updatedByUser.name}</span>
                        </div>
                    )
                })}
            </div>
        )

    } catch(e){
        return (
            <div>ไม่พบเอกสาร</div>
        )
    }
}