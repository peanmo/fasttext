import LoadingButton from "@/app/component/loading-button";

export default function Loading(){
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-slate-300">
            <p className="text-2xl font-bold mb-6">เพิ่มผู้ใช้งาน</p>
            <form className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="user" className="mb-2">รหัสพนักงาน : </label>
                <input disabled type="text" name="user" required className="mb-4 p-2 border rounded-md shadow-sm bg-gray-200 animate-pulse"/>
                <label htmlFor="name" className="mb-2">ชื่อสกุล : </label>
                <input disabled type="text" name="name" required className="mb-4 p-2 border rounded-md shadow-sm bg-gray-200 animate-pulse"/>
                <label htmlFor="tel" className="mb-2">หมายเลขโทรศัพท์ : </label>
                <input disabled type="text" name="tel" required className="mb-4 p-2 border rounded-md shadow-sm bg-gray-200 animate-pulse"/>
                <label htmlFor="sectionId" className="mb-2">สังกัด : </label>
                <select disabled name="sectionId" defaultValue="" required className="mb-4 p-2 border rounded-md shadow-sm bg-gray-200 animate-pulse">
                    <option value="">โปรดเลือกแผนก</option>
                </select>
                <label htmlFor="role" className="mb-2">ประเภทผู้ใช้งาน : </label>
                <select disabled name="role" defaultValue="user" required className="mb-4 p-2 border rounded-md shadow-sm bg-gray-200 animate-pulse">
                    <option value="user">ผู้ใช้งานทั่วไป</option>
                    <option value="admin">Admin</option>
                    <option value="checker">ผู้ตรวจสอบเอกสาร</option>
                </select>
                <LoadingButton />
            </form>
            <p>รายชื่อผู้ใช้งาน</p>
        </main>
    )
}