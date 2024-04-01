import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSearchParams } from "next/navigation";
import { json } from "stream/consumers";

export async function GET(req: NextRequest, { params }: any) {
    try {
        const session = await getServerSession(authOptions);
        const MEET_ID = req.nextUrl.searchParams.get('MEET_ID')

        var response = await prisma.meetings.findUnique({
            where: {
                id: Number.parseInt(MEET_ID!),
            },
        });

        if (response?.status == 2) {
            return NextResponse.redirect(process.env.BaseUrl + 'scheduled_class/invite/' + response.id + '/' + session.user.userName)
        }
        else {
            return NextResponse.json({
                message: "Meeting Has been Ended"
            })
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
