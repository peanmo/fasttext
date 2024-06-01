import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.NEXTAUTH_GOOGLE_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "patna.__@hotmail.com",
          pass: "Sepv&9sv",
        },
        secure: false,
        requireTLS: true,
      },
      from: "patna.__@hotmail.com",
    })
  ],
  adapter: PrismaAdapter(prisma),
  // callbacks: {
  //   session: async ({
  //     session,
  //     user,
  //     newSession,
  //     trigger,
  //   }: {
  //     session: Session;
  //     user: AdapterUser;
  //     newSession: any;
  //     trigger?: "update";
  //   }) => {
  //     if (trigger && newSession.name && adapter.updateUser) {
  //     }
  //     if (!session.user) {
  //       return session;
  //     }
  //     session.user = user;
  //     return session;
  //   },
  //   signIn: async ({ user }: { user: AdapterUser | User }) => {
  //     if (!adapter.getUser || !adapter.updateUser) {
  //       return true;
  //     }
  //     if (!user.role) {
  //       const update: Partial<AdapterUser> & Pick<AdapterUser, "id"> = {
  //         role: "user",
  //         id: user.id,
  //       };
  //       await adapter.updateUser(update);
  //     }
  //     return true;
  //   },
  // },
};