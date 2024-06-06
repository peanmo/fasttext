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
  const section = formData.get('section')?.toString()
  if(!section){
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
        section,
        tel,
        hashedPassword: await bcrypt.hash("87654321", 12)
    }
  })

  console.log(result)

  return {
    message: 'ลงทะเบียนสำเร็จ',
  }
}