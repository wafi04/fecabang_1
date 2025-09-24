// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

// Define public routes that don't require authentication.
const publicRoutes = ["/login", "/register", "/forgot-password"];

const adminRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth_token")?.value;

  if (!authToken) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 2. Validate the token and check the role for protected routes.
  try {
    const { payload } = await jwtVerify(authToken, secretKey);
    const roleID = payload.roleID as number; // Assuming your roleID is a number

    // Check if the route is an admin route.
    const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route.replace(":path*", ""))
    );

    if (isAdminRoute && roleID !== 1) {
      return NextResponse.redirect(new URL("/403", request.url)); // Forbidden page
    }

    // Allow access if the token is valid and permissions are correct.
    return NextResponse.next();
  } catch (err) {
    // If the token is invalid or expired, redirect to the login page.
    console.error("Token validation error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // Apply middleware to all routes except API, static files, etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
