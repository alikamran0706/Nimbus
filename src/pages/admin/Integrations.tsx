import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export default function AdminIntegrations() {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Integrations</h1>
        <p className="text-gray-600 text-sm mt-1">
          Connect external services to enhance your recruitment workflow
        </p>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LinkedIn API */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-lg">
                  <img src="/svg/red-linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">LinkedIn API</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    <span className="text-xsmall font-medium text-green-600">Connected</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">API Key</label>
                <div className="mt-1 flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <input
                    type="password"
                    value="•••••••••••••••"
                    disabled
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white outline-none cursor-default"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-50 border-l border-gray-200 hover:bg-gray-100"
                  >
                    View
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-600">
                <p>Last synced:</p>
                <div className="flex gap-x-4 mt-1">
                  <p className="text-gray-900  font-normal">Today @ 09:32 AM</p>
                  <img src="/svg/red-refresh.svg" alt="Gmail" className="h-3 w-3" />
                </div>
              </div>

              <div className="flex justify-between mt-3 text-sm">
                <button className="text-primary-600 hover:underline font-normal">
                  Reconfigure
                </button>
                <button className="text-primary-600 hover:underline font-normal">Disconnect</button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gmail Integration */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-lg">
                  <img src="/svg/red-mail.svg" alt="Gmail" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Gmail</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    <span className="text-xsmall font-medium text-green-600">Connected</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Connected Account</label>
                <input
                  type="text"
                  value="admin@company.com"
                  disabled
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                />
              </div>

              <div className="text-xs">
                <p className="text-gray-700 font-medium mb-2">Permissions:</p>
                <ul className="space-y-1 text-gray-800">
                  <li className="flex items-center gap-2">
                    <img src="/svg/circle-dark-green-tick.svg" alt="WhatsApp" className="h-4 w-4" />{' '}
                    Read emails
                  </li>
                  <li className="flex items-center gap-2">
                    <img src="/svg/circle-dark-green-tick.svg" alt="WhatsApp" className="h-4 w-4" />{' '}
                    Send emails
                  </li>
                  <li className="flex items-center gap-2">
                    <img src="/svg/circle-dark-green-tick.svg" alt="WhatsApp" className="h-4 w-4" />{' '}
                    Access contacts
                  </li>
                </ul>
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <button className="text-primary-600 hover:underline font-normal">
                  Update Permissions
                </button>
                <button className="text-primary-600 hover:underline font-normal">Disconnect</button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Business API */}
        <Card className="bg-white border border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <img src="/svg/green-message.svg" alt="WhatsApp" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">WhatsApp Business API</h3>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                    <span className="text-xsmall font-medium text-yellow-600">
                      Configuration Required
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Section */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <img src="/svg/yellow-alert.svg" alt="Alert" className="h-5 w-5" />
                <p className="text-sm font-medium text-gray-900">Additional setup required</p>
              </div>
              <p className="text-xsmall text-gray-600">
                Complete the WhatsApp Business verification process to enable this integration.
              </p>
            </div>

            {/* Steps Box */}
            <div className="border border-gray-159 bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-semibold text-gray-800 mb-2 text-sm">Required Steps:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-xsmall">
                <li>Verify business phone number</li>
                <li>Complete business profile</li>
                <li>Set up webhook URL</li>
                <li>Configure message templates</li>
              </ul>
            </div>

            {/* Action Button */}
            <Button
              label="Start Configuration"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg h-10 text-sm font-medium"
              variant="green"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
