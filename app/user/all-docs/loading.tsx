import LoadingButton from "@/app/component/loading-button";

export default function Loading(){
    return (
        <div className="flex flex-col gap-3">
            <h1>เอกสารของคุณทั้งหมด</h1>
            <div className="p-3">
            <form
                className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md"
            >
                <p className="text-lg font-semibold">วันที่สร้าง</p>
                <label htmlFor="startDate" className="text-gray-700">
                เริ่มต้น
                </label>
                <input
                disabled
                required
                name="startDate"
                type="date"
                className="border rounded-md p-2 bg-gray-200 animate-pulse"
                />

                <label htmlFor="endDate" className="text-gray-700">
                สิ้นสุด
                </label>
                <input
                disabled
                required
                name="endDate"
                type="date"
                className="border rounded-md p-2 bg-gray-200 animate-pulse"
                />

                <label htmlFor="type" className="text-gray-700">
                ประเภทเอกสาร
                </label>
                <select
                disabled
                name="type"
                defaultValue="all"
                className="border rounded-md p-2 bg-gray-200 animate-pulse"
                >
                <option value="all">ทั้งหมด</option>
                </select>
                <LoadingButton label="ค้นหา"/>
            </form>
            </div>     
        </div>
    )
}