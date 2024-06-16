import prisma from "@/lib/prisma"
import Link from "next/link";


export default async function Home(){
    const documents = await prisma.document.findMany({
        select: {
            id: true,
            user: true,
            name: true,
            amount: true,
            status: {
                orderBy: {
                    date: "desc"
                }
            }
        }
    })
    const documentsWithLatestStatus = documents.map(doc => {
        const latestStatus = doc.status.reduce((latest, current) => {
          return new Date(current.date) > new Date(latest.date) ? current : latest;
        }, doc.status[0]);
        
        return {
          ...doc,
          status: latestStatus,
        };
    });
    return (
        <div>
            หน้าแรก
            {documentsWithLatestStatus.map((val)=>{
                return (
                    <div key={val.id} className="flex flex-row justify-between">
                        <Link  href={`/history/${val.id}`} className="flex flex-row justify-between">
                            <span>{val.user.name}</span>
                            <span>{val.name}</span>
                            <span>{val.amount}</span>
                            <span>{val.status.name}</span> 
                        </Link>
                    </div>
                )
            })}
            
        </div>
    )
}