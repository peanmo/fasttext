import NextAuth, { Account, DefaultSession } from "next-auth";
import { User, Section } from "@prisma/client"
import { JWT } from "next-auth/jwt";

type peaUser = {
  id: string,
  name: string,
  user: string,
  tel: string,
  role: "admin"|"user"|"checker"|"manager",
  section: {
    id: string,
    shortName: string,
    name: string
  }
};

declare module "next-auth" {
  interface Session {
    pea?: peaUser;
  }
  interface User {
    id: string,
    name: string,
    user: string,
    tel: string,
    role: "admin"|"user"|"checker"|"manager",
    section: {
      id: string,
      shortName: string,
      name: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    pea?: peaUser;
  }
}
