'use client'

import { dateInputFormat } from "@/lib/date-format"
import { allTypeDoc, typeMapping } from "@/lib/doctype-map"
import { Status, User, Document } from "@prisma/client"
import { useMemo } from "react"
import { useFormState } from "react-dom"
import { searchDocumentsWithStatus } from "./action"

type DocumentWithStatus = Pick<Document,"amount"|"date"|"docNo"|"year"|"id"|"name"|"type"> & {status : (Pick<Status,"name">)[]} & {user: Pick<User,"name"|"user">}

const initailDocs:DocumentWithStatus[] = [] 

export default function SearchDocs(){
    const [docs,searchDocs] = useFormState(searchDocumentsWithStatus ,initailDocs)
    const defaultDate = useMemo(()=>{
        const end = new Date()
        const start = new Date(end)
        start.setDate(end.getDate() - 30)
        const year = end.getFullYear()+543
        return {end: dateInputFormat(end), start: dateInputFormat(start), year: year.toString()}
    },[])
    return (
        <div className="p-3">
            <form action={searchDocs} className="flex flex-col gap-1">
                <p>วันที่สร้าง</p>
                <label htmlFor="startDate">เริ่มต้น</label>
                <input name="startDate" type="date" defaultValue={defaultDate.start}/>
                <label htmlFor="endDate">สิ้นสุด</label>
                <input name="endDate" type="date" defaultValue={defaultDate.end}/>
                <label htmlFor="name">ชื่อพนักงาน</label>
                <input name="name" type="text"/>
                <label htmlFor="type">ประเภทเอกสาร</label>
                <select name="type" defaultValue="all">
                    <option value="all">ทั้งหมด</option>
                    {allTypeDoc.map((val,i)=>{
                        return (
                            <option key={i} value={val}>{typeMapping.get(val) || val}</option>
                        )
                    })}
                </select>
                <p>เลขที่เอกสาร</p>
                <label htmlFor="startDocNo">เริ่มต้น</label>
                <input name="startDocNo" defaultValue="1" type="number"/>
                <label htmlFor="endDocNo">สิ้นสุด</label>
                <input name="endDocNo" type="number"/>
                <label htmlFor="year">ปี</label>
                <input name="year" type="number" defaultValue={defaultDate.year}/>
                <button type="submit">ค้นหา้</button>
            </form>
        </div>
    )
}