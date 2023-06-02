import { NextResponse } from "next/server";
import { Employee } from "@/models";

export async function GET() {
  const employees = await Employee.find();
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const body = await request.json();
  const employee = new Employee(body);
  await employee.save();
  return NextResponse.json(employee);
}
