import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Building2, Home } from 'lucide-react'

interface ProjectData {
  name: string
  owner: string
  address: string
  type: 'apartment' | 'house'
}

interface ProjectInfoProps {
  data: ProjectData
  onChange: (data: ProjectData) => void
  onNext: () => void
}

export function ProjectInfo({ data, onChange, onNext }: ProjectInfoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!data.name.trim()) newErrors.name = 'Project name is required'
    if (!data.owner.trim()) newErrors.owner = 'Owner name is required'
    if (!data.address.trim()) newErrors.address = 'Address is required'
    if (!data.type) newErrors.type = 'Project type is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onNext()
    }
  }

  const updateData = (field: keyof ProjectData, value: string) => {
    onChange({ ...data, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Project Information
        </h2>
        <p className="text-gray-600">
          Let's start by gathering some basic information about your property measurement project.
        </p>
      </div>

      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building2 className="w-5 h-5 text-orange-600" />
            </div>
            Basic Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={data.name}
                  onChange={(e) => updateData('name', e.target.value)}
                  placeholder="e.g., Downtown Apartment Survey"
                  className={`bg-white/80 border-gray-200/50 focus:border-orange-300 focus:ring-orange-200 ${
                    errors.name ? 'border-red-300 focus:border-red-300 focus:ring-red-200' : ''
                  }`}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner-name">Property Owner</Label>
                <Input
                  id="owner-name"
                  value={data.owner}
                  onChange={(e) => updateData('owner', e.target.value)}
                  placeholder="Full name of property owner"
                  className={`bg-white/80 border-gray-200/50 focus:border-orange-300 focus:ring-orange-200 ${
                    errors.owner ? 'border-red-300 focus:border-red-300 focus:ring-red-200' : ''
                  }`}
                />
                {errors.owner && <p className="text-sm text-red-600">{errors.owner}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Property Address</Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) => updateData('address', e.target.value)}
                placeholder="Complete street address including city and state"
                className={`bg-white/80 border-gray-200/50 focus:border-orange-300 focus:ring-orange-200 ${
                  errors.address ? 'border-red-300 focus:border-red-300 focus:ring-red-200' : ''
                }`}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select value={data.type} onValueChange={(value: 'apartment' | 'house') => updateData('type', value)}>
                <SelectTrigger className={`bg-white/80 border-gray-200/50 focus:border-orange-300 focus:ring-orange-200 ${
                  errors.type ? 'border-red-300 focus:border-red-300 focus:ring-red-200' : ''
                }`}>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Apartment
                    </div>
                  </SelectItem>
                  <SelectItem value="house">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      House
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
            </div>

            <div className="flex justify-end pt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Continue to Room Data
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}