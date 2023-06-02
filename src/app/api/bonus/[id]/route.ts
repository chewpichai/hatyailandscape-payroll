import { NextRequest, NextResponse } from "next/server";
import { Bonus } from "@/models";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const bonus = await Bonus.findByIdAndUpdate(params.id, body, {
    returnDocument: "after",
  });
  return NextResponse.json(bonus);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const bonus = await Bonus.findByIdAndDelete(params.id);
  return NextResponse.json(bonus);
}
