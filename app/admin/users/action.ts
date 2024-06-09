'use server'

import prisma from "@/lib/prisma"
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
 
export async function createUser(prevState: any, formData: FormData) {
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