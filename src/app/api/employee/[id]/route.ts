import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@/models";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const employee = await Employee.findByIdAndUpdate(params.id, body, {
    returnDocument: "after",
  });
  return NextResponse.json(employee);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const employee = await Employee.findByIdAndDelete(params.id);
  return NextResponse.json(employee);
}
