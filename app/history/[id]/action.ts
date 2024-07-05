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

    if(!['admin','checker'].includes(session.pea.role)){
        return {
            err: true,
            message: "คุณไม่มีสิทธิ์ในการเปลี่ยนแปลงสถานะเอกสาร"
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
        await prisma.$disconnect()
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

export async function deleteStatus(statusId:string) {
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect ("/api/auth/signin")
    }

    if(!['admin','checker'].includes(session.pea.role)){
        return {
            err: true,
            message: "คุณไม่มีสิทธิ์ในการเปลี่ยนแปลงสถานะเอกสาร"
        }
    }
    const findStatus = await prisma.status.findFirst({
        where: {
            id: statusId
        }
    })
    if(!findStatus || findStatus.name == "รอเอกสารต้นฉบับ"){
        return {
            err: true,
            message: "ไม่สามารถลบสถานะ 'รอเอกสารต้นฉบับได้' หรือหาสถานะนี้ของเอกสารนี้ไม่เจอ"
        }
    }
    const resultDelete = await prisma.status.delete({
        where: {
            id: statusId
        }
    })
    await prisma.$disconnect()
    return {
        err: false,
        message: "ลบสถานะนี้สำเร็จ"
    }
    
}