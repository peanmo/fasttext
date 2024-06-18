"use client"

import { dateFormat } from "@/lib/date-format"
import { Status,Document, User } from "@prisma/client"
import { Session } from "next-auth"
import Link from "next/link"

type DocumentWithStatus = Pick<Document,"amount"|"date"|"docNo"|"year"|"id"|"name"|"type"> 
& {status : (Pick<Status,"name">)[]} 
& {user: Pick<User,"name"|"user">}

export default function DocumentTable({documentsWithStatus,session}:{documentsWithStatus:DocumentWithStatus[],session:Session }){
    return (
        <div className="p-3">
            {documentsWithStatus.map((val)=>{
                return (
                    <div key={val.id} className="flex flex-row flex-wrap gap-x-3">
                        <span>เลขที่เอกสาร : {`${val.docNo}/${val.year}`}</span>
                        <span>วันที่ : {dateFormat(val.date)}</span>
                        <span>ประเภทเอกสาร : {val.type}</span>
                        <span>ชื่อเอกสาร : {val.name}</span>
                        <span>จำนวนเงิน : {val.amount}</span>
                        <span>เจ้าของเอกสาร : {val.user.name}</span>
                        <span>สถานะปัจจุบัน : {val.status.length != 0 && val.status[0].name}</span>
                        <Link href={`/history/${val.id}`}>{session.pea && ['admin','checker'].includes(session.pea.role)&&"จัดการ/" }ดูประวัติ เอกสาร</Link>
                        {val.status.length != 0 && val.status[0].name == "เอกสารส่งคืน/ตีกลับ" && session.pea?.user == val.user.user && <Link href={"#"}>แก้ไขเอกสาร</Link>}
                    </div>
                )
            })}
        </div>
    )
}