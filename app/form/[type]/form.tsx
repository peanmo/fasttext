"use client"

import { Session } from "next-auth";
import { useFormState } from 'react-dom'
import { addDocument } from "./action";

const initialState = {
    message: '',
    err: false
  }

export default function FormDocument({session,type}:{session:Session,type:string}){
    const [state, formAction] = useFormState(addDocument, initialState) 
    const handleSubmit = (e:FormData)=>{
        const data = e
        data.append("type",type)
        formAction(data)
    } 
    return (
        <div>
            <form action={handleSubmit} className="flex flex-col">
                <label htmlFor="docNo">เลขที่เอกสาร</label>
                <input name="docNo" type="text" value={!state.err ? state.message : ""} disabled required/>
                <label htmlFor="type">ประเภทเอกสาร</label>
                <input name="type" type="text" value={type} disabled required />
                <label htmlFor="username">ผู้ส่ง</label>
                <input name="username" type="text" value={session.pea?.name} disabled required/>
                <label htmlFor="section">จาก</label>
                <input name="section" type="text" value={session.pea?.section.shortName} disabled required/>
                <label htmlFor="toSection">ถึง</label>
                <input name="toSection" type="text" value="ผสน." disabled />
                <label htmlFor="name">ชื่อเอกสาร</label>
                <input name="name" type="text" required />
                <label htmlFor="amount">จำนวนเงิน</label>
                <input name="amount" type="text" required />
                <label htmlFor="note">หมายเหตุ</label>
                <input name="note" type="text" />
                <button type="submit">ยืนยัน</button>
            </form>
            {state.err && <p>{state.message}</p>}
        </div>
    )
}