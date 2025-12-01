import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'

export default function AdminSupportResources() {
  const [subject, setSubject] = useState('')
  const [priority, setPriority] = useState('Technical Issue')
  const [message, setMessage] = useState('')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Support & Resources</h1>
        <p className="text-sm text-gray-600">
          Get help and access helpful documentation & resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Documentation */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <img src="/svg/red-book.svg" alt="doc" className="w-5 h-5" />
              <h3 className="text-sm font-semibold text-gray-900">Documentation</h3>
            </div>
            <p className="text-xs text-gray-600">
              Access comprehensive guides and documentation for system administrators.
            </p>
            <ul className="space-y-2 pt-2">
              {[
                { text: 'Admin user guide', link: '#' },
                { text: 'API documentation', link: '#' },
                { text: 'Integration setup guides', link: '#' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.link}
                    className="text-primary-600 text-xs font-medium flex items-center gap-1 hover:underline"
                  >
                    {item.text}
                    <img src="/svg/red-arrow-right.svg" alt="arrow" className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <img src="/svg/purple-help.svg" alt="faq" className="w-5 h-5" />
              <h3 className="text-sm font-semibold text-gray-900">Frequently Asked Questions</h3>
            </div>
            <p className="text-xs text-gray-600">
              Find answers to common questions about system administration.
            </p>
            <ul className="space-y-2 pt-2">
              {[
                { text: 'User permissions and roles', link: '#' },
                { text: 'System security best practices', link: '#' },
                { text: 'Troubleshooting integrations', link: '#' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.link}
                    className="text-primary-600 text-xs font-medium flex items-center gap-1 hover:underline"
                  >
                    {item.text}
                    <img src="/svg/red-arrow-right.svg" alt="arrow" className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Release Notes */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <img src="/svg/green-file.svg" alt="release" className="w-5 h-5" />
              <h3 className="text-sm font-semibold text-gray-900">Release Notes</h3>
            </div>
            <p className="text-xs text-gray-600">
              Stay up to date with the latest system updates and features.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                { version: '2.4.0', date: 'June 18, 2023' },
                { version: '2.3.5', date: 'May 22, 2023' },
                { version: '2.3.0', date: 'May 5, 2023' },
              ].map((item, idx) => (
                <li key={idx}>
                  <p className="text-xs text-gray-800 font-medium">Version {item.version}</p>
                  <p className="text-[11px] text-gray-500 mb-1">Released on {item.date}</p>
                  <a
                    href="#"
                    className="text-primary-600 text-xs font-medium flex items-center gap-1 hover:underline"
                  >
                    View details
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card className="bg-white border border-gray-100 shadow-sm py-6">
        <CardHeader>
          <CardTitle className="text-gray-900 text-sm font-semibold">Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Live Chat */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <img src="/svg/red-message.svg" className="w-5 h-5" />
              <p className="text-sm font-semibold text-gray-900">Live Chat Support</p>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Chat with our technical experts for faster assistance.
            </p>
            <Button className="w-full text-xsplus rounded-md" label="Start Chat" />
          </div>

          {/* Phone Support */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <img src="/svg/red-phone.svg" className="w-5 h-5" />
              <p className="text-sm font-semibold text-gray-900">Phone Support</p>
            </div>
            <p className="text-xs text-gray-600 mb-1">
              Available during business hours for direct technical support.
            </p>
            <p className="text-sm font-semibold text-primary-600 mt-1">+1 (845) 555-0123</p>
          </div>
        </CardContent>
      </Card>

      {/* Support Ticket Form */}
      <Card className="bg-white border border-gray-100 shadow-sm py-6">
        <CardHeader>
          <CardTitle className="text-gray-900 text-sm font-semibold">
            Submit a Support Ticket
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Ticket Category</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-600"
            >
              <option>Technical Issue</option>
              <option>Billing Question</option>
              <option>Account Support</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Subject</label>
            <Input
              placeholder="Brief description of the issue"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Detailed Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              placeholder="Please provide details about your issue..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-600"
            />
          </div>

          {/* Priority */}
          <div className="flex items-center gap-4">
            <p className="text-xs font-medium text-gray-600">Priority:</p>
            <label className="text-xs text-gray-700 flex items-center gap-1">
              <input type="radio" name="priority" className="accent-primary-600" /> Low
            </label>
            <label className="text-xs text-gray-700 flex items-center gap-1">
              <input type="radio" name="priority" className="accent-primary-600" /> Medium
            </label>
            <label className="text-xs text-gray-700 flex items-center gap-1">
              <input type="radio" name="priority" className="accent-primary-600" /> High
            </label>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Attachments</label>
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center text-xs text-gray-500">
              <p>Drag or upload files here</p>
              <button className="mt-3 text-xsplus text-primary-600">Browse Files</button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button className="bg-primary-600 hover:bg-red-700 text-white text-xsplus px-4 py-2 rounded-lg" label='Submit Ticket' />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
