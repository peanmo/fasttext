"use client"
import { Document, Status, NextStatus } from "@prisma/client"
import resetNextState from "./action"
export default function ResetState({documentId,currentStatus}:{documentId:string,currentStatus:Status}){
    return (
        <button onClick={()=>resetNextState(documentId,currentStatus)}>reset</button>
    )
}