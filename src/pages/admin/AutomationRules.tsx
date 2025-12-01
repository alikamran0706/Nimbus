import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/Checkbox'

const ruleLibrary = [
  {
    id: 1,
    name: 'Auto-tag JavaScript candidates',
    trigger: 'New resume uploaded',
    updated: '2 hours ago',
    active: true,
  },
  {
    id: 2,
    name: 'Send follow-up email after interview',
    trigger: 'Interview completed',
    updated: '3 hours ago',
    active: false,
  },
  {
    id: 3,
    name: 'Notify recruiter of high-priority candidates',
    trigger: "Candidate tagged as 'High Priority'",
    updated: '5 hours ago',
    active: true,
  },
]

export default function AdminAutomationRules() {
  const [selectedRule, setSelectedRule] = useState<number | null>(1)
  const [value, setValue] = useState(false)

  const handleCheckbox = (value: boolean) => {
    setValue(value)
  }

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-base font-bold text-gray-900">Automation Rules</h1>
          <p className="text-xsplus text-gray-600">Create and manage automated workflows</p>
        </div>
        <Button
          label="Create Rule"
          className="text-xsplus px-4 py-2 rounded-lg flex items-center gap-2"
          startIcon={<img src="/svg/white-plus.svg" alt="add" className="w-4 h-4" />}
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Rule Library */}
        <Card className="bg-white border border-gray-100 shadow-sm lg:col-span-1">
          <div className="text-gray-900 text-sm font-semibold px-4 pt-4">Rule Library</div>
          <div>
            {ruleLibrary.map(rule => (
              <div
                key={rule.id}
                onClick={() => setSelectedRule(rule.id)}
                className={`p-3 border-l-2  cursor-pointer transition shadow-sm ${
                  selectedRule === rule.id
                    ? 'border-primary-600 bg-red-50 text-primary-600'
                    : 'border-gray-100 hover:bg-gray-50'
                }`}
              >
                <p className="font-medium text-sm">{rule.name}</p>
                <p className="text-xs text-gray-600 mt-1">{rule.trigger}</p>
                <p className="text-xs text-gray-600 mt-1">Last updated: {rule.updated}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Rule Builder */}
        <Card className="bg-white border border-gray-100 shadow-sm lg:col-span-2">
          <div className="">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border-b border-gray-100">
              {/* Title */}
              <div className='flex gap-2 items-center'>
            <img src="/svg/red-rule-builder.svg" className='w-4 h-4' />
              <p className="text-gray-900 text-sm font-semibold">Rule Builder</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-start sm:justify-end gap-2">
                <Button
                  startIcon={<img src="/svg/gray-play.svg" alt="add" className="w-3 h-3" />}
                  label="Test Rule"
                  variant="white"
                  className="text-xsplus bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg"
                />
                <Button
                  startIcon={<img src="/svg/gray-copy.svg" alt="add" className="w-3 h-3" />}
                  label="Duplicate"
                  variant="white"
                  className="text-xsplus bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg"
                />
                <Button
                  startIcon={<img src="/svg/white-save.svg" alt="add" className="w-4 h-4" />}
                  label="Save Rule"
                  className="text-xsplus rounded-lg px-3 py-1.5"
                />
              </div>
            </div>

            <div className="px-4 pb-4 space-y-6">
              {/* Rule Name */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rule Name</label>
                <div className="flex flex-wrap gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Auto-tag JavaScript candidates"
                    className="w-full md:w-[55%] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-600"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1 text-xs text-gray-700">
                      <Checkbox
                        checked={value}
                        onCheckedChange={(checked: boolean) => handleCheckbox(checked)}
                      />{' '}
                      Rule Active
                    </label>
                    <button className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-2">
                      <img src="/svg/admin/red-delete.svg" alt="add" className="w-3 h-3" /> Add
                      Condition
                    </button>
                  </div>
                </div>
              </div>

              {/* Trigger */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Trigger</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-600">
                  <option>New resume uploaded</option>
                  <option>Candidate applied</option>
                  <option>Interview scheduled</option>
                </select>
              </div>

              {/* Conditions */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-medium text-gray-600">Conditions (IF)</label>
                  <button className="text-xs text-primary-600 font-medium hover:underline">
                    + Add Condition
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="border border-gray-150 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <p className="text-gray-800 text-xsplus">Condition</p>
                      <p className="text-gray-800 text-xsplus mr-2">X</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        <option>resume_content</option>
                      </select>
                      <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        <option>contains</option>
                      </select>
                      <input
                        type="text"
                        placeholder="JavaScript"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="border border-gray-150 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <p className="text-gray-800 text-xsplus">Condition</p>
                      <p className="text-gray-800 text-xsplus mr-2">X</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        <option>resume_content</option>
                      </select>
                      <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        <option>contains</option>
                      </select>
                      <input
                        type="text"
                        placeholder="React"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg">
                      AND
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-medium text-gray-600">Actions (THEN)</label>
                  <button className="text-xs text-primary-600 font-medium hover:underline">
                    + Add Action
                  </button>
                </div>

                <div className="border border-gray-150 p-4 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <p className="text-gray-800 text-xsplus">Action</p>
                    <p className="text-gray-800 text-xsplus mr-2">X</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>add_tag</option>
                    </select>
                    <input
                      type="text"
                      placeholder="JavaScript"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>add_tag</option>
                    </select>
                    <input
                      type="text"
                      placeholder="React"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Rule Summary */}
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-xs text-red-700">
                <strong>Rule Summary:</strong> When a new resume is uploaded, if resume content
                contains "JavaScript" AND "React", then add tags "JavaScript" and "React".
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <Button
                  label="Cancel" variant='white'
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
                />
                <Button
                  label="Save Rule" startIcon={<img src="/svg/white-save.svg" />}
                  className="text-white px-4 py-2 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
