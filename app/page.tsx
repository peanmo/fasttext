export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-400">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-xl font-bold mb-2">สวัสดิการ</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-xl font-bold mb-2">จัดซื้อจัดจ้าง</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-xl font-bold mb-2">
            จัดซื้อจัดจ้างวงเงินเกิน 1 แสน
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-xl font-bold mb-2">คืนค่าประกัน</div>
        </div>
      </div>
    </main>
  );
}
