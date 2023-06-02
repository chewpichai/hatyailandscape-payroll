import { NextResponse } from "next/server";
import { User } from "@/models";

export async function GET() {
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = new User(body);
  await user.save();
  return NextResponse.json(user);
}
