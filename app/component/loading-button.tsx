export default function LoadingButton({label}:{label?:string}) {
    return (
      <button type="submit" disabled className={`w-full bg-black hover:bg-black text-white py-2 px-4 rounded-md `}>
        {label||"ยืนยัน"}
      </button>
    )
  }