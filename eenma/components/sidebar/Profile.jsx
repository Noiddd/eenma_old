"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useEffect } from "react";

import SupabaseBrowser from "@/lib/supabase/SupabaseBrowser";

import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import useUser from "@/hooks/useUser";

export default function Profile() {
  const supabase = SupabaseBrowser();
  const router = useRouter();

  const { setTheme } = useTheme();

  // log out function
  const handleLogOut = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("error on sign out");
      console.log(error);
      return;
    }

    router.push("/");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const { isFetching, data: userData } = useUser();

  console.log("user info");
  console.log(userData);

  return (
    <div className="mt-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isFetching ? (
            <div>test</div>
          ) : (
            <Avatar>
              <AvatarImage src={userData[0]?.image_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48"
          align="start"
          alignOffset={11}
          forceMount
        >
          {isFetching ? (
            <div>test</div>
          ) : (
            <div className="flex flex-col space-y-4 p-2">
              <p className="text-xs font-medium leading-none text-muted-foreground">
                {userData[0]?.email}
              </p>
              <div className="flex items-center gap-x-2">
                <div className="rounded-md bg-secondary p-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData[0]?.image_url} />
                  </Avatar>
                </div>
                <div className="space-y-1">
                  <p className="text-sm line-clamp-1">
                    {userData[0]?.display_name}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full text-muted-foreground text-xs cursor-default"
            onClick={handleSettings}
          >
            <div role="button cursor-default">Settings</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-muted-foreground text-xs cursor-default">
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="text-muted-foreground text-xs cursor-default"
                  onClick={() => setTheme("light")}
                >
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-muted-foreground text-xs cursor-default"
                  onClick={() => setTheme("dark")}
                >
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="w-full text-muted-foreground text-xs cursor-default"
            onClick={handleLogOut}
          >
            <div role="button cursor-default">Log out</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
