import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Building2, MapPin } from "lucide-react";

interface ProjectData {
  name: string;
  address: string;
  type: "apartment" | "house";
}

interface PropertyDataProps {
  data: ProjectData;
  onChange: (data: ProjectData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PropertyData({
  data,
  onChange,
  onNext,
  onBack,
}: PropertyDataProps) {
  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!data.name.trim())
      newErrors.name = "Project name is required";
    if (!data.address.trim())
      newErrors.address = "Property address is required";
    if (!data.type)
      newErrors.type = "Property type is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const updateData = (
    field: keyof ProjectData,
    value: string,
  ) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
          Property Data
        </h2>
        <p className="text-gray-600">
          Provide detailed information about the property being
          surveyed.
        </p>
      </div>

      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-lime-100 rounded-lg">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            Property Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-name">
                  Project Name
                </Label>
                <Input
                  id="project-name"
                  value={data.name}
                  onChange={(e) =>
                    updateData("name", e.target.value)
                  }
                  placeholder="e.g., Downtown Apartment Survey"
                  className={`bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200 ${
                    errors.name
                      ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                      : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Property Address
              </Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) =>
                  updateData("address", e.target.value)
                }
                placeholder="Complete street address including city and postal code"
                className={`bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200 ${
                  errors.address
                    ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                    : ""
                }`}
              />
              {errors.address && (
                <p className="text-sm text-red-600">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-type">
                Property Type
              </Label>
              <Select
                value={data.type}
                onValueChange={(value: "apartment" | "house") =>
                  updateData("type", value)
                }
              >
                <SelectTrigger
                  className={`bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200 ${
                    errors.type
                      ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                      : ""
                  }`}
                >
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
                      <Building2 className="w-4 h-4" />
                      House
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-600">
                  {errors.type}
                </p>
              )}
            </div>

            <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-lg p-6 border border-lime-200">
              <h4 className="font-medium text-green-700 mb-3">
                Property Summary
              </h4>
              <div className="space-y-2 text-sm text-green-600">
                <div>
                  <strong>Project:</strong>{" "}
                  {data.name || "Not specified"}
                </div>
                <div>
                  <strong>Address:</strong>{" "}
                  {data.address || "Not specified"}
                </div>
                <div>
                  <strong>Type:</strong>{" "}
                  {data.type
                    ? data.type.charAt(0).toUpperCase() +
                      data.type.slice(1)
                    : "Not specified"}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6"
        >
          Back to Rooms
        </Button>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue to Creator Data
          </Button>
        </motion.div>
      </div>
    </div>
  );
}