/* eslint-disable @typescript-eslint/no-explicit-any */
import accountApiRequest from "@/apiRequests/account";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;
  let name = "";
  try {
    const result = await accountApiRequest.sMe(accessToken);
    name = result?.payload.data.name;
  } catch (error: any) {
    if (error.digest?.includes("NEXT_REDIRECT")) throw error;
  }
  return <div>Dashboard {name}</div>;
}

// 'use client'

// import { useAccountMe } from "@/queries/useAccount";

// export default  function Dashboard() {
//   const { data } = useAccountMe();
//   const result = data?.payload.data.name;

//   return <div>Dashboard {result}</div>;
// }
