import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Plus, Home, Bed, ChefHat, Bath, Sofa, Briefcase, Car, Trash2 } from 'lucide-react'

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

interface RoomDataProps {
  rooms: Room[]
  onChange: (rooms: Room[]) => void
  onNext: () => void
  onBack: () => void
}

const roomTypes = [
  { value: 'living-room', label: 'Living Room', icon: Sofa },
  { value: 'bedroom', label: 'Bedroom', icon: Bed },
  { value: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { value: 'bathroom', label: 'Bathroom', icon: Bath },
  { value: 'office', label: 'Office', icon: Briefcase },
  { value: 'garage', label: 'Garage', icon: Car },
  { value: 'other', label: 'Other', icon: Home },
]

const flooringMaterials = [
  { value: 'hardwood', label: 'Hardwood ($8.50/sq ft)' },
  { value: 'tile', label: 'Tile ($6.20/sq ft)' },
  { value: 'carpet', label: 'Carpet ($4.80/sq ft)' },
  { value: 'vinyl', label: 'Vinyl ($3.50/sq ft)' },
  { value: 'marble', label: 'Marble ($12.00/sq ft)' },
  { value: 'laminate', label: 'Laminate ($5.50/sq ft)' },
]

const wallMaterials = [
  { value: 'drywall', label: 'Drywall ($2.00/sq ft)' },
  { value: 'brick', label: 'Brick ($4.50/sq ft)' },
  { value: 'wood-paneling', label: 'Wood Paneling ($6.00/sq ft)' },
  { value: 'stone', label: 'Stone ($8.00/sq ft)' },
  { value: 'tile', label: 'Tile ($5.50/sq ft)' },
]

export function RoomData({ rooms, onChange, onNext, onBack }: RoomDataProps) {
  const addRoom = () => {
    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      type: '',
      width: 0,
      length: 0,
      area: 0,
      flooringMaterial: '',
      wallMaterial: '',
      icon: 'Home'
    }
    onChange([...rooms, newRoom])
  }

  const updateRoom = (id: string, updates: Partial<Room>) => {
    const updatedRooms = rooms.map(room => {
      if (room.id === id) {
        const updated = { ...room, ...updates }
        // Recalculate area when dimensions change
        if (updates.width !== undefined || updates.length !== undefined) {
          updated.area = updated.width * updated.length
        }
        return updated
      }
      return room
    })
    onChange(updatedRooms)
  }

  const removeRoom = (id: string) => {
    onChange(rooms.filter(room => room.id !== id))
  }

  const getRoomIcon = (type: string) => {
    const roomType = roomTypes.find(rt => rt.value === type)
    return roomType ? roomType.icon : Home
  }

  const totalArea = rooms.reduce((sum, room) => sum + room.area, 0)
  const canProceed = rooms.length > 0 && rooms.every(room => 
    room.name && room.type && room.width > 0 && room.length > 0 && 
    room.flooringMaterial && room.wallMaterial
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Room Data
          </h2>
          <p className="text-gray-600">
            Add rooms and specify their dimensions and materials.
          </p>
        </div>
        
        {totalArea > 0 && (
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-4 py-2 rounded-xl border border-teal-200">
            <div className="text-sm text-teal-600">Total Area</div>
            <div className="text-xl font-medium text-teal-700">{totalArea.toFixed(0)} sq ft</div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {rooms.map((room, index) => {
            const RoomIcon = getRoomIcon(room.type)
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <RoomIcon className="w-5 h-5 text-orange-600" />
                        </div>
                        <span>Room {index + 1}</span>
                        {room.area > 0 && (
                          <span className="text-sm text-gray-500">({room.area.toFixed(0)} sq ft)</span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRoom(room.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Room Name</Label>
                        <Input
                          value={room.name}
                          onChange={(e) => updateRoom(room.id, { name: e.target.value })}
                          placeholder="e.g., Master Bedroom"
                          className="bg-white/80 border-gray-200/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Room Type</Label>
                        <Select 
                          value={room.type} 
                          onValueChange={(value) => updateRoom(room.id, { type: value })}
                        >
                          <SelectTrigger className="bg-white/80 border-gray-200/50">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            {roomTypes.map((type) => {
                              const Icon = type.icon
                              return (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Width (ft)</Label>
                        <Input
                          type="number"
                          value={room.width || ''}
                          onChange={(e) => updateRoom(room.id, { width: parseFloat(e.target.value) || 0 })}
                          placeholder="0"
                          className="bg-white/80 border-gray-200/50"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Length (ft)</Label>
                        <Input
                          type="number"
                          value={room.length || ''}
                          onChange={(e) => updateRoom(room.id, { length: parseFloat(e.target.value) || 0 })}
                          placeholder="0"
                          className="bg-white/80 border-gray-200/50"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Area (sq ft)</Label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 font-medium">
                          {room.area.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Flooring Material</Label>
                        <Select 
                          value={room.flooringMaterial} 
                          onValueChange={(value) => updateRoom(room.id, { flooringMaterial: value })}
                        >
                          <SelectTrigger className="bg-white/80 border-gray-200/50">
                            <SelectValue placeholder="Select flooring" />
                          </SelectTrigger>
                          <SelectContent>
                            {flooringMaterials.map((material) => (
                              <SelectItem key={material.value} value={material.value}>
                                {material.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Wall Material</Label>
                        <Select 
                          value={room.wallMaterial} 
                          onValueChange={(value) => updateRoom(room.id, { wallMaterial: value })}
                        >
                          <SelectTrigger className="bg-white/80 border-gray-200/50">
                            <SelectValue placeholder="Select wall material" />
                          </SelectTrigger>
                          <SelectContent>
                            {wallMaterials.map((material) => (
                              <SelectItem key={material.value} value={material.value}>
                                {material.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={addRoom}
            variant="outline"
            className="w-full py-8 bg-white/60 backdrop-blur-sm border-2 border-dashed border-orange-200 hover:border-orange-300 hover:bg-orange-50/50 text-orange-600 hover:text-orange-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Room
          </Button>
        </motion.div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-6"
        >
          Back to Project Info
        </Button>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Interior Design
          </Button>
        </motion.div>
      </div>
    </div>
  )
}