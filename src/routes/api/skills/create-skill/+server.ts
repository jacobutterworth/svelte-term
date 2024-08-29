import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";
import { createSkill } from "$lib/server/routers/skills";

// thank you cursor
interface SkillRequest {
	skill_name: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		if (!isSkillRequest(body)) {
			throw error(400);
		}

		const skillName = sanitiseString(body.skill_name);

		if (skillName.startsWith("http")) {
			throw error(400);
		}

		const result = await createSkill({ name: body.skill_name });
		return json(result);
	} catch (err) {
		console.error("Error creating skill:", err);
		if (err instanceof Error && "status" in err && err.status === 400) {
			throw err;
		}
		throw error(500, "Internal server error");
	}
};

function isSkillRequest(body: unknown): body is SkillRequest {
	return (
		typeof body === "object" &&
		body !== null &&
		"skill_name" in body &&
		typeof (body as SkillRequest).skill_name === "string" &&
		(body as SkillRequest).skill_name.trim() !== ""
	);
}

function sanitiseString(input: string): string {
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
		.replace(/'/g, "''")
		.trim();
}
