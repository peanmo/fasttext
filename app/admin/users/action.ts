'use server'

import { authOptions } from "@/auth-options";
import prisma from "@/lib/prisma"
import { $Enums, User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function isAdmin(){
  const session = await getServerSession(authOptions)
  if(!session || !session.pea || session.pea.role != "admin"){
    return false
  }
  return true
}
 
export async function createUser(prevState: any, formData: FormData) {
  !isAdmin()&&redirect("/")
    const user = formData.get('user')?.toString()
  if(!user || !/[\d{6}|\d{9}]/.test(user)){
    return {
        message: "กรุณากรอกรูปแบบพนักงานให้ถูกต้อง"
    }
  }
  const findUser = await prisma.user.findFirst({
    where: {
      user
    }
  })
  if(user){
    return {
      message: "มีรหัสพนักงานนี้อยู่แล้ว"
    }
  }
  const name = formData.get('name')?.toString()
  if(!name){
    return {
        message: "กรุณากรอกชื่อ-สกุล"
    }
  }
  const sectionId = formData.get('sectionId')?.toString()
  if(!sectionId){
    return {
        message: "กรุณากรอกสังกัด"
    }
  }
  const tel = formData.get('tel')?.toString()
  if(!tel){
    return {
        message: "กรุณากรอกหมายเลขโทรศัพท์"
    }
  }

  const role = formData.get('role')?.toString()
  if(!role || !["admin","checker","user","manager"].includes(role)){
    return {
        message: "กรุณาเลือกประเภทผู้ใช้งาน"
    }
  }

  const result = await prisma.user.create({
    data:{
        user, 
        name,
        tel,
        role: role as "admin"|"checker"|"user"|"manager",
        hashedPassword: await bcrypt.hash("87654321", 12),
        sectionId,
    }
  })

  return {
    message: 'ลงทะเบียนสำเร็จ',
  }
}

export async function changeUserRole(role:$Enums.Role,id:string) {
  try{
    !isAdmin()&&redirect("/")
    const result = await prisma.user.update({
      where :{
        id

      },
      data: {
        role
      },
      select: {
        name: true,
        role: true
      }
    })
    return {
      err: false,
      message: `เปลี่ยนประเภทผู้ใช้งานของ  ${result.name}  สำเร็จ`
    }
  }catch(e){
    return {
      err: true,
      message: `เกิดข้อผิดพลาดไม่สามารถเปลี่ยนประเภทผู้ใช้งานได้`
    }
  }
  
}

export async function changeUserSuspend(id:string) {
  !isAdmin()&&redirect("/")
  const user = await prisma.user.findFirst({
    where :{
      id
    },
    select: {
      suspend: true
    }
  })
  if(!user){
    return {
      err: true,
      message: "ไม่พบผู้ใช้งาน"
    }
  }

  const result = await prisma.user.update({
    where : {
      id
    },
    data: {
      suspend: !user.suspend
    },
    select: {
      name: true,
      suspend: true
    }
  })
  return {
    err: false,
    message: `ทำให้ ${result.name} ${result.suspend?" ถูกระงับการใช้งาน":" สามารถใช้งานได้ปกติ"}`
  }
}

export async function resetPassword(id:string) {
  !isAdmin()&&redirect("/")
  const user = await prisma.user.findFirst({
    where :{
      id
    },
    select: {
      name: true
    }
  })
  if(!user){
    return {
      err: true,
      message: "ไม่พบผู้ใช้งาน"
    }
  }

  const result = await prisma.user.update({
    where : {
      id
    },
    data : {
      hashedPassword: await bcrypt.hash("87654321", 12)
    },
    select: {
      name: true
    }
  })
  return {
    err: false,
    message: `รีเซ็ตรหัสผ่านของ ${result.name} เป็น 87654321`
  }
}