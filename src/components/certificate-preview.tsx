import { motion } from 'motion/react'
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { Download, FileText, Award, MapPin, User, Building2 } from 'lucide-react'

interface Room {
  id: string
  name: string
  type: string
  width: number
  length: number
  area: number
  flooringMaterial: string
  wallMaterial: string
  icon: string
}

interface ProjectData {
  name: string
  owner: string
  address: string
  type: 'apartment' | 'house'
}

interface PricingData {
  materialsCost: number
  interiorCost: number
  baseCostPerSqFt: number
  total: number
}

interface CertificatePreviewProps {
  projectData: ProjectData
  rooms: Room[]
  pricing: PricingData
  onBack: () => void
}

export function CertificatePreview({ projectData, rooms, pricing, onBack }: CertificatePreviewProps) {
  const totalArea = rooms.reduce((sum, room) => sum + room.area, 0)
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  const certificateNumber = `HSC-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    const element = document.createElement('a')
    const file = new Blob([
      `PROPERTY MEASUREMENT CERTIFICATE
      
Certificate #: ${certificateNumber}
Date: ${currentDate}

PROJECT DETAILS:
Project Name: ${projectData.name}
Property Owner: ${projectData.owner}
Property Address: ${projectData.address}
Property Type: ${projectData.type.charAt(0).toUpperCase() + projectData.type.slice(1)}

ROOM MEASUREMENTS:
${rooms.map(room => 
  `${room.name}: ${room.width}' x ${room.length}' = ${room.area.toFixed(1)} sq ft`
).join('\n')}

SUMMARY:
Total Rooms: ${rooms.length}
Total Area: ${totalArea.toFixed(1)} square feet
Total Project Cost: $${pricing.total.toLocaleString()}
Cost per Square Foot: $${pricing.baseCostPerSqFt.toFixed(2)}

Certified by Home Surveyor 2025
Generated on ${currentDate}`
    ], { type: 'text/plain' })
    
    element.href = URL.createObjectURL(file)
    element.download = `${projectData.name}-Certificate.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Certificate Preview
        </h2>
        <p className="text-gray-600">
          Review your property measurement certificate before downloading.
        </p>
      </div>

      <div className="max-w-4xl">
        {/* Certificate Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white shadow-2xl border border-gray-200 overflow-hidden">
            <CardContent className="p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full">
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  PROPERTY MEASUREMENT CERTIFICATE
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
              </div>

              {/* Certificate Info */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Certificate Number</div>
                  <div className="font-mono text-lg font-bold text-gray-800">{certificateNumber}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Issue Date</div>
                  <div className="text-lg font-medium text-gray-800">{currentDate}</div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Project Details */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-orange-600" />
                  Project Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Project Name</div>
                      <div className="font-medium text-gray-800">{projectData.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Property Type</div>
                      <div className="font-medium text-gray-800 capitalize">{projectData.type}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Property Owner
                      </div>
                      <div className="font-medium text-gray-800">{projectData.owner}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Property Address
                      </div>
                      <div className="font-medium text-gray-800">{projectData.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Room Details */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Room Measurements
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {rooms.map((room, index) => (
                    <div key={room.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-800">{room.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{room.type.replace('-', ' ')}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-800">{room.area.toFixed(1)} sq ft</div>
                          <div className="text-sm text-gray-500">{room.width}' × {room.length}'</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              {/* Summary */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Summary</h3>
                
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{rooms.length}</div>
                    <div className="text-sm text-gray-600">Total Rooms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{totalArea.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Square Feet</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">${pricing.baseCostPerSqFt.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Cost per Sq Ft</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">${pricing.total.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
                <div className="mb-2">
                  Certified by <span className="font-semibold text-orange-600">Home Surveyor 2025</span>
                </div>
                <div>
                  This certificate was generated on {currentDate} using professional measurement standards
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            onClick={onBack}
            variant="outline"
            className="px-6"
          >
            Back to Pricing
          </Button>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={handleDownload}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Certificate
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}