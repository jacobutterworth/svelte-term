import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const pgSQL = neon(process.env.DATABASE_URL!);
const db = drizzle(pgSQL);

export default db;
