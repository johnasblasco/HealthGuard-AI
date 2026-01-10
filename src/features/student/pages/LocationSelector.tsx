import { useState } from 'react';
import { Building2, DoorOpen, MapPin } from 'lucide-react';

interface Seat {
    number: string;
    id: string;
}

interface Room {
    name: string;
    seats: Seat[];
}

interface LocationData {
    building: string;
    rooms: Room[];
}

interface LocationSelectorProps {
    locations: LocationData[];
    loading?: boolean;
    selectedLocation: {
        seatId: string;
        building: string;
        room: string;
        seatNumber: string;
    };
    onLocationChange: (location: { seatId: string; building: string; room: string; seatNumber: string }) => void;
}
export function LocationSelector({
    locations,
    loading,
    selectedLocation = { seatId: '', building: '', room: '', seatNumber: '' },
    onLocationChange,
}: LocationSelectorProps) {


    const [step, setStep] = useState<'building' | 'room' | 'seat'>('building');

    const selectedBuildingData: LocationData | undefined = locations.find(
        loc => loc.building === selectedLocation.building
    );

    const handleBuildingSelect = (building: string) => {
        onLocationChange({ building, room: '', seatNumber: '', seatId: '' });
        setStep('room');
    };

    const handleRoomSelect = (room: string) => {
        onLocationChange({ ...selectedLocation, room, seatNumber: '', seatId: '' });
        setStep('seat');
    };

    const handleSeatInput = (seatNumber: string) => {
        const roomData = selectedBuildingData?.rooms.find(r => r.name === selectedLocation.room);
        const seat = roomData?.seats.find(s => s.number.toUpperCase() === seatNumber.toUpperCase());

        if (!seat) {
            // Seat not found, show error but don't allow submission
            onLocationChange({
                ...selectedLocation,
                seatNumber: seatNumber.toUpperCase(),
                seatId: ""
            });
            return;
        }

        onLocationChange({
            ...selectedLocation,
            seatNumber: seatNumber.toUpperCase(),
            seatId: seat.id
        });
    };


    if (loading) return <div className="text-center text-gray-500">Loading locations...</div>;
    if (!locations?.length) return <div className="text-center text-gray-500">No locations available.</div>;


    return (
        <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2">
                <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 'building' ? 'bg-blue-600 text-white' : 'bg-green-100 text-green-700'
                        }`}
                >
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">Building</span>
                </div>
                <div className={`w-8 h-0.5 ${selectedLocation.building ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 'room'
                        ? 'bg-blue-600 text-white'
                        : selectedLocation.room
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                >
                    <DoorOpen className="w-4 h-4" />
                    <span className="text-sm">Room</span>
                </div>
                <div className={`w-8 h-0.5 ${selectedLocation.room ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 'seat'
                        ? 'bg-blue-600 text-white'
                        : selectedLocation.seatNumber
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Seat</span>
                </div>
            </div>

            {/* Building Selection */}
            {step === 'building' && (
                <div className="space-y-3">
                    <h3 className="text-center text-gray-700">Select Your Building</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {locations.map(location => (
                            <button
                                key={location.building}
                                onClick={() => handleBuildingSelect(location.building)}
                                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        <Building2 className="w-8 h-8 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-gray-900">{location.building}</div>
                                        <div className="text-sm text-gray-500">{location.rooms.length} rooms</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Room Selection */}
            {step === 'room' && selectedBuildingData && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-700">Select Your Room</h3>
                        <button
                            onClick={() => setStep('building')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Change Building
                        </button>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg mb-3">
                        <div className="flex items-center gap-2 text-blue-900">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">{selectedLocation.building}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {selectedBuildingData.rooms.map(room => (
                            <button
                                key={room.name}
                                onClick={() => handleRoomSelect(room.name)}
                                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <DoorOpen className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm text-gray-900">{room.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Seat Number Input */}
            {/* Seat Selection */}
            {step === 'seat' && selectedBuildingData && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-700">Select Your Seat</h3>
                        <button
                            onClick={() => setStep('room')}
                            className="text-sm text-blue-600 hover:underline"
                            type="button"
                        >
                            Change Room
                        </button>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg mb-3 space-y-1">
                        <div className="flex items-center gap-2 text-blue-900">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">{selectedLocation.building}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-900">
                            <DoorOpen className="w-4 h-4" />
                            <span className="text-sm">Room {selectedLocation.room}</span>
                        </div>
                    </div>

                    {(() => {
                        const roomData = selectedBuildingData.rooms.find(r => r.name === selectedLocation.room);
                        const seats = roomData?.seats ?? [];

                        if (!roomData) {
                            return <p className="text-sm text-red-600">Room not found in data.</p>;
                        }

                        return (
                            <div className="space-y-3">
                                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                                    {seats.map((seat) => {
                                        const isSelected = selectedLocation.seatId === seat.id;
                                        return (
                                            <button
                                                key={seat.id}
                                                type="button"
                                                onClick={() =>
                                                    onLocationChange({
                                                        ...selectedLocation,
                                                        seatNumber: seat.number,
                                                        seatId: seat.id, // ✅ REAL UUID
                                                    })
                                                }
                                                className={`p-3 rounded-lg border-2 transition-all ${isSelected
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                                                    }`}
                                            >
                                                {seat.number}
                                            </button>
                                        );
                                    })}
                                </div>

                                <p className="text-sm text-gray-500 text-center">
                                    Tap your seat number. (This guarantees a valid seatId.)
                                </p>
                            </div>
                        );
                    })()}
                </div>
            )}

        </div>
    );
}
