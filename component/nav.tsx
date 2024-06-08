import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 text-white shadow-lg rounded-b-lg">
      <div className="flex-1">
        <div className="w-44">
          <img src="/logo.png" alt="Logo" />
        </div>
        <a className="btn btn-ghost text-xl">FAST TEXT</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="cursor-pointer hover:bg-gray-700 rounded-md p-2">
                Admin
              </summary>
              <ul className="p-2 bg-base-100 rounded-b-lg shadow-md">
                <li>
                  <a className="hover:bg-gray-700 rounded-md p-2">
                    จัดการ User
                  </a>
                </li>
                <li>
                  <a className="hover:bg-gray-700 rounded-md p-2">จัดการแผนก</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="cursor-pointer hover:bg-gray-700 rounded-md p-2">
                สร้างเอกสาร
              </summary>
              <ul className="p-2 bg-base-100 rounded-b-lg shadow-md">
                <li>
                  <a className="hover:bg-gray-700 rounded-md p-2">สวัสดิการ</a>
                </li>
                <li>
                  <a className="hover:bg-gray-700 rounded-md p-2">
                    จัดซื้อจัดจ้าง
                  </a>
                </li>
                <li>
                  <a className="hover:bg-gray-700 rounded-md p-2">
                    จัดซื้อจัดจ้างวงเงินเกิน 1 แสนบาท
                  </a>
                </li>
                <li>
                  <a className="hover:bg-gray-700 rounded-md p-2">
                    คืนค่าประกัน
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    className="rounded-full border-2 border-gray-600"
                  />
                </div>
              </summary>
              <ul className="p-2 bg-base-100 rounded-b-lg shadow-md">
                <li>
                  <a className="hover:bg-gray-700 rounded-md p-2">LOGOUT</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}
