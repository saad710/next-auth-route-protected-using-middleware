import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log(req.nextUrl)
  const { pathname, origin } = req.nextUrl
//   console.log(origin)
//   console.log(pathname)
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "development",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.rewrite(`${origin}/login`);
    // If user is authenticated, continue.
  }
}
