import SupabaseServer from "@/lib/supabase/SupabaseServer";

import { NextResponse } from "next/server";

export async function POST(req) {
  const supabase = SupabaseServer();

  const postObj = await req.json();

  console.log("this is postObj");
  console.log(postObj);

  let { data: taskData, error: taskDataError } = await supabase
    .from("posts")
    .insert([
      {
        id: postObj.id,
        user_id: taskObj.description,
        post_id: taskObj.priority,
        post_name: taskObj.dueDate,
        priority_order: taskObj.priority_order,
        completed: taskObj.completed,
      },
    ])
    .select();

  if (taskDataError) {
    console.log("error in post task call");
    console.log(taskDataError);
  } else if (taskObj.salesLink.length != 0) {
    console.log("success in post task call");
    console.log(taskData);

    let taskLinkArr = [];
    const taskId = taskData[0].id;

    for (let link of taskObj.salesLink) {
      taskLinkArr = [
        ...taskLinkArr,
        {
          task_id: taskId,
          sales_id: link.id,
        },
      ];
    }

    console.log("this is task link arr");
    console.log(taskLinkArr);

    let { data: taskSalesLink, error: taskSalesLinkError } = await supabase
      .from("sales_tasks")
      .insert(taskLinkArr)
      .select();

    if (taskSalesLinkError) {
      console.log("error in post sales task link call");
      console.log(taskSalesLinkError);
    } else if (taskSalesLink) {
      console.log("success in post sales task link call");
      console.log(taskSalesLink);
    }
  }

  return NextResponse.json(taskData);
}
