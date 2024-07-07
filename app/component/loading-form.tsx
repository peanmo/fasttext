import LoadingButton from "./loading-button";

export default function LoadingFormComponent() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 h-8">
        </h2>
        <form className="space-y-4">
        <div className="form-group">
            <label
            htmlFor="docNo"
            className="block text-sm font-medium text-gray-700"
            >
            เลขที่เอกสาร
            </label>
            <input
            name="docNo"
            type="text"
            value=""
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <div className="form-group">
            <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
            >
            ประเภทเอกสาร
            </label>
            <input
            name="type"
            type="text"
            value=""
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <div className="form-group">
            <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
            >
            ผู้ส่ง
            </label>
            <input
            name="username"
            type="text"
            value=""
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <div className="form-group">
            <label
            htmlFor="section"
            className="block text-sm font-medium text-gray-700"
            >
            จาก
            </label>
            <input
            name="section"
            type="text"
            value=""
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <div className="form-group">
            <label
            htmlFor="toSection"
            className="block text-sm font-medium text-gray-700"
            >
            ถึง
            </label>
            <input
            name="toSection"
            type="text"
            value="ผสน."
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <div className="form-group">
            <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
            >
            ชื่อเอกสาร
            </label>
            <input
            name="name"
            type="text"
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <div className="form-group">
            <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
            >
            จำนวนเงิน
            </label>
            <input
            name="amount"
            type="text"
            disabled
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <div className="form-group">
            <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
            >
            หมายเหตุ
            </label>
            <input
            name="note"
            disabled
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 animate-pulse"
            />
        </div>
        <LoadingButton/>
        </form>
    </div>
  );
}
