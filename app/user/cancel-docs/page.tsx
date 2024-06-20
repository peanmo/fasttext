import DocumentTable from "@/app/component/docs-table";
import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect("/api/auth/signin")
    }
    return(
        <div className="flex flex-col gap-3">
            <h1>เอกสารถูกยกเลิก</h1>
            <h4>จำนวน 4 ฉบับ</h4>
            <DocumentTable session={session} documentsWithStatus={[]}/>
        </div>
    )    
}