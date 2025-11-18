export default function CandidateAbout() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">About</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          Detail-oriented shipping clerk with 5+ years of experience in warehouse operations and logistics. Proven track
          record of efficiently managing inventory, processing orders, and maintaining documentation with accuracy.
          Strong organizational skills with the ability to multitask and meet tight delivery timelines.
        </p>
      </div>

      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "Inventory Management",
            "Order Processing",
            "Shipping Documentation",
            "Logistics Coordination",
            "Warehouse Management Systems",
            "Team Management",
            "Attention to Detail",
            "Customer Service",
            "Microsoft Office",
            "Packaging",
            "Quality Control",
          ].map((skill) => (
            <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
