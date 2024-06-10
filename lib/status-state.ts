import { $Enums, NextStatus, Status } from "@prisma/client"
import prisma from "./prisma"
import { Document } from "@prisma/client"
export type ChangeStatus = {
    name: string
    role?: $Enums.Role
    specific?: string
}

export function getNextStatusArr(current: string){
    let lists = nextStatusMap.get(current)
    if(!lists){
        return []
    }
    let listObjs : ChangeStatus[] = []
    for (const o of lists){
        o&&listObjs.push(o)
    }
    return listObjs
}

export const allStatusList : ChangeStatus[] = [
    {
        name: "รอเอกสารต้นฉบับ",
        specific: "รอเอกสารต้นฉบับ"
    },{
        name: "รับเอกสารต้นฉบับ",
        role: "checker",
    },{
        name: "กำลังตรวจสอบเอกสาร",
        specific: "รับเอกสารต้นฉบับ",
    },{
        name: "เอกสารตรวจสอบผ่านเรียบร้อย",
        specific: "รับเอกสารต้นฉบับ",
    },{
        name: "เอกสารตรวจไม่ผ่าน",
        specific: "รับเอกสารต้นฉบับ",
    },{
        name: "เอกสารส่งคืน/ตีกลับ",
        specific: "รับเอกสารต้นฉบับ",
    },{
        name: "กำลังดำเนินการเข้าระบบ",
        role: "checker",
    },{
        name: "ดำเนินการประมวลผลในระบบ SAP",
        specific: "กำลังดำเนินการเข้าระบบ",
    },{
        name: "พบปัญหาในระบบ SAP",
        specific: "กำลังดำเนินการเข้าระบบ",
    },{
        name: "ใบสำคัญจ่ายรอเสนอ หผ./ผจก.",
        specific: "กำลังดำเนินการเข้าระบบ",
    },{
        name: "ใบสำคัญจ่ายรอเบิกจ่ายเงินสด/เช็ค",
        role: "manager",
    },{
        name: "เบิกจ่ายเสร็จสิ้น",
        role: "checker",
    },{
        name: "ยกเลิก",
        role: "admin"
    },
]

export const nextStatusMap = new Map([
    ["รอเอกสารต้นฉบับ",[allStatusList.find(o => o.name == 'รับเอกสารต้นฉบับ'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["รับเอกสารต้นฉบับ",[allStatusList.find(o => o.name == 'กำลังตรวจสอบเอกสาร'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["กำลังตรวจสอบเอกสาร",[allStatusList.find(o => o.name == 'เอกสารตรวจไม่ผ่าน'),allStatusList.find(o => o.name == 'เอกสารตรวจสอบผ่านเรียบร้อย'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["เอกสารตรวจไม่ผ่าน",[allStatusList.find(o => o.name == 'เอกสารส่งคืน/ตีกลับ'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["เอกสารส่งคืน/ตีกลับ",[allStatusList.find(o => o.name == 'รอเอกสารต้นฉบับ'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["เอกสารตรวจสอบผ่านเรียบร้อย",[allStatusList.find(o => o.name == 'กำลังดำเนินการเข้าระบบ'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["กำลังดำเนินการเข้าระบบ",[allStatusList.find(o => o.name == 'ดำเนินการประมวลผลในระบบ SAP'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["ดำเนินการประมวลผลในระบบ SAP",[allStatusList.find(o => o.name == 'ใบสำคัญจ่ายรอเสนอ หผ./ผจก.'),allStatusList.find(o => o.name == 'พบปัญหาในระบบ SAP'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["พบปัญหาในระบบ SAP",[allStatusList.find(o => o.name == 'ดำเนินการประมวลผลในระบบ SAP'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["ใบสำคัญจ่ายรอเสนอ หผ./ผจก.",[allStatusList.find(o => o.name == 'ใบสำคัญจ่ายรอเบิกจ่ายเงินสด/เช็ค'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["ใบสำคัญจ่ายรอเบิกจ่ายเงินสด/เช็ค",[allStatusList.find(o => o.name == 'เบิกจ่ายเสร็จสิ้น'),allStatusList.find(o => o.name == 'ยกเลิก')]],
    ["เบิกจ่ายเสร็จสิ้น",[allStatusList.find(o => o.name == 'ยกเลิก')]],
])

export async function setNextStatusState(document:Partial<Document> & {status: Status[], nextStatus: NextStatus[]},status:Status){
    await prisma.nextStatus.deleteMany({
        where: {
          documentId: document.id
        }
    })
    const nextStatusArr = getNextStatusArr(status.name)
    for(const n of nextStatusArr){
        if(n.role){
          const data = {
            name: n.name,
            role: n.role,
            documentId: status.documentId
          }
          await prisma.nextStatus.create({
            data
          })
        }
        else if(n.specific){
          const obj = document.status.find(o => o.name == n.specific)
          if(obj){
            const data = {
              name: n.name,
              userId : obj.updatedByUserId,
              documentId : status.documentId
            }
            await prisma.nextStatus.create({
              data
            })
          }
        }
      }
}