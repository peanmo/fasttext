'use server'

import { authOptions } from "@/auth-options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import {DocumentWithStatus} from "@/lib/types"

export async function searchDocs(formData:FormData) {
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect("/api/auth/session")
    }
    if(!['admin','checker'].includes(session.pea.role)){
        redirect("/")
    }
    const endDate = formData.get("endDate")?.toString()
    if(!endDate){
        return []
    }
    const startDate = formData.get("startDate")?.toString()
    if(!startDate){
        return []
    }
    const year = formData.get("year")?.toString()
    if(!startDate){
        return []
    }
    const type = formData.get("type")?.toString()
    const name = formData.get("name")?.toString()
    const startDocNo = formData.get("startDocNo")?.toString()
    const endDocNo = formData.get("endDocNo")?.toString()
    try{
        const docs:DocumentWithStatus[] = await prisma.document.findMany({
            where: {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                },
                type: type!='all'?type:undefined,
                docNo: {
                    gte: startDocNo?Number(startDocNo):undefined,
                    lte: endDocNo?Number(endDocNo):undefined
                },
                year,
                user : {
                    name: {
                        contains: name,
                        mode: 'insensitive' 
                    }
                }
            },
            select : {
                amount: true,
                date: true,
                docNo: true,
                year: true,
                id: true,
                name: true,
                type: true,
                status: {
                    select :{
                        name :true
                    },
                    orderBy : {
                        date : "desc"
                    }
                },
                user : {
                    select : {
                        name: true,
                        user: true
                    }
                }
            }
        })
        return docs
    }catch(e){
        console.log(e)
        return []
    }
}