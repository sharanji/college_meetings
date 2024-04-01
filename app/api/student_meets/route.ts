import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSearchParams } from "next/navigation";
import { json } from "stream/consumers";
import { User } from "@prisma/client";

export async function GET(req: NextRequest, { params }: any) {
    try {
        const session = await getServerSession(authOptions);

        var user = await prisma.user.findFirst({
            where: {
                id: Number.parseInt(session.user.id),
            }
        })
        var _class = null;
        if (user) {
            _class = await prisma.class.findFirst({
                where: {
                    id: user?.classId!,
                }
            });
        }

        let result = await prisma.$queryRawUnsafe(`SELECT
                            "public"."Attendence"."attendenace",
                            "public"."Meetings".*
                        FROM
                            "public"."User" 
                        JOIN
                            "public"."Meetings" ON "public"."Meetings"."classId" = "public"."User"."classId"
                        LEFT JOIN
                            "public"."Attendence" ON "public"."Attendence"."meetId" = "public"."Meetings".id AND "public"."Attendence"."userId" = "public"."User"."id"
                            
                        where "public"."User"."id" = ${session.user.id}
                    `);

        return NextResponse.json({
            message: "Meetings fetch Success",
            class: _class,
            meetings: result
        });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
