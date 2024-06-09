"use client"

import { allStatusList, nextStatusList } from "@/lib/status-state"
import { ChangeEvent, useState } from "react"

export default function Test(){
    const [lists,setLists] = useState<any>()
    const handleChange = (e:ChangeEvent<HTMLSelectElement>) =>{
        const l = nextStatusList(e.target.value,"user")
        console.log(l)
    }
    return (
        <div>
            ทดสอบ
            <label htmlFor="test">สำหรับทดสอบ</label>
            <select name="test" onChange={handleChange}>
                {allStatusList.map((val,i)=>{
                    return (
                        <option key={i} value={val.name}>{val.name}</option>
                    )
                })}
            </select>
            <div>
                
            </div>
        </div>
    )
}