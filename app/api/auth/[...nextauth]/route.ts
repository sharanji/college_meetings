import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Student Email",
            credentials: {
                email: { label: "Email", placeholder: "Enter your Email" },
                password: { label: "Password", type: "password", placeholder: "Enter Your password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        userName: credentials?.email,
                        password: credentials?.password,
                    }
                });

                return {
                    id: user!.id.toString(),
                    userName: user?.userName,
                    userType: user?.userType,
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
                token.userName = user.userName
                token.userType = user.userType
            }
            return token;
        },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.uid;
                session.user.userName = token.userName;
                session.user.userType = token.userType;
            }
            return session
        }
    },
};

const handeler = NextAuth(authOptions);

export const GET = handeler;
export const POST = handeler;