'use client'

import { useRouter } from "next/navigation"
import { deleteStatus } from "./action"

export default function DeleteStatus({statusId}:{statusId:string}){
    const router = useRouter()
    const handleDeleteStatus = async(statusId:string)=>{
        const result = await deleteStatus(statusId)
        console.log(result.message)
        if(result.err){
            return
        }
        router.refresh()
    }
    return(
        <button onClick={()=>handleDeleteStatus(statusId)}>ลบสถานะ</button>
    )
}