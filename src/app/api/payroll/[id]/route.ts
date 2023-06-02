import { NextRequest, NextResponse } from "next/server";
import { Payroll } from "@/models";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);
  const payroll = await Payroll.findByIdAndUpdate(params.id, body, {
    returnDocument: "after",
  });
  return NextResponse.json(payroll);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const payroll = await Payroll.findByIdAndDelete(params.id);
  return NextResponse.json(payroll);
}
