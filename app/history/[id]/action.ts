"use server"

import { authOptions } from "@/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { allStatusList, setNextStatusState } from "@/lib/status-state"
import prisma from "@/lib/prisma"



export async function changeStatus(statusName: string, documentId:string) {
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect ("/api/auth/signin")
    }

    

    try{
        const find = await prisma.nextStatus.findFirst({
            where: {
                documentId,
                name: statusName,
            }
        })
        if(!find){
            return {
                err: true,
                message: `สถานะ ${statusName} ไม่เป็นไปตาม Flow ขั้นตอน`
            }
        }
        if(!(find.role == session.pea.role || find.userId == session.pea.id)){
            return {
                err: true,
                message: `คุณไม่มีสิทธิ์ในการเปลี่ยนสถานะนี้`
            }
        }

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
                nextStatus: true,
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
        await setNextStatusState(document,status)
        return {
            err: false,
            message: "เปลี่ยนสถานะสำเร็จ"
        }
        
    }catch(e){
        return {
            err: true,
            message: "เกิดข้อผิดพลาดจาก server"
        }
    }
}