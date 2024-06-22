"use client";

import { DocsWithStatus, searchDocsByStatus, setNewStatus } from "./action";
import { allStatusList } from "@/lib/status-state";
import { typeMapping, allTypeDoc } from "@/lib/doctype-map";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const initialDocs: { docs: DocsWithStatus[]; nextStatus: string[] } = {
  docs: [],
  nextStatus: [],
};

export default function ManageDocs() {
  const [docsAndNextStatus, setDocsAndNextStatus] = useState(initialDocs);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [deselectedId, setDeselectedId] = useState<string[]>([]);
  const formQueryRef = useRef<HTMLFormElement>(null); // สร้าง ref เพื่อเก็บอ้างอิงฟอร์ม
  const router = useRouter();

  const handleSelect = (id: string) => {
    setSelectedId([...selectedId, id]);
    let ids: string[] = [];
    ids = deselectedId.filter((val) => {
      return val != id;
    });
    setDeselectedId(ids);
  };

  const handleDeselect = (id: string) => {
    setDeselectedId([...selectedId, id]);
    let ids: string[] = [];
    ids = selectedId.filter((val) => {
      return val != id;
    });
    setSelectedId(ids);
  };

  const handleSubmitStatus = async (e: FormData) => {
    let form = e;
    for (const id of selectedId) {
      form.append("ids", id);
    }
    const result = await setNewStatus(form);
    if (result.err) {
      console.log(result.message);
    }
    setSelectedId([]);
    setDeselectedId([]);
    setDocsAndNextStatus(initialDocs);
    if (formQueryRef.current) {
      formQueryRef.current.reset();
    }
    router.refresh();
  };

  const handleQuery = async (e: FormData) => {
    setDocsAndNextStatus(await searchDocsByStatus(e));
  };

  useEffect(() => {
    let ids: string[] = [];
    docsAndNextStatus.docs.forEach((val) => {
      ids.push();
    });
    setDeselectedId(ids);
    setSelectedId([]);
  }, [docsAndNextStatus]);

  const selectedDocs: DocsWithStatus[] = useMemo(() => {
    let d: DocsWithStatus[] = [];
    d = docsAndNextStatus.docs.filter((val) => {
      return selectedId.includes(val.id);
    });
    return d;
  }, [selectedId]);

  const deselectedDocs: DocsWithStatus[] = useMemo(() => {
    let d: DocsWithStatus[] = [];
    d = docsAndNextStatus.docs.filter((val) => {
      return !selectedId.includes(val.id);
    });
    return d;
  }, [selectedId]);
  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">
      <form
        ref={formQueryRef}
        action={handleQuery}
        className="p-4 flex flex-col gap-3"
      >
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          เลือกสถานะ
        </label>
        <select
          defaultValue=""
          name="status"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">โปรดเลือก....</option>
          {allStatusList.map((val, i) => (
            <option value={val} key={i}>
              {val}
            </option>
          ))}
        </select>

        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          เลือกประเภทเอกสาร
        </label>
        <select
          defaultValue="all"
          name="type"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">ทั้งหมด</option>
          {allTypeDoc.map((val, i) => (
            <option value={val} key={i}>
              {typeMapping.get(val) || val}
            </option>
          ))}
        </select>

        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          ค้นหาเอกสารสถานะนี้
        </button>
      </form>

      <p className="text-sm font-medium text-gray-700">เลือกเอกสาร</p>
      <div className="flex flex-col gap-2">
        {deselectedDocs.map((val) => (
          <div
            key={val.id}
            className="flex items-center gap-3 p-2 border rounded-md"
          >
            <span>
              {val.docNo}/{val.year}
            </span>
            <button
              onClick={() => handleSelect(val.id)}
              className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              เลือกเอกสารนี้
            </button>
          </div>
        ))}
      </div>

      <p className="text-sm font-medium text-gray-700">เอกสารที่เลือก</p>
      <div className="flex flex-col gap-2">
        {selectedDocs.map((val) => (
          <div
            key={val.id}
            className="flex items-center gap-3 p-2 border rounded-md"
          >
            <span>
              {val.docNo}/{val.year}
            </span>
            <button
              onClick={() => handleDeselect(val.id)}
              className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              ยกเลิกการเลือก
            </button>
          </div>
        ))}
      </div>

      {selectedDocs.length !== 0 &&
        docsAndNextStatus.nextStatus.length !== 0 && (
          <form
            action={handleSubmitStatus}
            className="flex flex-col gap-3 p-4 border rounded-md mt-4"
          >
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              เลือกสถานะถัดไป
            </label>
            <select
              name="status"
              defaultValue=""
              required
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">โปรดเลือก...</option>
              {docsAndNextStatus.nextStatus.map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))}
            </select>

            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              หมายเหตุ
            </label>
            <input
              type="text"
              name="note"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              ยืนยัน
            </button>
          </form>
        )}
    </div>
  );
}
