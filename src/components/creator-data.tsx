import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { User, Mail, Phone, Badge } from "lucide-react";

interface CreatorDataProps {
  onNext: () => void;
  onBack: () => void;
}

interface CreatorInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  license: string;
  title: string;
}

export function CreatorData({
  onNext,
  onBack,
}: CreatorDataProps) {
  const [creatorInfo, setCreatorInfo] = useState<CreatorInfo>({
    name: "",
    email: "",
    phone: "",
    company: "",
    license: "",
    title: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!creatorInfo.name.trim())
      newErrors.name = "Name is required";
    if (!creatorInfo.email.trim())
      newErrors.email = "Email is required";
    if (
      creatorInfo.email &&
      !/\S+@\S+\.\S+/.test(creatorInfo.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const updateCreatorInfo = (
    field: keyof CreatorInfo,
    value: string,
  ) => {
    setCreatorInfo({ ...creatorInfo, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
          Creator Data
        </h2>
        <p className="text-gray-600">
          Information about the surveyor or professional
          creating this measurement report.
        </p>
      </div>

      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-lime-100 rounded-lg">
              <User className="w-5 h-5 text-green-600" />
            </div>
            Professional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="creator-name">
                  Full Name *
                </Label>
                <Input
                  id="creator-name"
                  value={creatorInfo.name}
                  onChange={(e) =>
                    updateCreatorInfo("name", e.target.value)
                  }
                  placeholder="Your full name"
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="creator-email"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="creator-email"
                  type="email"
                  value={creatorInfo.email}
                  onChange={(e) =>
                    updateCreatorInfo("email", e.target.value)
                  }
                  placeholder="your.email@example.com"
                  className={`bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200 ${
                    errors.email
                      ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                      : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="creator-phone"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="creator-phone"
                  value={creatorInfo.phone}
                  onChange={(e) =>
                    updateCreatorInfo("phone", e.target.value)
                  }
                  placeholder="+1 (555) 123-4567"
                  className="bg-white/80 border-gray-200/50 focus:border-lime-300 focus:ring-lime-200"
                />
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-lg p-6 border border-lime-200">
              <h4 className="font-medium text-green-700 mb-3">
                Creator Information Preview
              </h4>
              <div className="space-y-2 text-sm text-green-600">
                <div>
                  <strong>Name:</strong>{" "}
                  {creatorInfo.name || "Not specified"}
                </div>
                <div>
                  <strong>Title:</strong>{" "}
                  {creatorInfo.title || "Not specified"}
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  {creatorInfo.email || "Not specified"}
                </div>
                <div>
                  <strong>Phone:</strong>{" "}
                  {creatorInfo.phone || "Not specified"}
                </div>
                <div>
                  <strong>License:</strong>{" "}
                  {creatorInfo.license || "Not specified"}
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
          Back to Property Data
        </Button>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue to Customer Data
          </Button>
        </motion.div>
      </div>
    </div>
  );
}