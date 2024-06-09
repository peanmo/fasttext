"use server"

import { authOptions } from "@/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { allStatusList } from "@/lib/status-state"
import prisma from "@/lib/prisma"

export async function changeStatus(statusName: string, documentId:string) {
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect ("/api/auth/signin")
    }

    const findStatus = allStatusList.find(o => o.name == statusName)
    if(!findStatus){
        return {
            err: true,
            message: "ไม่พบสถานะดังกล่าว"
        }
    }

    if(!findStatus.roles.includes(session.pea.role)){
        return {
            err: true,
            message: "คุณไม่สามารถเปลี่ยนสถานะของเอกสารนี้ได้"
        }
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