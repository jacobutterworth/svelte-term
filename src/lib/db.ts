import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "$env/dynamic/private";

const pgSQL = neon(env.DATABASE_URL);
const db = drizzle(pgSQL);

export default db;
