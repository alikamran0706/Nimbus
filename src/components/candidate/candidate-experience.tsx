export default function CandidateExperience() {
  const experiences = [
    {
      title: "Senior Shipping Clerk",
      company: "LogistiCorp Inc.",
      period: "2021 - Present",
      description:
        "Manage daily shipping operations for a high-volume distribution center processing over 500 orders daily. Implemented a new inventory tracking system by 20% and improved order fulfillment speed by 25%.",
    },
    {
      title: "Shipping Clerk",
      company: "FastShip Logistics",
      period: "2018 - 2021",
      description:
        "Processed and certified shipping shipments, prepared shipping labels and documentation. Coordinated with carriers to schedule pickups and resolve delivery issues. Maintained accurate inventory records.",
    },
    {
      title: "Warehouse Associate",
      company: "Global Warehouse",
      period: "2015 - 2018",
      description:
        "Assisted with receiving, storing, and shipping merchandise. Performed inventory counts and helped maintain organization of warehouse space. Operated forklifts and other equipment to move products efficiently.",
    },
  ]

  return (
    <div className="space-y-6">
      {experiences.map((exp, idx) => (
        <div key={idx} className="pl-6 pb-6">
          <h3 className="text-base font-bold text-gray-900 text-sm">{exp.title}</h3>
          <p className="text-gray-650 text-xsplus">{exp.company}</p>
          <p className="text-gray-600 text-xsmall mb-3">{exp.period}</p>
          <p className="text-gray-800 text-xsplus">{exp.description}</p>
        </div>
      ))}

      <div className="pl-6">
        <h3 className="text-sm font-bold text-gray-900">Education</h3>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Associate of Science in Business Administration</p>
            <p className="text-gray-650 text-xsplus">San Francisco State University</p>
            <p className="text-gray-600 text-xsmall">Class of 2015</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Certificate in Warehouse Management</p>
            <p className="text-gray-650 text-xsplus">Logistics Training Institute</p>
            <p className="text-gray-600 text-xsmall">Completed 2014</p>
          </div>
        </div>
      </div>
    </div>
  )
}
