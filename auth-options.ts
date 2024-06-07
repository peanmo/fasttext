import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient, User } from "@prisma/client"
import { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";


const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "รหัสพนักงาน", type: "text", placeholder: "เช่น: 501855" },
        password: { label: "รหัสผ่าน", type: "password", placeholder: "รหัสผ่านเริ่มต้น 87654321" }
      },
      async authorize(credentials, req) {
        if(!credentials){
          return null
        }
        const resultFindUser = await prisma.user.findUnique({
          where: {
            user: credentials.username,
          },
          // select: {
          //   id: true,
          //   user: true,
          //   hashedPassword: true,
          //   name: true
          // },
        });
  
        if (!resultFindUser || !resultFindUser.hashedPassword || !resultFindUser.name || !(await bcrypt.compare(credentials.password, resultFindUser.hashedPassword))) {
        
          return null
        } 

         return resultFindUser
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  // callbacks: {
  //   jwt: async ({ token, user }:{token:JWT, user:User | AdapterUser}) => {
  //     if (user) {
  //       token.name = user.name
  //     }
  //     return token
  //   },
  //   session: async ({ session, token }:{session: Session,token:JWT}) => {
  //     if (session.user) {
  //       session.
  //     }
  //     return session
  //   }
  // },
};