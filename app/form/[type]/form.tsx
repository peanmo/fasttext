"use client";

import { Session } from "next-auth";
import { useFormState } from "react-dom";
import { useRef } from "react";
import { addDocument } from "./action";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

const initialState = {
  message: "",
  err: false,
};

const typeMapping: { [key: string]: string } = {
  thousand: "จัดซื้อจัดจ้างเกิน 1 แสน",
  procurement: "จัดซื้อจัดจ้าง",
  benefit: "สวัสดิการ",
  guarantee: "คืนค่าประกัน",
};

export default function FormDocument({
  session,
  type,
}: {
  session: Session;
  type: string;
}) {
  const [state, formAction] = useFormState(addDocument, initialState);
  const formRef = useRef<HTMLFormElement>(null); // สร้าง ref เพื่อเก็บอ้างอิงฟอร์ม

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("type", type);
    formAction(formData);

    // รีเซ็ตฟอร์มหลังจากการส่งข้อมูล
    if (formRef.current) {
      formRef.current.reset(); // รีเซ็ตฟอร์มโดยใช้ ref
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "บันทึกข้อมูลเรียบร้อย",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const displayType = typeMapping[type] || type;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="docNo"
            className="block text-sm font-medium text-gray-700"
          >
            เลขที่เอกสาร
          </label>
          <input
            name="docNo"
            type="text"
            value={!state.err ? state.message : ""}
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            ประเภทเอกสาร
          </label>
          <input
            name="type"
            type="text"
            value={displayType}
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            ผู้ส่ง
          </label>
          <input
            name="username"
            type="text"
            value={session.pea?.name}
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-gray-700"
          >
            จาก
          </label>
          <input
            name="section"
            type="text"
            value={session.pea?.section.shortName}
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="toSection"
            className="block text-sm font-medium text-gray-700"
          >
            ถึง
          </label>
          <input
            name="toSection"
            type="text"
            value="ผสน."
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            ชื่อเอกสาร
          </label>
          <input
            name="name"
            type="text"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            จำนวนเงิน
          </label>
          <input
            name="amount"
            type="text"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            หมายเหตุ
          </label>
          <input
            name="note"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          ยืนยัน
        </button>
      </form>
      {state.err && (
        <p className="mt-4 text-red-500 text-center">{state.message}</p>
      )}
    </div>
  );
}
