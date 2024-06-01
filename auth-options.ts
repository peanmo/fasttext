import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import nodemailer from "nodemailer"


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
      sendVerificationRequest({
        identifier: email,
        url,
        token,
        provider,
      }) {
        return new Promise((resolve, reject) => {
          const { server, from } = provider;
          const transport = nodemailer.createTransport(server);
          const mailOptions = {
            to: email,
            from,
            subject: "Sign in to your account",
            text: `Sign in to your account by clicking on the following link: ${url}`,
            html: `<p>Sign in to your account by clicking on the following link: <a href="${url}">${url}</a></p>`,
          };

          transport.sendMail(mailOptions, (error) => {
            if (error) {
              console.error(error);
              return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR", error));
            }
            resolve();
          });
        });
      },
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