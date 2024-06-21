"use client";

import { RefObject } from "react";

export default function FormComponent({
  ref,
  handleSubmit,
  state,
  username,
  fromSection,
  type,
  name,
  note,
  amount,
  docNo
}: {
  ref?: RefObject<HTMLFormElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  state: { err: boolean; message: string };
  username: string;
  fromSection: string;
  type: string
  name?:string,
  note?:string,
  amount?:string
  docNo?:string
}) {
  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
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
          value={docNo ? docNo : ""}
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
          value={type}
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
          value={username}
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
          value={fromSection}
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
          defaultValue={name?name:""}
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
          defaultValue={amount?amount:""}
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
          defaultValue={note?note:""}
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
  );
}
