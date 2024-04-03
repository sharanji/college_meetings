
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSearchParams } from "next/navigation";
import { json } from "stream/consumers";
import ClassStartedEmail, { mailDetails } from "@/app/emails/classstarted";


export async function POST(req: NextRequest) {
    try {
        const jsonBody = await req.json();

        var students = await prisma.user.findMany({
            where: {
                classId: jsonBody['classId'],
                userType: 1,
            }
        });

        var teacher = await prisma.user.findFirst({
            where: {
                classId: jsonBody['classId'],
                userType: 0,
            }
        });

        var meeting = await prisma.meetings.findFirst({
            where: {
                classId: jsonBody['classId'],
            }
        });

        let nodemailer = require('nodemailer')
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.SMTP_USER || "user",
                pass: process.env.SMTP_PASSWORD || "pass",
            },
            secure: true,
        });

        students.forEach(student => {
            const mailData = {
                from: process.env.SMTP_USER,
                to: student.userName,
                subject: `Your Class Has been started`,
                text: 'Join the class soon',
                html: ClassStartedEmail({
                    classAjenda: jsonBody['classAjenda'],
                    classDetail: meeting!,
                }),
            };

            transporter.sendMail(mailData, function (err: any, info: any) {
                if (err) console.log(err)
            });
        });

        var response = await prisma.meetings.update({
            where: {
                id: jsonBody["meetId"],
            },
            data: {
                status: 2,
            }
        });

        return NextResponse.json({
            message: "Success",
            class: response,
        });
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 });
    }
}