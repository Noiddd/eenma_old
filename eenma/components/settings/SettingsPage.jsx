"use client";

import React from "react";
import { Button } from "../ui/button";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div>
      <Link
        href={
          "http://www.facebook.com/v19.0/dialog/oauth?client_id=841525861117472&display=page&extras={'setup':{'channel':'IG_API_ONBOARDING'}}&redirect_uri=https://localhost:3000/analytics/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement"
        }
      >
        <Button>Login</Button>
      </Link>
    </div>
  );
}
