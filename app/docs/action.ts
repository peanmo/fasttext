"use server"
import prisma from "@/lib/prisma";
import { setNextStatusState } from "@/lib/status-state"
import { Document, Status, NextStatus } from "@prisma/client"
export default async function resetNextState(documentId:string,currentStatus:Status) {
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
      });
    if(!document){
        return
    }
    await setNextStatusState(document,currentStatus)
}