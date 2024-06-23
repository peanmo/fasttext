// DocumentTable.tsx
"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { getColumns } from "./tableColumns";
import DocumentCard from "./documentCard";
import { DocumentWithStatus } from "@/lib/types";
import { Session } from "next-auth";

export default function DocumentTable({
  documentsWithStatus,
  session,
}: {
  documentsWithStatus: DocumentWithStatus[];
  session: Session;
}) {
  const columns = getColumns(session);

  const paginationComponentOptions = {
    rowsPerPageText: "จำนวนรายการ",
    rangeSeparatorText: "ถึง",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="p-3">
      {/* แสดงผลแบบตาราง  */}
      <div className="hidden md:block overflow-x-auto">
        <DataTable
         fixedHeader
          columns={columns}
          data={documentsWithStatus}
          selectableRows
          pagination
          paginationComponentOptions={paginationComponentOptions}
          responsive
          highlightOnHover
          striped
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#EBF4FF",
                color: "#1D4ED8",
                fontWeight: "bold",
                // borderTopLeftRadius: "0.5rem", // เพิ่มขอบมนให้กับมุมซ้ายบนของหัวตาราง
                // borderTopRightRadius: "0.5rem",
              },
            },
            cells: {
              style: {
                paddingLeft: "20px", // override the cell padding for data cells
                paddingRight: "20px",
              },
            },
          }}
        />
      </div>
      {/* แสดงผลแบบcard */}
      <div className="block md:hidden">
        {documentsWithStatus.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
