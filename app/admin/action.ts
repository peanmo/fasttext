'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt';
 
export async function createUser(prevState: any, formData: FormData) {
    const user = formData.get('user')?.toString()
  if(!user || !/[\d{6}|\d{9}]/.test(user)){
    return {
        message: "กรุณากรอกรูปแบบพนักงานให้ถูกต้อง"
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

  const result = await prisma.user.create({
    data:{
        user, 
        name,
        tel,
        hashedPassword: await bcrypt.hash("87654321", 12),
        sectionId
    }
  })

  return {
    message: 'ลงทะเบียนสำเร็จ',
  }
}

export async function createSection(prevState: any, formData: FormData) {
  const name = formData.get('name')?.toString()
  if(!name){
    return {
        message: "กรุณากรอกชื่อแผนก"
    }
  }
  const shortName = formData.get('shortName')?.toString()
  if(!shortName){
    return {
        message: "กรุณากรอกตัวย่อแผนก"
    }
  }

  const result = await prisma.section.create({
    data:{
        name,
        shortName
    }
  })

  return {
    message: 'เพิ่มแผนกสำเร็จ',
  }

}