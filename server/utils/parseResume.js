export function extractDetails(text) {
  const email =
    text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)?.[0] || "";

  const phone =
    text.match(/(\+?\d{2}[- ]?)?\d{10,11}/)?.[0] || "";

  const names = text.split(/\s+/);
  const firstName = names[0] || "";
  const lastName = names[1] || "";

  const parsedSkills = extractSkills(text);

  return {
    firstName,
    lastName,
    email,
    contactNo: phone,
    parsedSkills,
    achievements: [],
    education: [],
    experience: [],
    summary: "",
  };
}

function extractSkills(text) {
  const skillsDB = [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "AWS",
    "Leadership",
  ];

  return skillsDB.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
}
