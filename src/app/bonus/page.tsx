import React from "react";
import BonusDataGrid from "@/components/datagrid-bonus";
import dayjs from "dayjs";
import { getBonuses } from "@/libs/fetch";

async function Page() {
  const year = dayjs().year();
  const bonuses = await getBonuses({
    startDate: dayjs(`01-01-${year}`).toDate(),
    endDate: dayjs(`12-31-${year}`).toDate(),
  });

  return <BonusDataGrid bonuses={bonuses} />;
}

export default Page;
