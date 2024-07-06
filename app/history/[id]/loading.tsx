import { 
    ArrowPathIcon
  } from '@heroicons/react/24/solid';

export default function Loading(){
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 pt-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">รายละเอียดเอกสาร</h2>
            
            <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-purple-600">ชื่อ-สกุล / เรื่อง</h3>
            <p className="text-gray-800 h-4"></p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
            <InfoItem label="เลขที่เอกสาร"  />
            <InfoItem label="ประเภทเอกสาร"  />
            <InfoItem label="ผู้ส่ง"  />
            <InfoItem label="จาก"  />
            <InfoItem label="จำนวนเงิน  บาท" />
            <InfoItem label="หมายเหตุ"  />
            </div>
            <div className="mb-4 text-lg font-semibold text-purple-700">
                สถานะปัจจุบัน: 
            </div>

            <div className="relative border-l-4 border-purple-200 ml-6 pl-6">
                <TimelineItem/>
            </div>
        </div>
    )
}


  
  function InfoItem({ label}: {label:string}) {
    return (
      <div className="bg-gray-100 p-3 rounded">
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <p className="text-gray-800 h-4"></p>
      </div>
    );
  }

  function TimelineItem() {
  
    return (
      <div className="mb-8 relative pl-8">
        <div className="absolute -left-6 mt-1.5">
          <div className="bg-white p-1 rounded-full border-4 border-purple-200">
            <ArrowPathIcon className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <time className="mb-1 ms-6 text-sm font-normal leading-none text-gray-400 h-4">
          
        </time>
        <h3 className="text-lg font-semibold text-gray-900 h-4"></h3>
        <p className="text-base font-normal text-gray-500 h-4"></p>
        <p className="text-sm text-gray-500 h-4">โดย: </p>
        <div className="absolute -left-6 mt-1.5">
          <div className="bg-white p-1 rounded-full border-4 border-purple-200">
            <ArrowPathIcon className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <time className="mb-1 ms-6 text-sm font-normal leading-none text-gray-400 h-4">
          
        </time>
        <h3 className="text-lg font-semibold text-gray-900 h-4"></h3>
        <p className="text-base font-normal text-gray-500 h-4"></p>
        <p className="text-sm text-gray-500 h-4">โดย: </p>
        <div className="absolute -left-6 mt-1.5">
          <div className="bg-white p-1 rounded-full border-4 border-purple-200">
            <ArrowPathIcon className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <time className="mb-1 ms-6 text-sm font-normal leading-none text-gray-400 h-4">
          
        </time>
        <h3 className="text-lg font-semibold text-gray-900 h-4"></h3>
        <p className="text-base font-normal text-gray-500 h-4"></p>
        <p className="text-sm text-gray-500 h-4">โดย: </p>
        <div className="absolute -left-6 mt-1.5">
          <div className="bg-white p-1 rounded-full border-4 border-purple-200">
            <ArrowPathIcon className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <time className="mb-1 ms-6 text-sm font-normal leading-none text-gray-400 h-4">
          
        </time>
        <h3 className="text-lg font-semibold text-gray-900 h-4"></h3>
        <p className="text-base font-normal text-gray-500 h-4"></p>
        <p className="text-sm text-gray-500 h-4">โดย: </p>
        <div className="absolute -left-6 mt-1.5">
          <div className="bg-white p-1 rounded-full border-4 border-purple-200">
            <ArrowPathIcon className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <time className="mb-1 ms-6 text-sm font-normal leading-none text-gray-400 h-4">
          
        </time>
        <h3 className="text-lg font-semibold text-gray-900 h-4"></h3>
        <p className="text-base font-normal text-gray-500 h-4"></p>
        <p className="text-sm text-gray-500 h-4">โดย: </p>
        <div className="absolute h-full w-0.5 bg-purple-200 left-3 top-8"></div>
      </div>
    );
  }