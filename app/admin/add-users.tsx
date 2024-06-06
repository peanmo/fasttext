'use client'

import { useFormState } from 'react-dom'
import { createUser } from './action'

const initialState = {
    message: '',
  }

export default function AddUser(){
    const [state, formAction] = useFormState(createUser, initialState)
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p>เพิ่มผู้ใช้งาน</p>
            <form action={formAction} className="flex flex-col">
                <label htmlFor="user">รหัสพนักงาน : </label>
                <input type="text" name="user" required/>
                <label htmlFor="name">ชื่อสกุล : </label>
                <input type="text" name="name" required/>
                <label htmlFor="tel">หมายเลขโทรศัพท์ : </label>
                <input type="text" name="tel" required/>
                <label htmlFor="section">สังกัด : </label>
                <input type="text" name="section" required/>
                <span>{state.message}</span>
                <button type='submit'>Sign up</button>
            </form>
        </main>
    )
}