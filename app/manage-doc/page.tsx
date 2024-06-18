import { authOptions } from "@/auth-options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import DocumentTable from "../component/docs-table"
import SearchDocs from "./search-docs"

export default async function Page(){
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect("/api/auth/signin")
    }
    const docs = await prisma.document.findMany({
        select: {
            amount: true,
            date: true,
            docNo: true,
            year: true,
            id: true,
            name: true,
            type: true,
            status: {
                select: {
                    name: true
                },
                orderBy: {
                    date: "desc"
                }
            },
            user: {
                select: {
                    name: true,
                    user: true
                }
            }
        }
    })
    return (
        <div className="flex flex-col gap-3 p-3">
            <p>จัดการเอกสาร</p>
            <p>ค้นหาเอกสาร</p>
            <SearchDocs/>
            <DocumentTable documentsWithStatus={docs} session={session}/>
        </div>
    )
} 