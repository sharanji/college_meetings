import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const jsonBody = await req.json();
    const user = await prisma.user.findFirst(
        {
            where: {
                userName: jsonBody['display_name']
            }
        }
    );

    var attendenace = await prisma.attendence.findFirst(
        {
            where: {
                meetId: Number.parseInt(jsonBody['meetId']),
                userId: user?.id
            }
        }
    );

    if (!attendenace) {
        await prisma.attendence.create({
            data: {
                attendenace: 25,
                meetId: Number.parseInt(jsonBody['meetId']),
                userId: user?.id!,
            },
        });
    }
    else {
        await prisma.attendence.update({
            where: {
                id: attendenace.id,
            },
            data: {
                attendenace: attendenace.attendenace + 25,
            }
        });
    }


    return NextResponse.json({
        message: "Attendance updated",
    }, { status: 200 });
}
