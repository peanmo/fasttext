"use client";

import { dateInputFormat } from "@/lib/date-format";
import { allTypeDoc, typeMapping } from "@/lib/doctype-map";
import { Status, User, Document } from "@prisma/client";
import { useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { searchDocs } from "./action";
import DocumentTable from "../component/docs-table";
import { Session } from "next-auth";
import { DocumentWithStatus } from "@/lib/types";
import SubmitButton from "../component/submit-button";

export default function SearchDocs({ session }: { session: Session }) {
  const [docs, setDocs] = useState<DocumentWithStatus[]>([]);
  const defaultDate = useMemo(() => {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 30);
    end.setDate(end.getDate() + 1);
    const year = end.getFullYear() + 543;
    return {
      end: dateInputFormat(end),
      start: dateInputFormat(start),
      year: year.toString(),
    };
  }, []);

  const handleSearch = async (formData: FormData) => {
    const res = await searchDocs(formData);
    setDocs(res);
  };
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <form action={handleSearch} className="flex flex-col gap-4">
        <p className="text-sm font-medium text-gray-700">วันที่สร้าง</p>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          เริ่มต้น
        </label>
        <input
          name="startDate"
          type="date"
          defaultValue={defaultDate.start}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          สิ้นสุด
        </label>
        <input
          name="endDate"
          type="date"
          defaultValue={defaultDate.end}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          ชื่อพนักงาน
        </label>
        <input
          name="name"
          type="text"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          ประเภทเอกสาร
        </label>
        <select
          name="type"
          defaultValue="all"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">ทั้งหมด</option>
          {allTypeDoc.map((val, i) => (
            <option key={i} value={val}>
              {typeMapping.get(val) || val}
            </option>
          ))}
        </select>

        <p className="text-sm font-medium text-gray-700">เลขที่เอกสาร</p>
        <label
          htmlFor="startDocNo"
          className="block text-sm font-medium text-gray-700"
        >
          เริ่มต้น
        </label>
        <input
          name="startDocNo"
          defaultValue="1"
          type="number"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="endDocNo"
          className="block text-sm font-medium text-gray-700"
        >
          สิ้นสุด
        </label>
        <input
          name="endDocNo"
          type="number"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          ปี
        </label>
        <input
          name="year"
          type="number"
          defaultValue={defaultDate.year}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <SubmitButton label="ค้นหา" pendingLabel="กำลังค้นหา"/>
      </form>
      <DocumentTable documentsWithStatus={docs} session={session} />
    </div>
  );
}
