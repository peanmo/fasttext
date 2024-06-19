import { dateFormat } from "@/lib/date-format";
import { Status, Document, User } from "@prisma/client";
import { Session } from "next-auth";
import Link from "next/link";

type DocumentWithStatus = Pick<
  Document,
  "amount" | "date" | "docNo" | "year" | "id" | "name" | "type"
> & { status: Pick<Status, "name">[] } & { user: Pick<User, "name" | "user"> };

export default function DocumentTable({
  documentsWithStatus,
  session,
}: {
  documentsWithStatus: DocumentWithStatus[];
  session: Session;
}) {
  return (
    <div className="p-3">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                เลขที่เอกสาร
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                วันที่
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                ประเภทเอกสาร
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                ชื่อเอกสาร
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                จำนวนเงิน
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                เจ้าของเอกสาร
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                สถานะปัจจุบัน
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documentsWithStatus.map((val) => (
              <tr key={val.id}>
                <td className="px-6 py-4 whitespace-nowrap">{`${val.docNo}/${val.year}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dateFormat(val.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{val.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{val.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{val.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{val.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {val.status.length != 0 && val.status[0].name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/history/${val.id}`}>
                    {session.pea &&
                      ["admin", "checker"].includes(session.pea.role) &&
                      "จัดการ/"}
                    ดูประวัติ เอกสาร
                  </Link>
                  {val.status.length != 0 &&
                    val.status[0].name == "เอกสารส่งคืน/ตีกลับ" &&
                    session.pea?.user == val.user.user && (
                      <Link href="#">แก้ไขเอกสาร</Link>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        {documentsWithStatus.map((val) => (
          <div key={val.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div>
              <span className="font-bold">เลขที่เอกสาร: </span>
              {`${val.docNo}/${val.year}`}
            </div>
            <div>
              <span className="font-bold">วันที่: </span>
              {dateFormat(val.date)}
            </div>
            <div>
              <span className="font-bold">ประเภทเอกสาร: </span>
              {val.type}
            </div>
            <div>
              <span className="font-bold">ชื่อเอกสาร: </span>
              {val.name}
            </div>
            <div>
              <span className="font-bold">จำนวนเงิน: </span>
              {val.amount}
            </div>
            <div>
              <span className="font-bold">เจ้าของเอกสาร: </span>
              {val.user.name}
            </div>
            <div>
              <span className="font-bold">สถานะปัจจุบัน: </span>
              {val.status.length != 0 && val.status[0].name}
            </div>
            <div>
              <Link href={`/history/${val.id}`}>
                <p className="text-blue-500 underline">
                  {session.pea &&
                    ["admin", "checker"].includes(session.pea.role) &&
                    "จัดการ/"}
                  ดูประวัติ เอกสาร
                </p>
              </Link>
              {val.status.length != 0 &&
                val.status[0].name == "เอกสารส่งคืน/ตีกลับ" &&
                session.pea?.user == val.user.user && (
                  <Link href="#">
                    <p className="text-blue-500 underline">แก้ไขเอกสาร</p>
                  </Link>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
