// DocumentCard.tsx
import React from "react";
import { dateFormat } from "@/lib/date-format";
import { DocumentWithStatus } from "@/lib/types";
import Link from "next/link";
import { Session } from "next-auth";

const DocumentCard = ({ document, session }: { document: DocumentWithStatus, session: Session }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div>
        <span className="font-bold">เลขที่เอกสาร: </span>
        {`${document.docNo}/${document.year}`}
      </div>
      <div>
        <span className="font-bold">วันที่: </span>
        {dateFormat(document.date)}
      </div>
      <div>
        <span className="font-bold">ประเภทเอกสาร: </span>
        {document.type}
      </div>
      <div>
        <span className="font-bold">ชื่อเอกสาร: </span>
        {document.name}
      </div>
      <div>
        <span className="font-bold">จำนวนเงิน: </span>
        {document.amount}
      </div>
      <div>
        <span className="font-bold">เจ้าของเอกสาร: </span>
        {document.user.name}
      </div>
      <div>
        <span className="font-bold">สถานะปัจจุบัน: </span>
        {document.status.length !== 0 && document.status[0].name}
      </div>
      <div>
        <Link href={`/history/${document.id}`}>
          <p className="text-blue-500 underline">
            {session.pea &&
              ["admin", "checker"].includes(session.pea.role) &&
              "จัดการ/"}
            ดูประวัติ เอกสาร
          </p>
        </Link>
        {document.status.length !== 0 &&
          document.status[0].name === "เอกสารส่งคืน/ตีกลับ" &&
          session.pea?.user === document.user.user && (
            <Link href="#">
              <p className="text-blue-500 underline">แก้ไขเอกสาร</p>
            </Link>
          )}
      </div>
    </div>
  );
};

export default DocumentCard;