import { motion } from 'motion/react'
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Palette, Package, Lightbulb, CheckCircle } from 'lucide-react'

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

interface InteriorDesignProps {
  choices: InteriorChoices
  onChange: (choices: InteriorChoices) => void
  pricing: PricingData
  onNext: () => void
  onBack: () => void
}

const furniturePackages = [
  { 
    id: 'basic', 
    name: 'Basic Package', 
    price: 15, 
    description: 'Essential furnishing with quality basics',
    features: ['Standard furniture', 'Basic lighting', 'Simple decor']
  },
  { 
    id: 'premium', 
    name: 'Premium Package', 
    price: 25, 
    description: 'Upgraded materials and designer touches',
    features: ['Designer furniture', 'Enhanced lighting', 'Quality decor', 'Custom accents']
  },
  { 
    id: 'luxury', 
    name: 'Luxury Package', 
    price: 40, 
    description: 'High-end materials and bespoke design',
    features: ['Luxury furniture', 'Smart lighting', 'Premium decor', 'Bespoke elements', 'Artwork included']
  }
]

const wallColors = [
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Warm Cream', value: '#f9f7f4' },
  { name: 'Soft Gray', value: '#f5f5f5' },
  { name: 'Light Blue', value: '#e8f4f8' },
  { name: 'Sage Green', value: '#e8f2e8' },
  { name: 'Blush Pink', value: '#fdf2f2' },
  { name: 'Lavender', value: '#f3f2ff' },
  { name: 'Peach', value: '#fff4e8' },
]

export function InteriorDesign({ choices, onChange, pricing, onNext, onBack }: InteriorDesignProps) {
  const updateChoice = <K extends keyof InteriorChoices>(key: K, value: InteriorChoices[K]) => {
    onChange({ ...choices, [key]: value })
  }

  const canProceed = choices.furniturePackage && choices.wallColor

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Interior Design
        </h2>
        <p className="text-gray-600">
          Choose your interior finishes and see the pricing update in real-time.
        </p>
      </div>

      <div className="space-y-8">
        {/* Furniture Packages */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              Furniture Package
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {furniturePackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      choices.furniturePackage === pkg.id
                        ? 'border-orange-300 bg-orange-50/80 shadow-lg'
                        : 'border-gray-200/50 bg-white/40 hover:border-orange-200 hover:bg-orange-50/40'
                    }`}
                    onClick={() => updateChoice('furniturePackage', pkg.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                        <p className="text-2xl font-bold text-orange-600">${pkg.price}/sq ft</p>
                      </div>
                      {choices.furniturePackage === pkg.id && (
                        <CheckCircle className="w-6 h-6 text-orange-500" />
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                    
                    <ul className="space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wall Colors */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Palette className="w-5 h-5 text-orange-600" />
              </div>
              Wall Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {wallColors.map((color) => (
                <motion.div
                  key={color.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`relative w-full aspect-square rounded-lg cursor-pointer border-3 transition-all duration-200 ${
                      choices.wallColor === color.value
                        ? 'border-orange-400 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => updateChoice('wallColor', color.value)}
                  >
                    {choices.wallColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-orange-500 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-600">{color.name}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lighting Ambiance */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Lightbulb className="w-5 h-5 text-orange-600" />
              </div>
              Lighting Ambiance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Brightness Level</Label>
                <div className="text-sm text-gray-600">
                  {choices.lightingAmbiance}% 
                  {choices.lightingAmbiance < 30 ? ' (Mood)' : 
                   choices.lightingAmbiance < 70 ? ' (Comfortable)' : ' (Bright)'}
                </div>
              </div>
              
              <Slider
                value={[choices.lightingAmbiance]}
                onValueChange={([value]) => updateChoice('lightingAmbiance', value)}
                max={100}
                step={1}
                className="w-full"
              />
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Dim</span>
                <span>Medium</span>
                <span>Bright</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Pricing Preview */}
        {pricing.interiorCost > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-teal-700">Interior Design Cost</h4>
                <p className="text-sm text-teal-600">Based on your selections</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-700">
                  ${pricing.interiorCost.toLocaleString()}
                </div>
                <div className="text-sm text-teal-600">
                  Total cost for interior design
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-6"
        >
          Back to Room Data
        </Button>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Pricing Summary
          </Button>
        </motion.div>
      </div>
    </div>
  )
}