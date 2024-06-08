import { PrismaClient } from "@prisma/client"
import { Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
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
          select: {
            id: true,
            user: true,
            hashedPassword: true,
            name: true,
            tel: true,
            section: true,
            role: true
          },
        });
  
        if (!resultFindUser || !resultFindUser.hashedPassword || !resultFindUser.name || !(await bcrypt.compare(credentials.password, resultFindUser.hashedPassword))) {
        
          return null
        } 
        const {id,name,user,tel,role,section} = resultFindUser

         return {id,name,user,tel,role,section}
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    jwt: async ({ token, user }:{token:JWT, user:User}) => {
      if (user) {
        token.pea = user
      }
      return token
    },
    session: async ({ session, token }:{session: Session,token:JWT}) => {
      session.pea = token.pea
      return session
    }
  },
};