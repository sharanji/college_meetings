import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return;
    }

    var response = await prisma.class.findMany({
      where: {
        userid: Number.parseInt(session.user.id),
      },
    });

    return NextResponse.json({
      message: "Success",
      class: response,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
