"use client";

import { DocsWithStatus, searchDocsByStatus, setNewStatus } from "./action";
import { allStatusList } from "@/lib/status-state";
import { typeMapping, allTypeDoc } from "@/lib/doctype-map";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { XCircleIcon } from "@heroicons/react/24/solid";

const initialDocs: { docs: DocsWithStatus[]; nextStatus: string[] } = {
  docs: [],
  nextStatus: [],
};

export default function ManageDocs() {
  const [docsAndNextStatus, setDocsAndNextStatus] = useState(initialDocs);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [deselectedId, setDeselectedId] = useState<string[]>([]);
  const formQueryRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedId(prev => [...prev, id]);
    setDeselectedId(prev => prev.filter(val => val !== id));
  };

  const handleDeselect = (id: string) => {
    setDeselectedId(prev => [...prev, id]);
    setSelectedId(prev => prev.filter(val => val !== id));
  };

  const handleSelectAll = () => {
    const allIds = docsAndNextStatus.docs.map(doc => doc.id);
    setSelectedId(allIds);
    setDeselectedId([]);
  };

  const handleDeselectAll = () => {
    setSelectedId([]);
    setDeselectedId(docsAndNextStatus.docs.map(doc => doc.id));
  };

  const handleSubmitStatus = async (e: FormData) => {
    let form = e;
    for (const id of selectedId) {
      form.append("ids", id);
    }
    const result = await setNewStatus(form);
    if (result.err) {
      console.log(result.message);
    } else {
      Swal.fire({
        icon: "success",
        title: "เปลี่ยนสถานะสำเร็จ",
        text: "สถานะของเอกสารได้ถูกอัพเดทแล้ว",
      });
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
    setIsLoading(true);
    setDocsAndNextStatus(await searchDocsByStatus(e));
    setIsLoading(false);
  };

  useEffect(() => {
    let ids = docsAndNextStatus.docs.map((val) => val.id);
    setDeselectedId(ids);
    setSelectedId([]);
  }, [docsAndNextStatus]);

  const selectedDocs = useMemo(() => {
    return docsAndNextStatus.docs.filter((val) => selectedId.includes(val.id));
  }, [selectedId, docsAndNextStatus.docs]);

  const deselectedDocs = useMemo(() => {
    return docsAndNextStatus.docs.filter((val) => !selectedId.includes(val.id));
  }, [selectedId, docsAndNextStatus.docs]);

  const renderDocCard = (doc: DocsWithStatus, isSelected: boolean) => (
    <div
      key={doc.id}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
    >
      {isSelected && (
        <button
          onClick={() => handleDeselect(doc.id)}
          className="absolute top-[-10px] right-[-10px] text-red-600 hover:text-white hover:bg-red-600 rounded-full p-1 transition-colors duration-300 z-10"
          aria-label="ยกเลิกเอกสารนี้"
        >
          <XCircleIcon className="h-6 w-6" />
        </button>
      )}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">
          {doc.docNo}/{doc.year}
        </span>
        <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
          {typeMapping.get(doc.type) || doc.type}
        </span>
      </div>
      <p className="text-gray-600 mb-1">ผู้ขอ: {doc.name}</p>
      <p className="text-gray-600 mb-1">
        จำนวนเงิน: {doc.amount.toLocaleString()} บาท
      </p>
      <p className="text-gray-600 mb-1">แผนก: {doc.fromSection.name}</p>
      <p className="text-gray-600 mb-2">ผู้รับผิดชอบ: {doc.user.name}</p>
      {!isSelected && (
        <button
          onClick={() => handleSelect(doc.id)}
          className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          เลือกเอกสารนี้
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">จัดการเอกสาร</h2>
        <form ref={formQueryRef} action={handleQuery} className="space-y-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              เลือกสถานะ
            </label>
            <select
              defaultValue=""
              name="status"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">โปรดเลือก....</option>
              {allStatusList.map((val, i) => (
                <option value={val} key={i}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              เลือกประเภทเอกสาร
            </label>
            <select
              defaultValue="all"
              name="type"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">ทั้งหมด</option>
              {allTypeDoc.map((val, i) => (
                <option value={val} key={i}>
                  {typeMapping.get(val) || val}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            ค้นหาเอกสาร
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="md:col-span-2 flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">เอกสารที่ยังไม่ได้เลือก</h3>
              {deselectedDocs.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  เลือกทั้งหมด
                </button>
              )}
            </div>
            {deselectedDocs.map((doc) => renderDocCard(doc, false))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">เอกสารที่เลือกแล้ว</h3>
              {selectedDocs.length > 0 && (
                <button
                  onClick={handleDeselectAll}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  ยกเลิกการเลือกทั้งหมด
                </button>
              )}
            </div>
            {selectedDocs.map((doc) => renderDocCard(doc, true))}
          </div>

          {selectedDocs.length !== 0 &&
            docsAndNextStatus.nextStatus.length !== 0 && (
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <form action={handleSubmitStatus} className="space-y-4">
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      เลือกสถานะถัดไป
                    </label>
                    <select
                      name="status"
                      defaultValue=""
                      required
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">โปรดเลือก...</option>
                      {docsAndNextStatus.nextStatus.map((val, i) => (
                        <option key={i} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="note"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      หมายเหตุ
                    </label>
                    <input
                      type="text"
                      name="note"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    ยืนยันการเปลี่ยนสถานะ
                  </button>
                </form>
              </div>
            )}
        </>
      )}
    </div>
  );
}