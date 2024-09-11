import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware executed", req.nextUrl.pathname, req.nextauth.token);
    if (req.nextUrl.pathname.startsWith("/feed") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/signin", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Authorized callback", !!token);
        return !!token
      }
    },
  }
)

// Update this line to include both /feed and /api routes
export const config = { matcher: ["/feed/:path*", "/api/:path*"] }