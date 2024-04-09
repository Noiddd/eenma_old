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
// https://localhost:3000/analytics
// #access_token=EAAL9XQIFbiABOZCEZAIfX6NSOUq2zVMnkaduNZAhWUOZB0yJsb4jlZA6FEdZBQ9kRkeKZCm1vq2TpeRlc6jZCrYnrmxpQkxl4EuT2AZAnxuPXKbwnGvZC43J9puDSsxgx0omG0tbwzTzAu0YwbjCrVsckpLsND1AX5PHWP3ZBZA78klTZAF5UK7zikiKkmUbiPeOHKEZAQ2SiZCrt6r8FrmZAiKc
// &data_access_expiration_time=1720095446
// &expires_in=6154
// &long_lived_token=EAAL9XQIFbiABO0nzPM67ySTZCoBqSZBadKCZCajzjAWHZARzKr9ZCo2KwWEwo66RhmWgs5MsvPHvrWcaPn581edlxDZARY2giQv05lxSj76gHZCLN43L0f4LB9QOuyZBEKZCp7FD0OVioVB18ZAFtMxYQVxZA9TlxR2sa1Mtr63bq4KV9v5gTrBPXc5woAZD
