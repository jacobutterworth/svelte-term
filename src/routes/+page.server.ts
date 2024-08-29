import type { PageServerLoad } from "./$types";

import { getSkills } from "$lib/server/routers/skills";

export const load: PageServerLoad = async () => {
	const skills = await getSkills();
	const options = skills.map((skill) => ({ value: skill.id, label: skill.name }));
	return { options };
};
