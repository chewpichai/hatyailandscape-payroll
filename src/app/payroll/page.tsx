import PayrollDataGrid from "@/components/datagrid-payroll";
import { getPayrolls } from "@/libs/fetch";
import { getDateRange } from "@/libs/utils";
import React from "react";

async function Page() {
  const [startDate, endDate] = getDateRange();
  const params = { startDate, endDate };
  const payrolls = await getPayrolls(params);

  return <PayrollDataGrid payrolls={payrolls} />;
}

export default Page;
