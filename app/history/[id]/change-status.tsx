'use client'

import { changeStatus } from "./action";
import { useRouter } from "next/navigation"

type DocwithStatus = {
    status: {
        name: string;
        note: string;
        date: Date;
        id: string;
        updatedByUser: {
            name: string;
        };
    }[];
    name: string;
    type: string;
    note: string;
    user: {
        name: string;
    };
    id: string;
    docNo: number;
    year: string;
    amount: number;
    fromSection: {
        name: string;
        shortName:string
    };
  }

export default function ChangeStatus({documentId,nextStatus}:{documentId:string,nextStatus:string[]}){
    const router = useRouter()
    const handleChangeStatus = async (status:string,id:string)=>{
        if(status == ""){
            return
        }
        const result = await changeStatus(status,id)
        console.log(result.message)
        if(result.err){
            return
        }
        router.refresh()
    }
    return (
        <label htmlFor="status" className="flex flex-col gap-1">
            เปลี่ยนสถานะเอกสาร
            <select name="status" value="" onChange={(e)=>handleChangeStatus(e.target.value,documentId)} >
                <option value="">โปรดเลือก....</option>
                {nextStatus.map((val,i)=>{
                    return (
                        <option value={val} key={i}>{val}</option>
                    )
                })}
            </select>
        </label>
    )
}