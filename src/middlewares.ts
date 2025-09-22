import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  return Date.now() >= payload.exp * 1000;
}

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (pathname === "/") {
    if (token && !isTokenExpired(token)) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      const response = NextResponse.redirect(new URL("/login", request.url));
      if (token && isTokenExpired(token)) {
        response.cookies.delete("auth_token");
      }
      return response;
    }
  }

  if (isPublicRoute && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!isPublicRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isTokenExpired(token)) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
