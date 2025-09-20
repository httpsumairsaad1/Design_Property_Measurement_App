import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Users, Mail, Phone, MapPin } from 'lucide-react'

interface CustomerDataProps {
  onNext: () => void
  onBack: () => void
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  company: string
  notes: string
}

export function CustomerData({ onNext, onBack }: CustomerDataProps) {
  const [includeCustomerData, setIncludeCustomerData] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    notes: ''
  })

  const updateCustomerInfo = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo({ ...customerInfo, [field]: value })
  }

  const handleContinue = () => {
    onNext()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
          Customer Data
        </h2>
        <p className="text-gray-600">
          Optional: Add customer or client information for this survey project.
        </p>
      </div>

      {/* Toggle for Customer Data */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-lime-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              Include Customer Information
            </div>
            <Switch 
              checked={includeCustomerData} 
              onCheckedChange={setIncludeCustomerData}
            />
          </CardTitle>
        </CardHeader>
        
        {includeCustomerData && (
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input
                  id="customer-name"
                  value={customerInfo.name}
                  onChange={(e) => updateCustomerInfo('name', e.target.value)}
                  placeholder="Customer or client name"
                  className="bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-company">Company</Label>
                <Input
                  id="customer-company"
                  value={customerInfo.company}
                  onChange={(e) => updateCustomerInfo('company', e.target.value)}
                  placeholder="Company or organization"
                  className="bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customer-email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => updateCustomerInfo('email', e.target.value)}
                  placeholder="customer@example.com"
                  className="bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="customer-phone"
                  value={customerInfo.phone}
                  onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Customer Address
              </Label>
              <Input
                id="customer-address"
                value={customerInfo.address}
                onChange={(e) => updateCustomerInfo('address', e.target.value)}
                placeholder="Customer's address (if different from property)"
                className="bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-notes">Additional Notes</Label>
              <Input
                id="customer-notes"
                value={customerInfo.notes}
                onChange={(e) => updateCustomerInfo('notes', e.target.value)}
                placeholder="Any additional notes about the customer or project requirements"
                className="bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200"
              />
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-lg p-6 border border-lime-200">
              <h4 className="font-medium text-green-700 mb-3">Customer Information Summary</h4>
              <div className="space-y-2 text-sm text-green-600">
                <div><strong>Name:</strong> {customerInfo.name || 'Not specified'}</div>
                <div><strong>Company:</strong> {customerInfo.company || 'Not specified'}</div>
                <div><strong>Email:</strong> {customerInfo.email || 'Not specified'}</div>
                <div><strong>Phone:</strong> {customerInfo.phone || 'Not specified'}</div>
                <div><strong>Address:</strong> {customerInfo.address || 'Not specified'}</div>
                {customerInfo.notes && (
                  <div><strong>Notes:</strong> {customerInfo.notes}</div>
                )}
              </div>
            </div>
          </CardContent>
        )}

        {!includeCustomerData && (
          <CardContent>
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">Customer data not included</h3>
              <p className="text-gray-400">
                Toggle the switch above if you want to include customer information in your survey report.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-6"
        >
          Back to Creator Data
        </Button>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue to Additional Information
          </Button>
        </motion.div>
      </div>
    </div>
  )
}