import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verify } from "@/libs/jwt";
import { IUser } from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET || "";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/";

export async function middleware(request: NextRequest) {
  if (request.headers.get("x-server-secret") === JWT_SECRET)
    return NextResponse.next();

  const path = request.nextUrl.pathname;
  const includes = ["/employee", "/payroll", "/bonus", "/user"];
  const baseUrl = new URL(BASE_PATH, request.url);

  if (
    (path.startsWith("/api") && path !== "/api/login") ||
    includes.includes(path)
  ) {
    const token = request.cookies.get("token");
    if (token) {
      try {
        const { payload: user } = await verify(token.value, JWT_SECRET);
        if (user) {
          const adminPaths = ["/api/user", "/api/bonus", "/user", "/bonus"];
          if (!adminPaths.includes(path) || (user as IUser).type === "admin")
            return NextResponse.next();
        }
      } catch (error) {}
    }
    if (includes.includes(path)) return NextResponse.redirect(baseUrl);
    return NextResponse.json("unautherized", { status: 403 });
  }
}
