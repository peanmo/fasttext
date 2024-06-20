import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function Home(){
    const session = await getServerSession(authOptions)
    if(!session || !session.pea)
    {
        redirect("/api/auth/signin")
    }
    return (
        <div className="flex flex-col gap-3">
            <h1>ยินดีต้อนรับ {session.pea.name}</h1>
            <Link href={"/user/waiting-docs"}>รอเอกสารต้นฉบับ จำนวน 4 ฉบับ</Link>
            <Link href={"/user/returned-docs"}>เอกสารส่งคืน/ตีกลับ จำนวน 4 ฉบับ</Link>
            <Link href={"/user/cancel-docs"}>เอกสารถูกยกยเลิก จำนวน 4 ฉบับ</Link>
            <Link href={"/user/all-docs"}>เอกสารของคุณทั้งหมด</Link>  
        </div>
    )
}