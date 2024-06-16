"use server"

import { authOptions } from "@/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"



export async function changeStatus(statusName: string, documentId:string) {
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect ("/api/auth/signin")
    }

    

    try{

        const status = await prisma.status.create({
            data : {
                name: statusName,
                date: new Date(),
                documentId,
                updatedByUserId: session.pea.id
            }
        })
        const document = await prisma.document.findFirst({
            where: {
                id: documentId
            },
            select: {
                status:true,
                id: true,
                docNo: true
              }
        })
        if(!document){
            return {
                err: true,
                message: "ไม่พบเอกสารของคุณในฐานข้อมูล"
            }
        }
        
    }catch(e){
        return {
            err: true,
            message: "เกิดข้อผิดพลาดจาก server"
        }
    }
}