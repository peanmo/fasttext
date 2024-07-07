import { useFormStatus } from "react-dom"

export default function SubmitButton({label,pendingLabel}:{label?:string,pendingLabel?:string}) {
    const { pending } = useFormStatus()
    return (
      <button type="submit" disabled={pending} className={`w-full ${pending?"bg-black hover:bg-black ":" bg-blue-500 hover:bg-blue-600 "} text-white py-2 px-4 rounded-md `}>
        {pending?pendingLabel||"กำลังส่ง":label||"ยืนยัน"}
      </button>
    )
  }