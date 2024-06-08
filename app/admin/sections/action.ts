'use server'

import prisma from "@/lib/prisma"

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