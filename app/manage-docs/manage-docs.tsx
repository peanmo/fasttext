"use client";

import { DocsWithStatus, searchDocsByStatus, setNewStatus } from "./action";
import { allStatusList } from "@/lib/status-state";
import { typeMapping, allTypeDoc } from "@/lib/doctype-map";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// กำหนดค่าเริ่มต้นสำหรับ state ของเอกสาร
const initialDocs: { docs: DocsWithStatus[]; nextStatus: string[] } = {
  docs: [],
  nextStatus: [],
};

export default function ManageDocs() {
  // State สำหรับเก็บข้อมูลเอกสารและสถานะที่สามารถเปลี่ยนได้
  const [docsAndNextStatus, setDocsAndNextStatus] = useState(initialDocs);
  // State สำหรับเก็บ ID ของเอกสารที่ถูกเลือก
  const [selectedId, setSelectedId] = useState<string[]>([]);
  // State สำหรับเก็บ ID ของเอกสารที่ไม่ถูกเลือก
  const [deselectedId, setDeselectedId] = useState<string[]>([]);
  // Ref สำหรับฟอร์มค้นหา
  const formQueryRef = useRef<HTMLFormElement>(null);
  // Hook สำหรับ navigation
  const router = useRouter();
  // State สำหรับแสดงสถานะ loading
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันสำหรับเลือกเอกสาร
  const handleSelect = (id: string) => {
    setSelectedId([...selectedId, id]);
    setDeselectedId(deselectedId.filter((val) => val != id));
  };

  // ฟังก์ชันสำหรับยกเลิกการเลือกเอกสาร
  const handleDeselect = (id: string) => {
    setDeselectedId([...deselectedId, id]);
    setSelectedId(selectedId.filter((val) => val != id));
  };

  // ฟังก์ชันสำหรับส่งข้อมูลการเปลี่ยนสถานะ
  const handleSubmitStatus = async (e: FormData) => {
    let form = e;
    for (const id of selectedId) {
      form.append("ids", id);
    }
    const result = await setNewStatus(form);
    if (result.err) {
      console.log(result.message);
    }else {
      // แสดง SweetAlert2 เมื่อเปลี่ยนสถานะสำเร็จ
      Swal.fire({
        icon: 'success',
        title: 'เปลี่ยนสถานะสำเร็จ',
        text: 'สถานะของเอกสารได้ถูกอัพเดทแล้ว',
      });
    }
    // รีเซ็ต state และฟอร์มหลังจากส่งข้อมูล
    setSelectedId([]);
    setDeselectedId([]);
    setDocsAndNextStatus(initialDocs);
    if (formQueryRef.current) {
      formQueryRef.current.reset();
    }
    router.refresh();
  };

  // ฟังก์ชันสำหรับค้นหาเอกสาร
  const handleQuery = async (e: FormData) => {
    setIsLoading(true);
    setDocsAndNextStatus(await searchDocsByStatus(e));
    setIsLoading(false);
  };

  // useEffect สำหรับอัพเดท state ของเอกสารที่ไม่ถูกเลือกเมื่อข้อมูลเอกสารมีการเปลี่ยนแปลง
  useEffect(() => {
    let ids = docsAndNextStatus.docs.map((val) => val.id);
    setDeselectedId(ids);
    setSelectedId([]);
  }, [docsAndNextStatus]);

  // useMemo สำหรับคำนวณเอกสารที่ถูกเลือก
  const selectedDocs = useMemo(() => {
    return docsAndNextStatus.docs.filter((val) => selectedId.includes(val.id));
  }, [selectedId, docsAndNextStatus.docs]);

  // useMemo สำหรับคำนวณเอกสารที่ไม่ถูกเลือก
  const deselectedDocs = useMemo(() => {
    return docsAndNextStatus.docs.filter((val) => !selectedId.includes(val.id));
  }, [selectedId, docsAndNextStatus.docs]);

  // ฟังก์ชันสำหรับ render การ์ดเอกสาร
  const renderDocCard = (doc: DocsWithStatus, isSelected: boolean) => (
    <div key={doc.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">{doc.docNo}/{doc.year}</span>
        <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">{typeMapping.get(doc.type) || doc.type}</span>
      </div>
      <p className="text-gray-600 mb-1">ผู้ขอ: {doc.name}</p>
      <p className="text-gray-600 mb-1">จำนวนเงิน: {doc.amount.toLocaleString()} บาท</p>
      <p className="text-gray-600 mb-1">แผนก: {doc.fromSection.name}</p>
      <p className="text-gray-600 mb-2">ผู้รับผิดชอบ: {doc.user.name}</p>
      <button
        onClick={() => isSelected ? handleDeselect(doc.id) : handleSelect(doc.id)}
        className={`w-full p-2 ${
          isSelected ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        } text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
      >
        {isSelected ? "ยกเลิกการเลือก" : "เลือกเอกสารนี้"}
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 shadow-lg rounded-xl">
      {/* ส่วนฟอร์มค้นหา */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">จัดการเอกสาร</h2>
        <form
          ref={formQueryRef}
          action={handleQuery}
          className="space-y-4"
        >
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value={val} key={i}>{val}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value={val} key={i}>{typeMapping.get(val) || val}</option>
              ))}
            </select>
          </div>

          <button className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            ค้นหาเอกสาร
          </button>
        </form>
      </div>

      {/* ส่วนแสดงผลการค้นหา */}
      {isLoading ? (
        <div className="md:col-span-2 flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* ส่วนแสดงเอกสารที่ยังไม่ได้เลือก */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-3">เอกสารที่ยังไม่ได้เลือก</h3>
            {deselectedDocs.map((doc) => renderDocCard(doc, false))}
          </div>

          {/* ส่วนแสดงเอกสารที่เลือกแล้ว */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-3">เอกสารที่เลือกแล้ว</h3>
            {selectedDocs.map((doc) => renderDocCard(doc, true))}
          </div>

          {/* ส่วนฟอร์มเปลี่ยนสถานะ */}
          {selectedDocs.length !== 0 && docsAndNextStatus.nextStatus.length !== 0 && (
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
              <form action={handleSubmitStatus} className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
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
                      <option key={i} value={val}>{val}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
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