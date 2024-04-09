"use server";

import useUserSession from "@/hooks/useUserSession";
import Navigation from "./Navigation";
import Profile from "./Profile";

export default async function Sidebar() {
  const { data } = await useUserSession();

  return (
    <div className="flex flex-col fixed justify-between items-center sm:w-[110px] h-[55%] bg-backgrounda transition-all ease-in-out duration-100">
      {data.user && (
        <>
          <Profile />
          <Navigation />
        </>
      )}
    </div>
  );
}
