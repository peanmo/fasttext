'use client'

import { Session } from "next-auth";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function Profile({session}:{session:Session}){
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                แก้ไขข้อมูลส่วนตัว
            </h2>
            <form className="space-y-4">
                <div className="form-group">    
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">ชื่อผู้ใช้</label>
                    <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required type="text" name="name" defaultValue={session.pea?.name}/>
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">หมายเลขโทรศัพท์</label>
                    <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md" type="text" name="name" defaultValue={session.pea?.tel}/>
                </div>
                <SubmitButton/>
            </form>
            <h2 className="text-2xl font-bold mt-6 mb-6 text-center text-gray-800">
                แก้ไขรหัสผ่าน
            </h2>
            <form className="space-y-4">
                <div className="form-group"> 
                    <label className="block text-sm font-medium text-gray-700" htmlFor="oldPassword">รหัสผ่านเดิม</label>
                    <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md" type="password" name="oldPassword" required/>
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">รหัสผ่านใหม่</label>
                    <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md" type="password" name="newPassword" required/>
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="confirmedPassword">ยืนยันรหัสผ่าน</label>
                    <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md" type="password" name="confirmedPassword" required/>
                </div>
                <SubmitButton/>
            </form>
            <Link className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" href={"/"}> กลับหน้าหลัก </Link>
        </div>
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