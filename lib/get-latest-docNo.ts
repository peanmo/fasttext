import prisma from "./prisma";

function getCurrentThaiYear(): number {
    const currentYear = new Date().getFullYear();
    return currentYear + 543; // เปลี่ยนปีคริสต์ศักราชเป็นปีพุทธศักราช
  }


export async function getLastestDocNumber() {
    const currentYear = getCurrentThaiYear();
    const yearSuffix = currentYear.toString();
    
    const latestDocument = await prisma.document.findFirst({
      where: {
        year:yearSuffix,
      },
      orderBy: {
        date: 'desc',
      },
    });
  
    let newDocNo = 1;
    if (latestDocument) {
      const latestDocNo = latestDocument.docNo
      newDocNo = latestDocNo + 1;
    }
  
    return {newDocNo,yearSuffix}
  }