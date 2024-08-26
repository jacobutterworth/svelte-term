import { pgTable, unique, varchar, text, bigint, timestamp, serial, foreignKey, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const arrangements = pgTable("arrangements", {
	title: varchar("title"),
	description: text("description"),
	url: text("url").default('').notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	downloadCount: bigint("download_count", { mode: "number" }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	id: serial("id").primaryKey().notNull(),
},
(table) => {
	return {
		arrangementsIdUnique: unique("arrangements_id_unique").on(table.id),
	}
});

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	username: varchar("username"),
	email: varchar("email"),
	password: varchar("password").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersEmailKey: unique("users_email_key").on(table.email),
	}
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "session_user_id_users_id_fk"
		}),
	}
});

export const themes = pgTable("themes", {
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	id: serial("id").primaryKey().notNull(),
},
(table) => {
	return {
		themeNameKey: unique("theme_name_key").on(table.name),
	}
});

export const skills = pgTable("skills", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const arrangementThemes = pgTable("arrangement_themes", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	arrangementId: bigint("arrangement_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	themeId: bigint("theme_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		arrangementThemesArrangementIdArrangementsIdFk: foreignKey({
			columns: [table.arrangementId],
			foreignColumns: [arrangements.id],
			name: "arrangement_themes_arrangement_id_arrangements_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		arrangementThemesThemeIdThemesIdFk: foreignKey({
			columns: [table.themeId],
			foreignColumns: [themes.id],
			name: "arrangement_themes_theme_id_themes_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		arrangementThemesPkey: primaryKey({ columns: [table.arrangementId, table.themeId], name: "arrangement_themes_pkey"}),
	}
});