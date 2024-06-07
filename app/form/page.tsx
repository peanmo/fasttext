import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession(authOptions)
    console.log(session)

    return(
        <p>หน้าฟอร์ม</p>
    )
    
}