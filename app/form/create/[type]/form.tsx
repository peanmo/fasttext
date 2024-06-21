"use client";

import { Session } from "next-auth";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { addDocument } from "./action";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { typeMapping } from "@/lib/doctype-map";
import FormComponent from "@/app/component/form";


const initialState = {
  message: "",
  err: true,
};

export default function FormDocument({
  session,
  type,
}: {
  session: Session;
  type: string;
}) {
  const router = useRouter()
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
  };

  const displayType = typeMapping.get(type) || type;

  useEffect(()=>{
    if(!state.err){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push(`/history/${state.message}`)
    }
  },[state])

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <FormComponent 
        ref={formRef} 
        handleSubmit={handleSubmit}
        state={state}
        username={session.pea?session.pea.name:""}
        type={displayType}
        fromSection={session.pea?session.pea.section.name:""}
      />
      {state.err && (
        <p className="mt-4 text-red-500 text-center">{state.message}</p>
      )}
    </div>
  );
}
