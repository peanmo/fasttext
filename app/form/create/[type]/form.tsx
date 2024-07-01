"use client";

import { Session } from "next-auth";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { addDocument } from "./action";
import { typeMapping } from "@/lib/doctype-map";
import FormComponent from "@/app/component/form";

const initialState = {
  message: "",
  err: true,
};

interface FormDocumentProps {
  session: Session;
  type: string;
}

export default function FormDocument({ session, type }: FormDocumentProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(addDocument, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("type", type);
    formAction(formData);

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const displayType = typeMapping.get(type) || type;

  useEffect(() => {
    if (!state.err) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push(`/history/${state.message}`);
    }
  }, [state, router]);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {displayType}
      </h2>
      <FormComponent
        ref={formRef}
        handleSubmit={handleSubmit}
        state={state}
        username={session.pea?.name ?? ""}
        type={displayType}
        fromSection={session.pea?.section.name ?? ""}
      />
      {state.err && state.message && (
        <p className="mt-4 text-red-500 text-center font-semibold">
          {state.message}
        </p>
      )}
    </div>
  );
}