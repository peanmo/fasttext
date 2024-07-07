export default function Loading() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            จัดการเอกสาร
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                เลือกสถานะ
              </label>
              <select
                defaultValue=""
                name="status"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">โปรดเลือก....</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                เลือกประเภทเอกสาร
              </label>
              <select
                defaultValue="all"
                name="type"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">ทั้งหมด</option>
              </select>
            </div>

            <button
              disabled
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              ค้นหาเอกสาร
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
