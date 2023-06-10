import { Employee } from "@/models";
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
  const employee = await Employee.findById(id);
  employee.media.push({ fileName: fileName });
  await employee.save();
  return NextResponse.json(employee);
}
