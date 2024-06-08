'use client'

import { useFormState } from 'react-dom'
import { createUser } from './action'
import { Section } from '@prisma/client'

const initialState = {
    message: '',
  }

export default function UserManagement({sections}:{sections : Section[]}){
    const [addUserState, formAddUserAction] = useFormState(createUser, initialState)
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-slate-300">
            <p className="text-2xl font-bold mb-6">เพิ่มผู้ใช้งาน</p>
            <form action={formAddUserAction} className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="user" className="mb-2">รหัสพนักงาน : </label>
                <input type="text" name="user" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="name" className="mb-2">ชื่อสกุล : </label>
                <input type="text" name="name" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="tel" className="mb-2">หมายเลขโทรศัพท์ : </label>
                <input type="text" name="tel" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="sectionId" className="mb-2">สังกัด : </label>
                <select name="sectionId" defaultValue="" required className="mb-4 p-2 border rounded-md shadow-sm">
                    <option value="">โปรดเลือกแผนก</option>
                    {sections.map((val)=> (<option value={val.id} key={val.id}>{val.shortName}</option>))}
                </select>
                <label htmlFor="role" className="mb-2">ประเภทผู้ใช้งาน : </label>
                <select name="role" defaultValue="user" required className="mb-4 p-2 border rounded-md shadow-sm">
                    <option value="user">ผู้ใช้งานทั่วไป</option>
                    <option value="admin">Admin</option>
                    <option value="manager">ผู้จัดการ หรือผู้แทน</option>
                    <option value="checker">ผู้ตรวจสอบเอกสาร</option>
                </select>
                <span className="text-red-500 mb-4">{addUserState.message}</span>
                <button type='submit' className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600">Sign up</button>
            </form>
        </main>
    )
}