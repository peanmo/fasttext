import LoadingButton from "@/app/component/loading-button";

export default function Loading(){
    return(
        <main className="flex min-h-screen flex-col items-center p-24 bg-slate-300">
            <p className="text-2xl font-bold mb-6">เพิ่มแผนก</p>
            <form className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="name" className="mb-2">ชื่อแผนก : </label>
                <input disabled type="text" name="name" required className="mb-4 p-2 border rounded-md shadow-sm bg-gray-200 animate-pulse"/>
                <label htmlFor="shortName" className="mb-2">ตัวย่อแผนก : </label>
                <input disabled type="text" name="shortName" required className="mb-4 p-2 border rounded-md shadow-sm bg-gray-200 animate-pulse"/>
                <LoadingButton label="เพิ่มแผนก"/>
            </form>
            <p className="text-2xl font-bold mb-6">รายการแผนกที่มี</p>
        </main>
    )
}