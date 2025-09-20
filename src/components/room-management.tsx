import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import {
  Plus,
  Home,
  Edit,
  Trash2,
  Triangle,
  Square,
  Circle,
  Layers,
  Monitor,
} from "lucide-react";

interface RoomPart {
  id: string;
  name: string;
  template?: "sloping-roof-2m" | "sloping-roof-1m" | "kitchen";
  type: "add" | "subtract";
  shape: string;
  ceilingHeight: number;
  width: number;
  length: number;
  area: number;
}

interface Room {
  id: string;
  name: string;
  type: string;
  usage: string;
  shape: string;
  ceilingHeight: number;
  area: number;
  width: number;
  length: number;
  position: number;
  parts: RoomPart[];
  additionalInfo: string;
  flooringType?: string;
  wallMaterial?: string;
}

interface RoomManagementProps {
  rooms: Room[];
  onChange: (rooms: Room[]) => void;
  projectName: string;
  onNext: () => void;
}

const roomTemplates = [
  {
    id: "sloping-roof-2m",
    name: "Sloping roof < 2m",
    icon: Triangle,
  },
  {
    id: "sloping-roof-1m",
    name: "Sloping roof < 1m",
    icon: Triangle,
  },
  { id: "kitchen", name: "Kitchen", icon: Square },
];

const roomShapes = [
  { value: "rectangular", label: "Rectangular" },
  { value: "square", label: "Square" },
  { value: "l-shaped", label: "L-Shaped" },
  { value: "irregular", label: "Irregular" },
];

const flooringTypes = [
  { value: "carpet", label: "Carpet" },
  { value: "hardwood", label: "Hardwood" },
  { value: "laminate", label: "Laminate" },
  { value: "tile", label: "Tile" },
  { value: "vinyl", label: "Vinyl" },
  { value: "concrete", label: "Concrete" },
];

const wallMaterials = [
  { value: "drywall", label: "Drywall" },
  { value: "brick", label: "Brick" },
  { value: "concrete", label: "Concrete" },
  { value: "wood", label: "Wood" },
  { value: "plaster", label: "Plaster" },
];

const roomTypeIcons = {
  "Living Room": Home,
  Bedroom: Home,
  Kitchen: Square,
  Bathroom: Circle,
  Office: Monitor,
  Other: Layers,
};

