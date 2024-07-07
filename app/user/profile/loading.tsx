import LoadingButton from "@/app/component/loading-button";
import Link from "next/link";

export default function Loading(){
    return(
        <div>
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    แก้ไขข้อมูลส่วนตัว
                </h2>
                <form className="space-y-4">
                    <div className="form-group">    
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">ชื่อผู้ใช้</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse" required type="text" name="name" disabled/>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="tel">หมายเลขโทรศัพท์</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse" type="text" name="name" disabled/>
                    </div>
                    <div className="form-group">
                    <label  htmlFor="sectionId" className="block text-sm font-medium text-gray-700">สังกัด</label>
                    <select name="sectionId" defaultValue="" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse">
                        <option value="">โปรดเลือกแผนก</option>
                    </select>
                    </div>
                    <span className="block text-sm font-medium text-red-400"></span>
                    <span className="block text-sm font-medium text-green-400"></span>
                    <LoadingButton />
                </form>
                <h2 className="text-2xl font-bold mt-6 mb-6 text-center text-gray-800">
                    แก้ไขรหัสผ่าน
                </h2>
                <form className="space-y-4 mb-6">
                    <div className="form-group"> 
                        <label className="block text-sm font-medium text-gray-700" htmlFor="oldPassword">รหัสผ่านเดิม</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse" type="password" name="oldPassword" disabled required/>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">รหัสผ่านใหม่</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse" type="password" name="newPassword" disabled required/>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="confirmedPassword">ยืนยันรหัสผ่าน</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse" type="password" name="confirmedPassword" disabled required/>
                    </div>
                    <span className="block text-sm font-medium text-red-400"></span>
                    <span className="block text-sm font-medium text-green-400"></span>
                    <LoadingButton/>
                </form>
                <Link className="mx-auto w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" href={"/"}> กลับหน้าหลัก </Link>
            </div>
        </div>
    )
}