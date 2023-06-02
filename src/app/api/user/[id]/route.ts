import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const user = await User.findByIdAndUpdate(params.id, body, {
    returnDocument: "after",
  });
  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await User.findByIdAndDelete(params.id);
  return NextResponse.json(user);
}
