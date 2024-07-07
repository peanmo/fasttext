export default function Loading(){
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-slate-300">
            <p className="text-2xl font-bold mb-6">เพิ่มผู้ใช้งาน</p>
            <form className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="user" className="mb-2">รหัสพนักงาน : </label>
                <input type="text" name="user" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="name" className="mb-2">ชื่อสกุล : </label>
                <input type="text" name="name" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="tel" className="mb-2">หมายเลขโทรศัพท์ : </label>
                <input type="text" name="tel" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="sectionId" className="mb-2">สังกัด : </label>
                <select name="sectionId" defaultValue="" required className="mb-4 p-2 border rounded-md shadow-sm">
                    <option value="">โปรดเลือกแผนก</option>
                </select>
                <label htmlFor="role" className="mb-2">ประเภทผู้ใช้งาน : </label>
                <select name="role" defaultValue="user" required className="mb-4 p-2 border rounded-md shadow-sm">
                    <option value="user">ผู้ใช้งานทั่วไป</option>
                    <option value="admin">Admin</option>
                    <option value="checker">ผู้ตรวจสอบเอกสาร</option>
                </select>
                <button type="submit" disabled className={`w-full  bg-blue-500 hover:bg-blue-600  text-white py-2 px-4 rounded-md `}>
                    ยืนยัน
                </button>
            </form>
            <p>รายชื่อผู้ใช้งาน</p>
        </main>
    )
}