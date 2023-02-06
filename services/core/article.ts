export * as Article from "./article";
import { ulid } from "ulid";
import * as uuid from "uuid";
import { database } from "./database";

export async function create(title: string, url: string) {
  const [result] = await database.DB.insertInto("article")
    .values({ articleID: ulid(), title : title, url : url })
    .returningAll()
    .execute();
  return result;
}

export function get(articleID: string) {
  return database.DB.selectFrom("article")
    .selectAll()
    .where("articleID", "=", articleID)
    .executeTakeFirst();
}

export function list() {
  return database.DB.selectFrom("article")
    .selectAll()
    .orderBy("created", "desc")
    .execute();
}
