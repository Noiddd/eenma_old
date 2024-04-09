"use server";

import useUserSession from "@/hooks/useUserSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function Inbox() {
  const { data, error } = await useUserSession();

  if (error || !data?.user) {
    return redirect("/");
  }
  return <div>Inbox</div>;
}
