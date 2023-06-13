import React from "react";
import UserDataGrid from "@/components/datagrid-user";
import { getUsers } from "@/libs/fetch";

async function Page() {
  const users = await getUsers();

  return <UserDataGrid users={users} />;
}

export default Page;
