'use client'

import { useFormState } from 'react-dom'
import { createSection, createUser } from './action'

const initialState = {
    message: '',
  }

export default function AddUser({sections}:{sections:{id:string,name:string,shortName:string}[]}){
    const [addUserState, formAddUserAction] = useFormState(createUser, initialState)
    const [addSectionState, formAddSectionAction] = useFormState(createSection, initialState)
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p>เพิ่มผู้ใช้งาน</p>
            <form action={formAddUserAction} className="flex flex-col">
                <label htmlFor="user">รหัสพนักงาน : </label>
                <input type="text" name="user" required/>
                <label htmlFor="name">ชื่อสกุล : </label>
                <input type="text" name="name" required/>
                <label htmlFor="tel">หมายเลขโทรศัพท์ : </label>
                <input type="text" name="tel" required/>
                <label htmlFor="sectionId">สังกัด : </label>
                <input type="text" name="sectionId" required/>
                <span>{addUserState.message}</span>
                <button type='submit'>Sign up</button>
            </form>
            <p>เพิ่มแผนก</p>
            <form action={formAddSectionAction} className="flex flex-col">
                <label htmlFor="name">ชื่อแผนก : </label>
                <input type="text" name="name" required/>
                <label htmlFor="shortName">ตัวย่อแผนก : </label>
                <input type="text" name="shortName" required/>
                <span>{addSectionState.message}</span>
                <button type='submit'>เพิ่มแผนก</button>
            </form>
            <p>รายการแผนกที่มี</p>
            <p>{JSON.stringify(sections)}</p>
        </main>
    )
}