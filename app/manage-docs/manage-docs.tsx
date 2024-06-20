"use client"

import {  DocsWithStatus, searchDocsByStatus, setNewStatus } from "./action";
import { allStatusList } from "@/lib/status-state";
import { typeMapping, allTypeDoc } from "@/lib/doctype-map";
import { useEffect, useMemo, useRef, useState } from "react";
import {useRouter} from "next/navigation"

const initialDocs:{docs : DocsWithStatus[],nextStatus:string[]} = {
    docs: [],
    nextStatus: []
}

export default function ManageDocs(){
  const [docsAndNextStatus,setDocsAndNextStatus] = useState(initialDocs);
  const [selectedId,setSelectedId] = useState<string[]>([])
  const [deselectedId,setDeselectedId] = useState<string[]>([])
  const formQueryRef = useRef<HTMLFormElement>(null); // สร้าง ref เพื่อเก็บอ้างอิงฟอร์ม
  const router = useRouter()

  const handleSelect = (id:string)=>{
    setSelectedId([...selectedId,id])
    let ids: string[] =[]
    ids = deselectedId.filter(val=>{
        return val != id
    })
    setDeselectedId(ids)
  }

  const handleDeselect = (id:string)=>{
    setDeselectedId([...selectedId,id])
    let ids: string[] =[]
    ids = selectedId.filter(val=>{
        return val != id
    })
    setSelectedId(ids)
  }

  const handleSubmitStatus = async(e:FormData)=>{
    let form = e
    for(const id of selectedId){
        form.append('ids',id)
    }
    const result = await setNewStatus(form)
    if(result.err){
        console.log(result.message)
    }
    setSelectedId([])
    setDeselectedId([])
    setDocsAndNextStatus(initialDocs)
    if(formQueryRef.current){
        formQueryRef.current.reset()
    }
    router.refresh()
  }

  const handleQuery =async (e:FormData) => {
    setDocsAndNextStatus(await searchDocsByStatus(e))
  }

  useEffect(()=>{
    let ids:string[]=[]
    docsAndNextStatus.docs.forEach((val)=>{
        ids.push()
    })
    setDeselectedId(ids)
    setSelectedId([])
  },[docsAndNextStatus])

  const selectedDocs:DocsWithStatus[] = useMemo(()=>{
    let d: DocsWithStatus[] = []
    d = docsAndNextStatus.docs.filter(val=>{return selectedId.includes(val.id)})
    return d
  },[selectedId])

  const deselectedDocs:DocsWithStatus[] = useMemo(()=>{
    let d: DocsWithStatus[] = []
    d = docsAndNextStatus.docs.filter(val=>{return !selectedId.includes(val.id)})
    return d
  },[selectedId])
    return(
        <div className="flex flex-col gap-1">
            <form ref={formQueryRef} action={handleQuery} className="p-3 flex flex-col gap-1">
                <label htmlFor="status" >เลือกสถานะ</label>
                <select defaultValue="" name="status" required>
                    <option value="">โปรดเลือก....</option>
                    {allStatusList.map((val,i)=>{
                        return (
                            <option value={val} key={i}>{val}</option>
                        )
                    })}
                </select>
                <label htmlFor="type" >เลือกประเภทเอกสาร</label>
                <select defaultValue="all" name="type" required>
                    <option value="all">ทั้งหมด</option>
                    {allTypeDoc.map((val,i)=>{
                        return(
                            <option value={val} key={i}>{typeMapping.get(val)||val}</option>
                        )
                    })}
                </select>
                <button>ค้นหาเอกสารสถานะนี้</button>
            </form>
            <p>เลือกเอกสาร</p>
            {deselectedDocs.map((val)=>{
                return (
                    <div key={val.id} className="flex flex-row gap-3">
                        <span>{val.docNo}/{val.year}</span>
                        <button onClick={()=>handleSelect(val.id)}>เลือกเอกสารนี้</button>
                    </div>
                )
            })}
            <p>เอกสารที่เลือก</p>
            {selectedDocs.map((val)=>{
                return (
                    <div key={val.id} className="flex flex-row gap-3">
                        <span>{val.docNo}/{val.year}</span>
                        <button onClick={()=>handleDeselect(val.id)}>ยกเลิกการเลือก</button>
                    </div>
                )
            })}
            {selectedDocs.length != 0 && docsAndNextStatus.nextStatus.length != 0 && (
                <form action={(e)=>handleSubmitStatus(e)} className="flex flex-row p-3 gap-1">
                    <label htmlFor="status">เลือกสถานะถัดไป</label>
                    <select name="status" defaultValue="" required>
                        <option value="">โปรดเลือก...</option>
                        {docsAndNextStatus.nextStatus.map((val,i)=>{
                            return (
                                <option key={i} value={val}>{val}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="note">หมายเหตุ</label>
                    <input type="text" name="note" />
                    <button>ยืนยัน</button>
                </form>
            )}
        </div>
    )
}