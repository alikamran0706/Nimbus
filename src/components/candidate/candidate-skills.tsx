export default function CandidateSkills() {
  const skillCategories = [
    {
      category: "Skills",
      skills: [
        "Inventory Management",
        "Order Processing",
        "Shipping Documentation",
        "Logistics Coordination",
        "Warehouse Management Systems",
      ],
    },
    // {
    //   category: "Soft Skills",
    //   skills: ["Team Management", "Attention to Detail", "Customer Service", "Time Management", "Problem Solving"],
    // },
    // {
    //   category: "Technical Skills",
    //   skills: ["Microsoft Office", "Packaging", "Quality Control", "Data Entry", "Equipment Operation"],
    // },
  ]

  return (
    <div className="space-y-8">
      {skillCategories.map((category, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{category.category}</h3>
          <div className="flex flex-wrap gap-3">
            {category.skills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
