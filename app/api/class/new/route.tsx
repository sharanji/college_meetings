import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    var jsonBody = await req.json();
    const session = await getServerSession(authOptions);

    var response = await prisma.class.create({
      data: {
        userid: Number.parseInt(session.user.id),
        className: jsonBody["className"],
      },
    });

    return NextResponse.json({
      message: "created",
      class: response,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
