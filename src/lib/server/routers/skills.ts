import db from "$lib/db";
import { eq } from "drizzle-orm";
import { skills } from "../../../db/schema";

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;

export async function getSkills(): Promise<Skill[]> {
	return db.select().from(skills);
}

export async function getSkill(id: string): Promise<Skill> {
	const skill = await db
		.select()
		.from(skills)
		.where(eq(skills.id, Number(id)));

	return skill[0] as Skill;
}

export async function getSkillByName(name: string): Promise<Skill> {
	const skill = await db.select().from(skills).where(eq(skills.name, name));

	return skill[0] as Skill;
}

export async function createSkill(skill: NewSkill): Promise<Skill> {
	// check if skill already exists
	const existingSkill = await getSkillByName(skill.name);
	if (existingSkill) {
		return existingSkill;
	}

	const newSkill = await db.insert(skills).values(skill).returning({
		id: skills.id,
		name: skills.name,
		createdAt: skills.createdAt
	});
	return newSkill[0];
}
