"use client"
import React from "react";

export default function Navbar() {
  return (
    <nav className=" bg-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shink-0">
              <a href="/" className=" text-white">
                FAST TEXT
              </a>
            </div>
          </div>
          <div className=" hidden md:block">
            <div className=" ml-4 flex items-start space-x-4">
              <a href="/" className=" bg-white text-black rounded-lg p-2">
                HOME
              </a>
              <a href="/" className=" bg-white text-black rounded-lg p-2">
                สวัสดิการ
              </a>
              <a href="/" className=" bg-white text-black rounded-lg p-2">
                จัดซื้อจัดจ้าง
              </a>
              <a href="/" className=" bg-white text-black rounded-lg p-2">
                จัดซื้อจัดจ้างเกิน 1 แสน
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
