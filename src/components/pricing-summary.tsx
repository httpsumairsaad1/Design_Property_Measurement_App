import { motion } from 'motion/react'
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Separator } from "./ui/separator"
import { Calculator, DollarSign } from 'lucide-react'

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

interface InteriorChoices {
  furniturePackage: string
  wallColor: string
  lightingAmbiance: number
}

interface PricingData {
  materialsCost: number
  interiorCost: number
  baseCostPerSqFt: number
  total: number
}

interface PricingSummaryProps {
  rooms: Room[]
  pricing: PricingData
  interiorChoices: InteriorChoices
  onNext: () => void
  onBack: () => void
}

const materialPrices: Record<string, number> = {
  'hardwood': 8.5,
  'tile': 6.2,
  'carpet': 4.8,
  'vinyl': 3.5,
  'marble': 12.0,
  'laminate': 5.5
}

const wallPrices: Record<string, number> = {
  'drywall': 2.0,
  'brick': 4.5,
  'wood-paneling': 6.0,
  'stone': 8.0,
  'tile': 5.5
}

const packagePrices: Record<string, number> = {
  'basic': 15,
  'premium': 25,
  'luxury': 40
}

export function PricingSummary({ rooms, pricing, interiorChoices, onNext, onBack }: PricingSummaryProps) {
  const totalArea = rooms.reduce((sum, room) => sum + room.area, 0)

  const getRoomCost = (room: Room) => {
    const flooringCost = (materialPrices[room.flooringMaterial] || 5) * room.area
    const wallCost = (wallPrices[room.wallMaterial] || 3) * room.area * 0.5
    return flooringCost + wallCost
  }

  const getPackageName = (packageId: string) => {
    const packages: Record<string, string> = {
      'basic': 'Basic Package',
      'premium': 'Premium Package',
      'luxury': 'Luxury Package'
    }
    return packages[packageId] || packageId
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Pricing Summary
        </h2>
        <p className="text-gray-600">
          Detailed breakdown of all costs for your property measurement project.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Room-by-Room Breakdown */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calculator className="w-5 h-5 text-orange-600" />
              </div>
              Room Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead className="text-right">Area</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => {
                  const roomCost = getRoomCost(room)
                  return (
                    <TableRow key={room.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{room.name}</div>
                          <div className="text-sm text-gray-500">
                            {room.flooringMaterial} floor, {room.wallMaterial} walls
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-medium">{room.area.toFixed(0)} sq ft</div>
                        <div className="text-sm text-gray-500">
                          {room.width}' × {room.length}'
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-medium">${roomCost.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          ${(roomCost / room.area).toFixed(2)}/sq ft
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Cost Summary */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              Cost Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Area</span>
                <span className="font-medium">{totalArea.toFixed(0)} sq ft</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Materials Cost</span>
                <span className="font-medium">${pricing.materialsCost.toLocaleString()}</span>
              </div>
              
              <div className="text-sm text-gray-500 ml-4 space-y-1">
                <div>• Flooring materials</div>
                <div>• Wall materials</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600">Interior Design</span>
                  <div className="text-sm text-gray-500">
                    {getPackageName(interiorChoices.furniturePackage)}
                  </div>
                </div>
                <span className="font-medium">${pricing.interiorCost.toLocaleString()}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cost per Square Foot</span>
                <span className="font-medium">${pricing.baseCostPerSqFt.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <motion.div 
                className="flex justify-between items-center text-lg"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="font-semibold text-gray-900">Total Project Cost</span>
                <span className="font-bold text-2xl text-orange-600">
                  ${pricing.total.toLocaleString()}
                </span>
              </motion.div>
            </div>

            {/* Additional Details */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-700 mb-2">Project Details</h4>
              <div className="space-y-1 text-sm text-blue-600">
                <div>• {rooms.length} rooms measured</div>
                <div>• {getPackageName(interiorChoices.furniturePackage)} selected</div>
                <div>• {interiorChoices.lightingAmbiance}% lighting ambiance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-6"
        >
          Back to Interior Design
        </Button>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Generate Certificate
          </Button>
        </motion.div>
      </div>
    </div>
  )
}