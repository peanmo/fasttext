import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session || !session.pea) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-center">
        ยินดีต้อนรับ {session.pea.name}
      </h1>
      <Link
        href="/user/waiting-docs"
        className="block p-4 bg-blue-500 text-white text-center rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        รอเอกสารต้นฉบับ จำนวน 4 ฉบับ
      </Link>
      <Link
        href="/user/returned-docs"
        className="block p-4 bg-green-500 text-white text-center rounded-lg shadow hover:bg-green-600 transition duration-300"
      >
        เอกสารส่งคืน/ตีกลับ จำนวน 4 ฉบับ
      </Link>
      <Link
        href="/user/cancel-docs"
        className="block p-4 bg-red-500 text-white text-center rounded-lg shadow hover:bg-red-600 transition duration-300"
      >
        เอกสารถูกยกเลิก จำนวน 4 ฉบับ
      </Link>
      <Link
        href="/user/all-docs"
        className="block p-4 bg-gray-500 text-white text-center rounded-lg shadow hover:bg-gray-600 transition duration-300"
      >
        เอกสารของคุณทั้งหมด
      </Link>
    </div>
  );
}
