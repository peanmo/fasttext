'use client'

import { useEffect, useRef } from "react";
import { changeStatus } from "./action";
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom";

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

const initialState = {
    err: false,
    message: ""
}

export default function ChangeStatus({documentId,nextStatus}:{documentId:string,nextStatus:string[]}){
    const [state,formAction] = useFormState(changeStatus,initialState)
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const handleChangeStatus = async (formData:FormData)=>{
        formData.append("id",documentId)
        formAction(formData)
    }

    useEffect(()=>{
        if(state.message == "success"){
            formRef.current?.reset()
            router.refresh()
        }
    },[state])
    return (
        <form ref={formRef} action={handleChangeStatus} className="flex flex-col gap-1">
            <label htmlFor="name"> เปลี่ยนสถานะเอกสาร </label>
            <select name="name" defaultValue={nextStatus[0]} required >
                {nextStatus.map((val,i)=>{
                    return (
                        <option value={val} key={i}>{val}</option>
                    )
                })}
            </select>
            <label htmlFor="note">หมายเหตุ</label>
            <input type="text" name="note" defaultValue="-"/>
            {state.err&&<span className="text-red-400">{state.message}</span>}
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
      <button type="submit" disabled={pending} className={`w-full ${pending?"bg-black hover:bg-black ":" bg-blue-500 hover:bg-blue-600 "} text-white py-2 px-4 rounded-md `}>
        {pending?"กำลังส่ง":"ยืนยัน"}
      </button>
    )
  }