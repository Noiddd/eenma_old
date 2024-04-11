"use server";

import useUserSession from "@/hooks/useUserSession";
import { redirect } from "next/navigation";

export default async function Analytics() {
  const { data, error } = await useUserSession();

  if (error || !data?.user) {
    return redirect("/");
  }
  return <div>Analytics</div>;
}
