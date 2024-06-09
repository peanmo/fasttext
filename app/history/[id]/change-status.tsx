"use client"

import { ChangeStatus } from "@/lib/status-state"
import { ChangeEvent } from "react"
import { changeStatus } from "./action"
import { useRouter } from "next/navigation"

export default function ChangeStatus({nextStatuses,documentId}:{nextStatuses:ChangeStatus[],documentId:string}){

    const router = useRouter()

    const handleChange = async (e:ChangeEvent<HTMLSelectElement>) => {
        const result = await changeStatus(e.target.value,documentId)
        if(result.err){
            window.alert(result.message)
            return
        }
        router.refresh()
    }
    return (
        <div className="flex flex-row gap-3">
            {nextStatuses.length != 0 && (
                <>
                    <label htmlFor="status">เปลี่ยนสถานะของเอกสาร : </label>
                    <select name="status" value="" onChange={handleChange}>
                        <option value="">โปรดเลือก.... </option>
                        {nextStatuses.map((val,i)=>{
                            return (
                                <option key={i} value={val.name}>{val.name}</option>
                            )
                        })}
                    </select>
                </>
            )}
        </div>
    )
}