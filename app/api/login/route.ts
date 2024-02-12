import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return new NextResponse(
    JSON.stringify({
      message: "Login Successfull",
    })
  );
}
