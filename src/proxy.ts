import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Ensure this points to your Better Auth server config
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch session directly using Better Auth's server API
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    if (pathname.startsWith("/manage")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const role = (session.user as { role?: string }).role || "guest";
  const rolePaths: Record<string, string> = {
    admin: "/manage/admin",
    guest: "/manage/guest",
    host: "/manage/host",
  };

  const targetPath = rolePaths[role] || "/manage/guest";

  const isSuccessPage = pathname.startsWith("/manage/success");

  if (pathname.startsWith("/manage") && !pathname.startsWith(targetPath) && !isSuccessPage) {
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};