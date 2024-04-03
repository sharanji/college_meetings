import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSearchParams } from "next/navigation";
import { json } from "stream/consumers";

export async function POST(req: NextRequest, { params }: any) {
    try {
        const jsonBody = await req.json();

        var response = await prisma.meetings.update({
            where: {
                id: jsonBody['meetId'],
            },
            data: {
                status: 1
            }
        });

        return NextResponse.json({
            message: "Meeting Has been Ended",
            res: response
        })

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
