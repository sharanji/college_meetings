import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    var user = await prisma.user.findFirst({
        where: {
            id: Number.parseInt(session.user.id),
        }
    })

    if (!user) {
        return NextResponse.json({
            message: "You are not authorised",
        });
    }

    return NextResponse.json({
        message: "User Fetch Successfull",
        data: user,
    });
}