export function RoomManagement({
  rooms,
  onChange,
  projectName,
  onNext,
}: RoomManagementProps) {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState<string | null>(
    null,
  );
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    name: "",
    type: "Living Room",
    usage: "residential",
    shape: "rectangular",
    ceilingHeight: 2.5,
    width: 0,
    length: 0,
    area: 0,
    additionalInfo: "",
    parts: [],
    flooringType: "carpet",
    wallMaterial: "drywall",
  });
  const [newRoomPart, setNewRoomPart] = useState<
    Partial<RoomPart>
  >({
    name: "",
    type: "add",
    shape: "rectangular",
    ceilingHeight: 2.5,
    width: 0,
    length: 0,
    area: 0,
  });
  const [showCreatePart, setShowCreatePart] = useState(false);

  const calculateArea = (width: number, length: number) =>
    width * length;

  const addRoom = () => {
    if (!newRoom.name || !newRoom.width || !newRoom.length)
      return;

    const room: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name: newRoom.name || "",
      type: newRoom.type || "Living Room",
      usage: newRoom.usage || "residential",
      shape: newRoom.shape || "rectangular",
      ceilingHeight: newRoom.ceilingHeight || 2.5,
      width: newRoom.width || 0,
      length: newRoom.length || 0,
      area: calculateArea(
        newRoom.width || 0,
        newRoom.length || 0,
      ),
      position: rooms.length + 1,
      parts: newRoom.parts || [],
      additionalInfo: newRoom.additionalInfo || "",
      flooringType: newRoom.flooringType || "carpet",
      wallMaterial: newRoom.wallMaterial || "drywall",
    };

    onChange([...rooms, room]);
    setNewRoom({
      name: "",
      type: "Living Room",
      usage: "residential",
      shape: "rectangular",
      ceilingHeight: 2.5,
      width: 0,
      length: 0,
      area: 0,
      additionalInfo: "",
      parts: [],
      flooringType: "carpet",
      wallMaterial: "drywall",
    });
    setShowCreateRoom(false);
  };

  const updateRoom = (
    roomId: string,
    updates: Partial<Room>,
  ) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        const updatedRoom = { ...room, ...updates };
        if (
          updates.width !== undefined ||
          updates.length !== undefined
        ) {
          updatedRoom.area = calculateArea(
            updatedRoom.width,
            updatedRoom.length,
          );
        }
        return updatedRoom;
      }
      return room;
    });
    onChange(updatedRooms);
  };

  const removeRoom = (id: string) => {
    onChange(rooms.filter((room) => room.id !== id));
  };

  const addRoomPart = (roomId: string) => {
    if (
      !newRoomPart.name ||
      !newRoomPart.width ||
      !newRoomPart.length
    )
      return;

    const part: RoomPart = {
      id: Math.random().toString(36).substr(2, 9),
      name: newRoomPart.name || "",
      template: newRoomPart.template,
      type: newRoomPart.type || "add",
      shape: newRoomPart.shape || "rectangular",
      ceilingHeight: newRoomPart.ceilingHeight || 2.5,
      width: newRoomPart.width || 0,
      length: newRoomPart.length || 0,
      area: calculateArea(
        newRoomPart.width || 0,
        newRoomPart.length || 0,
      ),
    };

    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        const newParts = [...room.parts, part];
        const totalPartsArea = newParts.reduce((sum, p) => {
          return p.type === "add" ? sum + p.area : sum - p.area;
        }, room.area);

        return {
          ...room,
          parts: newParts,
          area: Math.max(0, totalPartsArea),
        };
      }
      return room;
    });

    onChange(updatedRooms);
    setNewRoomPart({
      name: "",
      type: "add",
      shape: "rectangular",
      ceilingHeight: 2.5,
      width: 0,
      length: 0,
      area: 0,
    });
    setShowCreatePart(false);
  };

  const removeRoomPart = (roomId: string, partId: string) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        const newParts = room.parts.filter(
          (part) => part.id !== partId,
        );
        const totalPartsArea = newParts.reduce((sum, p) => {
          return p.type === "add" ? sum + p.area : sum - p.area;
        }, room.width * room.length);

        return {
          ...room,
          parts: newParts,
          area: Math.max(0, totalPartsArea),
        };
      }
      return room;
    });
    onChange(updatedRooms);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent mb-2">
            Room Measurements
          </h2>
          <p className="text-gray-600">
            Add rooms with dimensions, materials, and
            specifications
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => setShowCreateRoom(true)}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Room
          </Button>
        </motion.div>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {rooms.map((room, index) => {
            const IconComponent =
              roomTypeIcons[
                room.type as keyof typeof roomTypeIcons
              ] || Home;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                className="relative group"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-lime-500/50">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        {editingRoom === room.id ? (
                          <Input
                            value={room.name}
                            onChange={(e) =>
                              updateRoom(room.id, {
                                name: e.target.value,
                              })
                            }
                            onBlur={() => setEditingRoom(null)}
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              setEditingRoom(null)
                            }
                            className="bg-green-50 border-green-200 text-green-800 text-sm font-medium"
                          />
                        ) : (
                          <h3
                            className="text-green-800 cursor-pointer hover:text-lime-600 transition-colors text-sm font-medium"
                            onClick={() =>
                              setEditingRoom(room.id)
                            }
                          >
                            ROOM {index + 1}
                          </h3>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRoom(room.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Room Details Grid */}
                  <div className="space-y-3">
                    {/* Room Type Selector */}
                    <div>
                      <Label className="text-gray-700 text-xs">
                        Room Type
                      </Label>
                      <Select
                        value={room.type}
                        onValueChange={(value) =>
                          updateRoom(room.id, { type: value })
                        }
                      >
                        <SelectTrigger className="bg-green-50 border-green-200 text-green-800 mt-1 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-green-200">
                          <SelectItem value="Living Room">
                            Living Room
                          </SelectItem>
                          <SelectItem value="Bedroom">
                            Bedroom
                          </SelectItem>
                          <SelectItem value="Kitchen">
                            Kitchen
                          </SelectItem>
                          <SelectItem value="Bathroom">
                            Bathroom
                          </SelectItem>
                          <SelectItem value="Office">
                            Office
                          </SelectItem>
                          <SelectItem value="Other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dimensions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-700 text-xs">
                          Width (m)
                        </Label>
                        <Input
                          type="number"
                          value={room.width}
                          onChange={(e) =>
                            updateRoom(room.id, {
                              width:
                                parseFloat(e.target.value) || 0,
                            })
                          }
                          className="bg-green-50 border-green-200 text-green-800 mt-1 h-8 text-sm"
                          step="0.1"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 text-xs">
                          Length (m)
                        </Label>
                        <Input
                          type="number"
                          value={room.length}
                          onChange={(e) =>
                            updateRoom(room.id, {
                              length:
                                parseFloat(e.target.value) || 0,
                            })
                          }
                          className="bg-green-50 border-green-200 text-green-800 mt-1 h-8 text-sm"
                          step="0.1"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Room Details Display */}
                    <div className="mt-4 pt-3 border-t border-green-200/50 space-y-2">
                      {/* Area */}
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                        <span className="text-gray-700 text-xs">
                          Square meters:
                        </span>
                        <span className="text-green-700 font-medium text-xs">
                          {room.area.toFixed(3)} m²
                        </span>
                      </div>

                      {/* Room Height */}
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                        <span className="text-gray-700 text-xs">
                          Room height:
                        </span>
                        <span className="text-green-800 font-medium text-xs">
                          {room.ceilingHeight.toFixed(3)} m
                        </span>
                      </div>

                      {/* Room Position */}
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                        <span className="text-gray-700 text-xs">
                          Room position:
                        </span>
                        <span className="text-green-800 font-medium text-xs">
                          {index + 1}
                        </span>
                      </div>

                      {/* DIN 277 */}
                      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-lime-100 to-green-100 rounded-md border border-lime-300/50">
                        <span className="text-green-700 text-xs font-medium">
                          DIN 277:
                        </span>
                        <span className="text-green-800 font-medium text-xs">
                          {room.area.toFixed(3)} m²
                        </span>
                      </div>
                    </div>

                    {/* Room Parts */}
                    {room.parts.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <Label className="text-gray-700 text-xs">
                          Room Parts
                        </Label>
                        {room.parts.map((part) => (
                          <div
                            key={part.id}
                            className="flex items-center justify-between p-2 bg-green-50 rounded-md"
                          >
                            <div>
                              <div className="text-green-800 text-xs flex items-center gap-2">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-xs ${
                                    part.type === "add"
                                      ? "bg-green-200 text-green-700"
                                      : "bg-red-100 text-red-600"
                                  }`}
                                >
                                  {part.type === "add"
                                    ? "+"
                                    : "-"}
                                </span>
                                {part.name}
                              </div>
                              <div className="text-gray-600 text-xs">
                                {part.width} × {part.length} m ={" "}
                                {part.area.toFixed(2)} m²
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeRoomPart(room.id, part.id)
                              }
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Room Part Button */}
                    <Button
                      variant="outline"
                      onClick={() => setShowCreatePart(room.id)}
                      className="w-full mt-3 border-dashed border-green-300 hover:border-green-400 text-green-600 hover:text-green-700 bg-transparent hover:bg-green-50 h-8 text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Room Part
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {rooms.length === 0 && (
        <div className="text-center py-12">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-500 mb-2">
            No rooms created yet
          </h3>
          <p className="text-gray-400 mb-4">
            Start by creating your first room
          </p>
          <Button
            onClick={() => setShowCreateRoom(true)}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Room
          </Button>
        </div>
      )}

      {/* Create Room Modal */}
      <AnimatePresence>
        {showCreateRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateRoom(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-green-800 mb-6">
                Create New Room
              </h3>

              <div className="space-y-6">
                {/* Room Type */}
                <div className="space-y-4">
                  <Label>Room Information</Label>
                  <div className="grid gap-4">
                    <div>
                      <Label>Room Name</Label>
                      <Input
                        value={newRoom.name}
                        onChange={(e) =>
                          setNewRoom({
                            ...newRoom,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g., Master Bedroom, Kitchen"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select
                        value={newRoom.type}
                        onValueChange={(value) =>
                          setNewRoom({
                            ...newRoom,
                            type: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Living Room">
                            Living Room
                          </SelectItem>
                          <SelectItem value="Bedroom">
                            Bedroom
                          </SelectItem>
                          <SelectItem value="Kitchen">
                            Kitchen
                          </SelectItem>
                          <SelectItem value="Bathroom">
                            Bathroom
                          </SelectItem>
                          <SelectItem value="Office">
                            Office
                          </SelectItem>
                          <SelectItem value="Other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Measurements */}
                <div className="space-y-4">
                  <Label>Measurements</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Width (m)</Label>
                      <Input
                        type="number"
                        value={newRoom.width}
                        onChange={(e) => {
                          const width =
                            parseFloat(e.target.value) || 0;
                          setNewRoom({
                            ...newRoom,
                            width,
                            area: calculateArea(
                              width,
                              newRoom.length || 0,
                            ),
                          });
                        }}
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label>Length (m)</Label>
                      <Input
                        type="number"
                        value={newRoom.length}
                        onChange={(e) => {
                          const length =
                            parseFloat(e.target.value) || 0;
                          setNewRoom({
                            ...newRoom,
                            length,
                            area: calculateArea(
                              newRoom.width || 0,
                              length,
                            ),
                          });
                        }}
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="grid md:grid-cols-2 gap-4"></div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-green-600 text-sm">
                      Calculated Area
                    </div>
                    <div className="text-green-700 font-medium">
                      {newRoom.area?.toFixed(2) || "0.00"} m²
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateRoom(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={addRoom}
                  disabled={
                    !newRoom.name ||
                    !newRoom.width ||
                    !newRoom.length
                  }
                  className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white"
                >
                  Create Room
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Room Part Modal */}
      <AnimatePresence>
        {showCreatePart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreatePart(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-green-800 mb-6">
                Create New Room Part
              </h3>

              <div className="space-y-6">
                {/* Templates */}
                <div className="space-y-4">
                  <Label>Select Template (Optional)</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {roomTemplates.map((template) => {
                      const Icon = template.icon;
                      return (
                        <Button
                          key={template.id}
                          variant={
                            newRoomPart.template === template.id
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setNewRoomPart({
                              ...newRoomPart,
                              template: template.id as any,
                            })
                          }
                          className="p-4 h-auto flex flex-col gap-2"
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-sm">
                            {template.name}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Room Info */}
                <div className="space-y-4">
                  <Label>Room Part Information</Label>
                  <div className="grid gap-4">
                    <div>
                      <Label>Part Name</Label>
                      <Input
                        value={newRoomPart.name}
                        onChange={(e) =>
                          setNewRoomPart({
                            ...newRoomPart,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g., Kitchen Island, Bay Window"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-md text-white ${
                            newRoomPart.type === "add"
                              ? "bg-green-600"
                              : "bg-green-400"
                          }`}
                          onClick={() =>
                            setNewRoomPart({
                              ...newRoomPart,
                              type: "add",
                            })
                          }
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-md text-white ${
                            newRoomPart.type === "subtract"
                              ? "bg-red-600"
                              : "bg-red-400"
                          }`}
                          onClick={() =>
                            setNewRoomPart({
                              ...newRoomPart,
                              type: "subtract",
                            })
                          }
                        >
                          Subtract
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Measurements */}
                <div className="space-y-4">
                  <Label>Measurements</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Width (m)</Label>
                      <Input
                        type="number"
                        value={newRoomPart.width}
                        onChange={(e) => {
                          const width =
                            parseFloat(e.target.value) || 0;
                          setNewRoomPart({
                            ...newRoomPart,
                            width,
                            area: calculateArea(
                              width,
                              newRoomPart.length || 0,
                            ),
                          });
                        }}
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label>Length (m)</Label>
                      <Input
                        type="number"
                        value={newRoomPart.length}
                        onChange={(e) => {
                          const length =
                            parseFloat(e.target.value) || 0;
                          setNewRoomPart({
                            ...newRoomPart,
                            length,
                            area: calculateArea(
                              newRoomPart.width || 0,
                              length,
                            ),
                          });
                        }}
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-sm">
                      Calculated Area
                    </div>
                    <div className="text-blue-700 font-medium">
                      {newRoomPart.area?.toFixed(2) || "0.00"}{" "}
                      m²
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowCreatePart(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (typeof showCreatePart === "string") {
                      addRoomPart(showCreatePart);
                    }
                  }}
                  disabled={
                    !newRoomPart.name ||
                    !newRoomPart.width ||
                    !newRoomPart.length
                  }
                  className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white"
                >
                  Add Room Part
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Step */}
      {rooms.length > 0 && (
        <div className="flex justify-end mt-8">
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white px-8 py-3"
          >
            Continue to Property Data
          </Button>
        </div>
      )}
    </div>
  );
}