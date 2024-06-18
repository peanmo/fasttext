import { authOptions } from "@/auth-options";
import { dateFormat } from "@/lib/date-format";
import { typeMapping } from "@/lib/doctype-map";
import prisma from "@/lib/prisma";
import { getNextStatusArr } from "@/lib/status-state";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChangeStatus from "./change-status";
import DeleteStatus from "./delete-status";



async function getDocument(id: string) {
  const document = await prisma.document.findFirst({
    where: {
      id,
    },
    select: {
      status: {
        orderBy: {
          date: "desc",
        },
        select: {
          id: true,
          name: true,
          date: true,
          note: true,
          updatedByUser: {
            select: {
              name: true,
            },
          },
        },
      },
      id: true,
      docNo: true,
      year: true,
      type: true,
      name: true,
      amount: true,
      note: true,
      fromSection: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return document;
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.pea) {
    redirect("/");
  }

  try {
    const document = await getDocument(params.id);
    if (!document || !document.status || document.status.length == 0) {
      return <div>ไม่พบเอกสาร</div>;
    }

    const nextStatus = getNextStatusArr(document.status[0].name)
    
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-bold">รายละเอียดเอกสาร</h2>
          <div className="flex flex-col gap-1 p-3 border rounded-md">
            <div className="flex items-center p-4 border border-gray-300 rounded-md bg-green-100 ">
              <label className="font-bold mr-2 text-green-800">เลขที่เอกสาร :</label>
              <p className="m-0 text-green-900">{`${document.docNo}/${document.year}`}</p>
            </div>
            <div className="flex items-center p-4 border border-gray-300 rounded-md bg-green-100 ">
              <label className="font-bold mr-2 text-green-800">ประเภทเอกสาร :</label>
              <p className="m-0 text-green-900">{typeMapping.get(document.type)||document.type}</p>
            </div>
            <div className="flex items-center p-4 border border-gray-300 rounded-md bg-green-100 ">
              <label className="font-bold mr-2 text-green-800">ผู้ส่ง :</label>
              <p className="m-0 text-green-900">{document.user.name}</p>
            </div>
            <div className="flex items-center p-4 border border-gray-300 rounded-md bg-green-100 ">
              <label className="font-bold mr-2 text-green-800">จาก :</label>
              <p className="m-0 text-green-900">{document.fromSection.name}</p>
            </div>
            <div className="flex items-center p-4 border border-gray-300 rounded-md bg-green-100 ">
              <label className="font-bold mr-2 text-green-800">จำนวนเงิน :</label>
              <p className="m-0 text-green-900">{document.amount} บาท</p>
            </div>
            <div className="flex items-center p-4 border border-gray-300 rounded-md bg-green-100 ">
              <label className="font-bold mr-2 text-green-800">หมายเหตุ :</label>
              <p className="m-0 text-green-900">{document.note}</p>
            </div>
          </div>
        </div>
        {['admin','checker'].includes(session.pea.role)&&<ChangeStatus documentId={document.id} nextStatus={nextStatus}/>}
        {document.status.map((val, i) => {
          return (
            <div key={i} className="flex flex-row flex-wrap gap-1 mt-3">
              <span> ๐ </span>
              <span>{dateFormat(val.date)}</span>
              <span>{val.name}</span>
              <span>{val.note}</span>
              <span>{val.updatedByUser.name}</span>
              {val.name != "รอเอกสารต้นฉบับ" &&session.pea && ['admin','checker'].includes(session.pea?.role) && <DeleteStatus statusId={val.id}/>}
            </div>
          );
        })}
      </div>
    );
  } catch (e) {
    return <div>ไม่พบเอกสาร</div>;
  }
}
