'use client'

import { useFormState } from 'react-dom'
import { createSection } from './action'
import SubmitButton from '@/app/component/submit-button'

const initialState = {
    message: '',
  }

export default function SectionsManager({sections}:{sections:{id:string,name:string,shortName:string}[]}){
    const [addSectionState, formAddSectionAction] = useFormState(createSection, initialState)
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-slate-300">
            <p className="text-2xl font-bold mb-6">เพิ่มแผนก</p>
            <form action={formAddSectionAction} className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="name" className="mb-2">ชื่อแผนก : </label>
                <input type="text" name="name" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="shortName" className="mb-2">ตัวย่อแผนก : </label>
                <input type="text" name="shortName" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <span className="text-red-500 mb-4">{addSectionState.message}</span>
                <SubmitButton label='เพิ่มแผนก' pendingLabel='กำลังเพิ่มแผนก' />
            </form>
            <p className="text-2xl font-bold mb-6">รายการแผนกที่มี</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <pre>{JSON.stringify(sections, null, 2)}</pre>
            </div>
        </main>
    )
}