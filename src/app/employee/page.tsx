import React from "react";
import EmployeeDataGrid from "@/components/datagrid-employee";
import { getEmployees } from "@/libs/fetch";

async function Page() {
  const employees = await getEmployees();

  return <EmployeeDataGrid employees={employees} />;
}

export default Page;
