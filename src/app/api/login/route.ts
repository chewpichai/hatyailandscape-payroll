import { NextResponse } from "next/server";
import { User } from "@/models";
import { cookies } from "next/headers";
import { sign } from "@/libs/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const user = await User.findOne({ username });
  if (user && user.password === password) {
    const { password, ...rest } = user._doc;
    const token = await sign(rest, JWT_SECRET);
    cookies().set("token", token);
    return NextResponse.json(rest);
  }
  return NextResponse.json("unauthorized", { status: 403 });
}
