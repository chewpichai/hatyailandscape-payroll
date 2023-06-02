import { NextRequest, NextResponse } from "next/server";
import { Bonus } from "@/models";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const bonuses = await Bonus.find({
    endDate: { $gte: params.get("startDate"), $lte: params.get("endDate") },
  }).populate("employee");
  return NextResponse.json(bonuses);
}

export async function POST(request: Request) {
  const body = await request.json();
  const bonus = new Bonus(body);
  await bonus.save();
  return NextResponse.json(bonus);
}
