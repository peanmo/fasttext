import { StarIcon, DocumentIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="p-6 sm:p-10">
      <div className="flex items-center mb-2">
        <DocumentIcon className="h-8 w-8 text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">จัดการเอกสาร</h1>
      </div>
      <p className="text-gray-600 mb-8">ค้นหาและจัดการเอกสารรายบุคคล</p>

      <div className="flex items-center mb-4">
        <StarIcon className="h-6 w-6 text-gray-400 mr-2" />
        <h2 className="text-xl font-semibold text-gray-700">ค้นหาเอกสาร</h2>
      </div>
      <div className="p-4 bg-white shadow-md rounded-lg">
      <form className="flex flex-col gap-4">
        <p className="text-sm font-medium text-gray-700">วันที่สร้าง</p>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          เริ่มต้น
        </label>
        <input
          disabled
          name="startDate"
          type="date"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          สิ้นสุด
        </label>
        <input
          disabled
          name="endDate"
          type="date"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          ชื่อพนักงาน
        </label>
        <input
          disabled
          name="name"
          type="text"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          ประเภทเอกสาร
        </label>
        <select
          disabled
          name="type"
          defaultValue="all"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">ทั้งหมด</option>
        </select>

        <p className="text-sm font-medium text-gray-700">เลขที่เอกสาร</p>
        <label
          htmlFor="startDocNo"
          className="block text-sm font-medium text-gray-700"
        >
          เริ่มต้น
        </label>
        <input
          disabled
          name="startDocNo"
          defaultValue="1"
          type="number"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="endDocNo"
          className="block text-sm font-medium text-gray-700"
        >
          สิ้นสุด
        </label>
        <input
          disabled
          name="endDocNo"
          type="number"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          ปี
        </label>
        <input
          disabled
          name="year"
          type="number"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            ค้นหา
          </span>
        </button>
      </form>
    </div>
    </div>
  );
}
