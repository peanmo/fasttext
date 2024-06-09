export type ChangeStatus = {
    name: string
    roles: ("user"|"manager"|"checker"|"admin")[]
    specific: boolean
}

export function nextStatusList(status:string,role:"user"|"manager"|"checker"|"admin"){
    let lists = nextStatusMap.get(status)
    if(!lists){
        return []
    }
    let listObjs : ChangeStatus[] = []
    for (const o of lists){
        o&&o.roles.includes(role)&&listObjs.push(o)
    }
    return listObjs
}

export const allStatusList : ChangeStatus[] = [
    {
        name: "รอเอกสารต้นฉบับ",
        roles: ["user","manager","checker","admin"],
        specific: true,
    },{
        name: "รับเอกสารต้นฉบับ",
        roles: ["checker","admin"],
        specific: false,
    },{
        name: "กำลังตรวจสอบเอกสาร",
        roles: ["checker","admin"],
        specific: true,
    },{
        name: "เอกสารตรวจสอบผ่านเรียบร้อย",
        roles: ["checker","admin"],
        specific: true,
    },{
        name: "เอกสารตรวจไม่ผ่าน",
        roles: ["checker","admin"],
        specific: true,
    },{
        name: "เอกสารส่งคืน/ตีกลับ",
        roles: ["checker","admin"],
        specific: true,
    },{
        name: "กำลังดำเนินการเข้าระบบ",
        roles: ["checker","admin"],
        specific: false,
    },{
        name: "ดำเนินการประมวลผลในระบบ SAP",
        roles: ["checker","admin"],
        specific: true,
    },{
        name: "พบปัญหาในระบบ SAP",
        roles: ["checker","admin"],
        specific: true,
    },{
        name: "ใบสำคัญจ่ายรอเสนอ หผ./ผจก.",
        roles: ["checker","admin"],
        specific: true,
    },{
        name: "ใบสำคัญจ่ายรอเบิกจ่ายเงินสด/เช็ค",
        roles: ["manager"],
        specific: false,
    },{
        name: "เบิกจ่ายเสร็จสิ้น",
        roles: ["checker","admin"],
        specific: false,
    },{
        name: "ยกเลิก",
        roles: ["checker","admin"],
        specific: false,
    },
]

const nextStatusMap = new Map([
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