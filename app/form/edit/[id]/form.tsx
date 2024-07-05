"use client";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { editDocument } from "./action";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { typeMapping } from "@/lib/doctype-map";
import FormComponent from "@/app/component/form";
import { Status,Document,User,Section } from "@prisma/client";


const initialState = {
  message: "",
  err: true,
};

export default function FormDocument({
  doc,
}: {
  doc: Pick<Document,"docNo"|"year"|"amount"|"note"|"name"|"type"|"id"> & {status: Pick<Status,"name">[]} & {user: Pick<User,"id"|"name">} & {fromSection: Pick<Section,"name">};
}) {
  const router = useRouter()
  const [state, formAction] = useFormState(editDocument, initialState);
  const formRef = useRef<HTMLFormElement>(null); // สร้าง ref เพื่อเก็บอ้างอิงฟอร์ม

  const handleSubmit = (e: FormData) => {
    const formData = e
    formData.append("id", doc.id);
    formAction(formData);

    // รีเซ็ตฟอร์มหลังจากการส่งข้อมูล
    if (formRef.current) {
      formRef.current.reset(); // รีเซ็ตฟอร์มโดยใช้ ref
    }
  };

  const displayType = typeMapping.get(doc.type) || doc.type;

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
        username={doc.user.name}
        type={displayType}
        fromSection={doc.fromSection.name}
        docNo={`${doc.docNo}/${doc.year}`}
        name={doc.name}
        note={doc.note}
        amount={doc.amount.toString()}
      />
      {state.err && (
        <p className="mt-4 text-red-500 text-center">{state.message}</p>
      )}
    </div>
  );
}
