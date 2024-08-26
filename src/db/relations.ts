import { relations } from "drizzle-orm/relations";
import { users, session, arrangements, arrangementThemes, themes } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(users, {
		fields: [session.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(session),
}));

export const arrangementThemesRelations = relations(arrangementThemes, ({one}) => ({
	arrangement: one(arrangements, {
		fields: [arrangementThemes.arrangementId],
		references: [arrangements.id]
	}),
	theme: one(themes, {
		fields: [arrangementThemes.themeId],
		references: [themes.id]
	}),
}));

export const arrangementsRelations = relations(arrangements, ({many}) => ({
	arrangementThemes: many(arrangementThemes),
}));

export const themesRelations = relations(themes, ({many}) => ({
	arrangementThemes: many(arrangementThemes),
}));