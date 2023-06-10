import { Employee, Payroll } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Context {
  params: { id: string };
}

export async function POST(request: NextRequest, ctx: Context) {
  const data = await request.formData();
  const blob = data.get("media") as Blob;
  const buffer = Buffer.from(await blob.arrayBuffer());
  const ext = blob.name.split(".").pop();
  const fileName = `/uploads/${Date.now().toString(36)}.${ext}`;
  fs.writeFileSync(path.join(process.cwd(), "/public", fileName), buffer);
  const { id } = ctx.params;
  const payroll = await Payroll.findById(id);
  payroll.media.push({ fileName: fileName });
  await payroll.save();
  return NextResponse.json(payroll);
}
