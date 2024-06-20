// types.ts
import { Document, Status, User } from "@prisma/client";

export type DocumentWithStatus = Pick<
  Document,
  "amount" | "date" | "docNo" | "year" | "id" | "name" | "type"
> & { status: Pick<Status, "name">[] } & { user: Pick<User, "name" | "user"> };