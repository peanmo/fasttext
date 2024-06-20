'use client'

import { dateInputFormat } from "@/lib/date-format"
import { allTypeDoc, typeMapping } from "@/lib/doctype-map"
import { Status, User, Document } from "@prisma/client"
import { useMemo } from "react"
import { useFormState } from "react-dom"

type DocumentWithStatus = Pick<Document,"amount"|"date"|"docNo"|"year"|"id"|"name"|"type"> & {status : (Pick<Status,"name">)[]} & {user: Pick<User,"name"|"user">}

const initailDocs:DocumentWithStatus[] = [] 

export default function SearchDocs(){
    const defaultDate = useMemo(()=>{
        const end = new Date()
        const start = new Date(end)
        start.setDate(end.getDate() - 30)
        const year = end.getFullYear()+543
        return {end: dateInputFormat(end), start: dateInputFormat(start), year: year.toString()}
    },[])
    return (
        <div className="p-3">
            <form action={(e)=>{}} className="flex flex-col gap-1">
                <p>วันที่สร้าง</p>
                <label htmlFor="startDate">เริ่มต้น</label>
                <input name="startDate" type="date" defaultValue={defaultDate.start}/>
                <label htmlFor="endDate">สิ้นสุด</label>
                <input name="endDate" defaultValue={defaultDate.end} type="date"/>
                <label htmlFor="type">ประเภทเอกสาร</label>
                <select name="type" defaultValue="all">
                    <option value="all">ทั้งหมด</option>
                    {allTypeDoc.map((val,i)=>{
                        return (
                            <option key={i} value={val}>{typeMapping.get(val) || val}</option>
                        )
                    })}
                </select>
            </form>
        </div>
    )
}