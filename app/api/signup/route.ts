import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const jsonBody = await req.json();

    var user = await prisma.user.create({
        data: jsonBody,
    });

    if (!user) {
        return NextResponse.json({
            message: "Username alredy exist",
        });
    }

    return NextResponse.json({
        message: "User Creation Successfull",
        data: user,
    }, { status: 201 });
}
