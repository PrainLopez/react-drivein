import { bigint } from "drizzle-orm/mysql-core";
import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";

export const users = singlestoreTable("drivein_users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});
