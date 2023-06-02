import { NextRequest, NextResponse } from "next/server";
import { Payroll } from "@/models";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const payrolls = await Payroll.find({
    endDate: { $gte: params.get("startDate"), $lte: params.get("endDate") },
  }).populate("employee");
  return NextResponse.json(payrolls);
}

export async function POST(request: Request) {
  const body = await request.json();
  const payroll = new Payroll(body);
  await payroll.save();
  return NextResponse.json(payroll);
}
