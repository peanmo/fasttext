"use server"

import { authOptions } from '@/auth-options';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

function getCurrentThaiYear(): number {
    const currentYear = new Date().getFullYear();
    return currentYear + 543; // เปลี่ยนปีคริสต์ศักราชเป็นปีพุทธศักราช
  }

export async function addDocument() {
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect("/api/auth/signin")
    }
  const currentYear = getCurrentThaiYear();
  const yearSuffix = currentYear.toString();

  // ดึงหมายเลขเอกสารล่าสุดสำหรับปีปัจจุบัน
  const latestDocument = await prisma.document.findFirst({
    where: {
      docNo: {
        endsWith: `/${yearSuffix}`,
      },
    },
    orderBy: {
      docNo: 'desc',
    },
  });

  let newDocNo = 1;
  if (latestDocument) {
    const latestDocNo = parseInt(latestDocument.docNo.split('/')[0], 10);
    newDocNo = latestDocNo + 1;
  }

  const formattedDocNo = `${newDocNo}/${yearSuffix}`;

  const data = {
    type: 'Test',
    name: 'เอกสารใหม่',
    note: "ทดสอบเอกสารใหม่",
    amount: 1000.0,
    userId: session.pea.id,
    fromSectionId: session.pea.section.id,
  }

  // สร้างเอกสารใหม่
  const newDocument = await prisma.document.create({
    data: {
      ...data,
      docNo: formattedDocNo,
    },
  });

  console.log(newDocument)

  const newStatus = await prisma.status.create({
    data: {
        name: "รอเอกสารต้นฉบับ",
        date: new Date(),
        documentId: newDocument.id,
        updatedByUserId: session.pea.user
    }
  })

  console.log(newStatus)
    
}

