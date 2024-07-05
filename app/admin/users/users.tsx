'use client'

import { useFormState } from 'react-dom'
import { changeUserRole, changeUserSuspend, createUser, resetPassword } from './action'
import { $Enums, Section, User } from '@prisma/client'
import { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

const initialState = {
    message: '',
  }

export default function UserManagement({sections,users}:{sections : Section[],users:Partial<User>[]}){
    const router = useRouter()
    const [addUserState, formAddUserAction] = useFormState(createUser, initialState)

    const handleChangeRole = async(e:ChangeEvent<HTMLSelectElement>,id:string|undefined)=>{
        if(!id){
            window.alert("ไม่มีข้อมูลของผู้ใช้งาน หรือข้อมูลผู้ใช้งานไม่ถูกต้อง")
            return
        }
        const result = await changeUserRole(e.target.value as $Enums.Role,id)
        window.alert(result.message)
        if(result.err){
            return
        }
        router.refresh()
    }

    const handleChangeSuspend = async (id:string|undefined)=>{
        if(!id){
            window.alert("ไม่มีข้อมูลของผู้ใช้งาน หรือข้อมูลผู้ใช้งานไม่ถูกต้อง")
            return
        }
        const result = await changeUserSuspend(id)
        window.alert(result.message)
        if(result.err){
            return
        }
        router.refresh()
    }

    const handleResetPassword = async (id:string|undefined)=>{
        if(!id){
            window.alert("ไม่มีข้อมูลของผู้ใช้งาน หรือข้อมูลผู้ใช้งานไม่ถูกต้อง")
            return
        }
        const result = await resetPassword(id)
        window.alert(result.message)
        if(result.err){
            return
        }
        router.refresh()
    }
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
                    <option value="checker">ผู้ตรวจสอบเอกสาร</option>
                </select>
                <span className="text-red-500 mb-4">{addUserState.message}</span>
                <button type='submit' className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600">Sign up</button>
            </form>
            <p>รายชื่อผู้ใช้งาน</p>
            <table>
            <thead>
                <tr>
                    <th>รหัสพนักงาน</th>
                    <th>ชื่อพนักงาน</th>
                    <th>เปลี่ยนประเภทผู้ใช้งาน</th>
                    <th>ระงับการใช้งาน</th>
                    <th>รีเซ็ตรหัสผ่าน</th>
                </tr>
            </thead>
            <tbody>
                {users.map((val,i)=>{return (
                    <tr key={val.id}>
                        <td>{val.user}</td>
                        <td>{val.name}</td>
                        <td>
                            <select onChange={(e)=>handleChangeRole(e,val.id)} name="role" defaultValue={val.role} required className="mb-4 p-2 border rounded-md shadow-sm">
                                <option value="user">ผู้ใช้งานทั่วไป</option>
                                <option value="admin">Admin</option>
                                <option value="manager">ผู้จัดการ หรือผู้แทน</option>
                                <option value="checker">ผู้ตรวจสอบเอกสาร</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={()=>handleChangeSuspend(val.id)}>{val.suspend?"ระงับการใช้งาน":"ใช้งานได้ปกติ"}</button>
                        </td>
                        <td>
                            <button onClick={()=>handleResetPassword(val.id)}>รีเซ็ตรหัสผ่าน</button>
                        </td>
                    </tr>
                )})}
            </tbody>
            </table>

        </main>
    )
}