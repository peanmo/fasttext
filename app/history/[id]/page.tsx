import { authOptions } from "@/auth-options";
import { dateFormat } from "@/lib/date-format";
import { typeMapping } from "@/lib/doctype-map";
import prisma from "@/lib/prisma";
import { getNextStatusArr } from "@/lib/status-state";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChangeStatus from "./change-status";
import DeleteStatus from "./delete-status";
import { 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  CurrencyDollarIcon,
  UserIcon,
  PaperAirplaneIcon,
  PencilIcon,
  CogIcon,
  DocumentDuplicateIcon,
  CheckBadgeIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

async function getDocument(id: string) {
  const document = await prisma.document.findFirst({
    where: {  
      id,
    },
    select: {
      status: {
        orderBy: {
          date: "desc",
        },
        select: {
          id: true,
          name: true,
          date: true,
          note: true,
          updatedByUser: {
            select: {
              name: true,
            },
          },
        },
      },
      id: true,
      docNo: true,
      year: true,
      type: true,
      name: true,
      amount: true,
      note: true,
      fromSection: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return document;
}

interface Status {
  id: string;
  name: string;
  date: Date;
  note: string | null;
  updatedByUser: {
    name: string;
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.pea) {
    redirect("/");
  }

  try {
    const document = await getDocument(params.id);
    if (!document || !document.status || document.status.length == 0) {
      return <div>ไม่พบเอกสาร</div>;
    }

    const nextStatus = getNextStatusArr(document.status[0].name);
    const currentStatus = document.status[0].name;
    
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 pt-20 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">รายละเอียดเอกสาร</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-purple-600">ชื่อ-สกุล / เรื่อง</h3>
          <p className="text-gray-800">{document.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <InfoItem label="เลขที่เอกสาร" value={`${document.docNo}/${document.year}`} />
          <InfoItem label="ประเภทเอกสาร" value={typeMapping.get(document.type) || document.type} />
          <InfoItem label="ผู้ส่ง" value={document.user.name} />
          <InfoItem label="จาก" value={document.fromSection.name} />
          <InfoItem label="จำนวนเงิน" value={`${document.amount} บาท`} />
          <InfoItem label="หมายเหตุ" value={document.note || "-"} />
        </div>

        {['admin','checker'].includes(session.pea.role) && <ChangeStatus documentId={document.id} nextStatus={nextStatus}/>}

        <div className="mb-4 text-lg font-semibold text-purple-700">
          สถานะปัจจุบัน: {currentStatus}
        </div>

        <div className="relative border-l-4 border-purple-200 ml-6 pl-6">
          {document.status.map((val, i) => (
            <TimelineItem 
              key={i} 
              status={val} 
              isLast={i === document.status.length - 1}
            />
          ))}
        </div>

        
      </div>
    );
  } catch (e) {
    return <div>ไม่พบเอกสาร</div>;
  }
}

interface InfoItemProps {
  label: string;
  value: string | number;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="bg-gray-100 p-3 rounded">
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}

interface TimelineItemProps {
  status: Status;
  isLast: boolean;
}

function TimelineItem({ status, isLast }: TimelineItemProps) {
  const Icon = getIcon(status.name);

  return (
    <div className="mb-8 relative pl-8">
      <div className="absolute -left-6 mt-1.5">
        <div className="bg-white p-1 rounded-full border-4 border-purple-200">
          <Icon className="w-6 h-6 text-purple-500" />
        </div>
      </div>
      <time className="mb-1 ms-6 text-sm font-normal leading-none text-gray-400">
        {dateFormat(status.date)}
      </time>
      <h3 className="text-lg font-semibold text-gray-900">{status.name}</h3>
      {status.note && <p className="text-base font-normal text-gray-500">{status.note}</p>}
      <p className="text-sm text-gray-500">โดย: {status.updatedByUser.name}</p>
      {!isLast && <div className="absolute h-full w-0.5 bg-purple-200 left-3 top-8"></div>}
    </div>
  );
}

function getIcon(name:string) {
  switch(name) {
    case "กำลังดำเนินการเข้าระบบ":
      return CogIcon;
    case "รอเอกสารต้นฉบับ":
      return DocumentTextIcon;
    case "รับเอกสารต้นฉบับ":
      return PaperAirplaneIcon;
    case "คีย์ข้อมูลเอกสาร":
      return PencilIcon;
    case "เอกสารตรวจสอบเรียบร้อย":
      return CheckCircleIcon;
    case "ดำเนินการขออนุมัติในระบบ":
      return ClockIcon;
    case "ดำเนินการประมวลผลในระบบ SAP":
      return CogIcon;
    case "ใบสำคัญจ่ายรอเอกสาร":
      return DocumentDuplicateIcon;
    case "ใบสำคัญจ่ายรอเบิกจ่ายเงิน":
      return CurrencyDollarIcon;
    case "เงินจ่ายเสร็จสิ้น":
      return CheckBadgeIcon;
    default:
      return InformationCircleIcon;
  }
}