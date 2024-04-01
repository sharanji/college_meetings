import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSearchParams } from "next/navigation";
import { json } from "stream/consumers";

export async function GET(req: NextRequest, { params }: any) {
    try {
        const session = await getServerSession(authOptions);
        const classId = req.nextUrl.searchParams.get('class_id')

        var response = await prisma.meetings.findMany({
            where: {
                classId: Number.parseInt(classId!),
            },
            orderBy: {
                status: "asc"
            }
        });

        return NextResponse.json({
            message: "Meetings fetch Success",
            classId: classId,
            class: response,
        });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: any) {
    try {
        const session = await getServerSession(authOptions);
        const json = await req.json();

        var response = await prisma.meetings.create({
            data: {
                classId: Number.parseInt(json.classId),
                meetingName: json.meetingName,
                meetingType: 'everyone',
                status: 0,
                date: new Date(json.date)

            }
        });

        return NextResponse.json({
            message: "Meet Save Success",
            meet: response,
        });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
