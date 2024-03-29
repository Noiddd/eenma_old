import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = [
    "/analytics",
    "/inbox",
    "/schedule",
    "/schedule/month",
    "/schedule/week",
    "/settings",
  ];

  // if user is not signed in and the current path is not / or /signin or /signup redirect the user to /
  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    console.log("in");
    console.log(request.nextUrl.pathname);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if user is signed in and the current path is / or /signin or /signup redirect the user to /analytics
  if (
    (user && request.nextUrl.pathname === "/") ||
    (user && request.nextUrl.pathname === "/signin") ||
    (user && request.nextUrl.pathname === "/signup")
  ) {
    console.log("out");
    return NextResponse.redirect(new URL("/analytics", request.url));
  }

  return response;
}
