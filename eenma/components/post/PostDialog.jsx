"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Button } from "../ui/button";
import Tus from "@uppy/tus";
import useUser from "@/hooks/useUser";
import SupabaseBrowser from "@/lib/supabase/SupabaseBrowser";
import { CaptionInput } from "./CaptionInput";

export default function PostDialog({ day }) {
  const [caption, setCaption] = useState("");

  const { data: user } = useUser();

  const onBeforeRequest = async (req) => {
    const supabase = SupabaseBrowser();
    const { data } = await supabase.auth.getSession();

    req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
  };

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1000 * 1000,
      },
    }).use(Tus, {
      endpoint:
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable",
      onBeforeRequest,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  );

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: "images",
      contentType: file.type,
    };
  });

  uppy.on("upload-success", () => {
    uppy.cancelAll();

    if (caption != "") {
      setCaption("");
    }
  });

  const handleUpload = () => {
    const randomUUID = crypto.randomUUID();

    console.log(uppy.getFiles()[0].name);

    uppy.setFileMeta(uppy.getFiles()[0].id, {
      objectName: user[0].id + "/" + randomUUID,
      // + "/" + uppy.getFiles()[0].name.trim(),
    });

    uppy.upload();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Post</DialogTitle>
        <DialogDescription>Schedule a post on {day.date}</DialogDescription>
      </DialogHeader>
      <div>
        <Dashboard uppy={uppy} hideUploadButton />
      </div>

      <DialogDescription>
        <CaptionInput
          placeholder="Write a caption..."
          value={caption}
          onInput={(e) => setCaption(e.target.value)}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </DialogDescription>
    </DialogContent>
  );
}
