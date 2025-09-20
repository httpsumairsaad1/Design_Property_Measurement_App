import { motion } from 'motion/react'
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { Settings, Bell, Palette, Ruler, Globe } from 'lucide-react'
import { useState } from 'react'

interface AppSettingsProps {
  onBack: () => void
}

export function AppSettings({ onBack }: AppSettingsProps) {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [units, setUnits] = useState('imperial')
  const [precision, setPrecision] = useState([2])
  const [theme, setTheme] = useState('light')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Settings
        </h2>
        <p className="text-gray-600">
          Customize your Home Surveyor 2025 experience and preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-save projects</Label>
                <p className="text-sm text-gray-500">
                  Automatically save your progress as you work
                </p>
              </div>
              <Switch 
                checked={autoSave} 
                onCheckedChange={setAutoSave}
              />
            </div>

            <div className="space-y-2">
              <Label>Measurement Units</Label>
              <Select value={units} onValueChange={setUnits}>
                <SelectTrigger className="bg-white/80 border-gray-200/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imperial">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      Imperial (ft, in)
                    </div>
                  </SelectItem>
                  <SelectItem value="metric">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      Metric (m, cm)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Decimal Precision</Label>
                <span className="text-sm text-gray-600">{precision[0]} places</span>
              </div>
              <Slider
                value={precision}
                onValueChange={setPrecision}
                max={4}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance & Notifications */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Palette className="w-5 h-5 text-orange-600" />
              </div>
              Appearance & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Enable Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified about important updates
                </p>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="bg-white/80 border-gray-200/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light Theme</SelectItem>
                  <SelectItem value="dark">Dark Theme</SelectItem>
                  <SelectItem value="auto">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </Label>
              <Select value="en" onValueChange={() => {}}>
                <SelectTrigger className="bg-white/80 border-gray-200/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Application Info */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl lg:col-span-2">
          <CardHeader>
            <CardTitle>About Home Surveyor 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">v2.0.1</div>
                <div className="text-sm text-gray-600">Current Version</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                <div className="text-2xl font-bold text-teal-600 mb-2">2025</div>
                <div className="text-sm text-gray-600">Latest Features</div>
              </div>
              
  
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              © 2025 Home Surveyor. Built with cutting-edge technology for accurate property measurements.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview of Settings */}
      {(units !== 'imperial' || precision[0] !== 2 || !autoSave) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6"
        >
          <h4 className="font-medium text-blue-700 mb-3">Settings Preview</h4>
          <div className="space-y-2 text-sm text-blue-600">
            <div>• Measurements will be displayed in {units === 'imperial' ? 'feet and inches' : 'meters and centimeters'}</div>
            <div>• Decimal precision set to {precision[0]} place{precision[0] !== 1 ? 's' : ''}</div>
            <div>• Auto-save is {autoSave ? 'enabled' : 'disabled'}</div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-start pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-6"
        >
          Back to Certificate
        </Button>
      </div>
    </div>
  )
}