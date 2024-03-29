"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import SupabaseBrowser from "@/lib/supabase/SupabaseBrowser";
import { facebookLogin } from "@/lib/facebook/FacebookSDK";

export default function SettingsPage() {
  // const supabase = SupabaseBrowser();

  const handleClick = async () => {
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: "facebook",
    // });

    // console.log("facebook data");
    // console.log(data.url);

    console.log("reached log in button");
    facebookLogin();
  };

  // {provider: 'facebook', url: 'https://lxxifqhaibasuphpyffn.supabase.co/auth/v1/a…lTvIEZWKxyPWsWZrZ-N7Rw&code_challenge_method=s256'}
  return (
    <div>
      <Button onClick={handleClick}>Facebook</Button>
    </div>
  );
}
