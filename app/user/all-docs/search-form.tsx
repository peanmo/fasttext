"use client";
import DocumentTable from "@/app/component/docs-table";
import { dateInputFormat } from "@/lib/date-format";
import { allTypeDoc, typeMapping } from "@/lib/doctype-map";
import { Session } from "next-auth";
import { useMemo, useState } from "react";
import { DocumentWithStatus } from "@/lib/types"
import { searchDocs } from "./action";
import SubmitButton from "@/app/component/submit-button";


export default function SearchDocs({ session }: { session: Session }) {
  const [docs,setDocs] = useState<DocumentWithStatus[]>([])
  const defaultDate = useMemo(() => {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 30);
    end.setDate(end.getDate()+1)
    const year = end.getFullYear() + 543;
    return {
      end: dateInputFormat(end),
      start: dateInputFormat(start),
      year: year.toString(),
    };
  }, []);

  const handleSearch = async (formData:FormData) => {
    const res = await searchDocs(formData)
    setDocs(res)
  }

  return (
    <div className="p-3">
      <form
        action={(formData) => handleSearch(formData) }
        className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md"
      >
        <p className="text-lg font-semibold">วันที่สร้าง</p>
        <label htmlFor="startDate" className="text-gray-700">
          เริ่มต้น
        </label>
        <input
          required
          name="startDate"
          type="date"
          defaultValue={defaultDate.start}
          className="border rounded-md p-2"
        />

        <label htmlFor="endDate" className="text-gray-700">
          สิ้นสุด
        </label>
        <input
          required
          name="endDate"
          defaultValue={defaultDate.end}
          type="date"
          className="border rounded-md p-2"
        />

        <label htmlFor="type" className="text-gray-700">
          ประเภทเอกสาร
        </label>
        <select
          name="type"
          defaultValue="all"
          className="border rounded-md p-2"
        >
          <option value="all">ทั้งหมด</option>
          {allTypeDoc.map((val, i) => (
            <option key={i} value={val}>
              {typeMapping.get(val) || val}
            </option>
          ))}
        </select>
        <SubmitButton label="ค้นหา" pendingLabel="กำลังค้นหา"/>
      </form>
      <DocumentTable session={session} documentsWithStatus={docs} />
    </div>
  );
}
