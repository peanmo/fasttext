'use client'

import { useEffect, useRef } from "react";
import { changeStatus } from "./action";
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "@/app/component/submit-button";

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
        <form ref={formRef} action={handleChangeStatus} className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
            <label className="mb-2" htmlFor="name"> เปลี่ยนสถานะเอกสาร </label>
            <select className="mb-4 p-2 border rounded-md shadow-sm" name="name" defaultValue={nextStatus[0]} required >
                {nextStatus.map((val,i)=>{
                    return (
                        <option value={val} key={i}>{val}</option>
                    )
                })}
            </select>
            <label className="mb-2" htmlFor="note">หมายเหตุ</label>
            <input className="mb-4 p-2 border rounded-md shadow-sm" type="text" name="note" defaultValue="-"/>
            {state.err&&<span className="text-red-400">{state.message}</span>}
            <SubmitButton />
        </form>
    )
}

