"use client";

import { useEffect, useState, useRef } from "react";
import PurpleButton from "./Buttons"; // Your button component
import L from "leaflet"; // For Leaflet distance calculations
import axios from "axios"; // For API requests
import "leaflet/dist/leaflet.css"; // Leaflet CSS for styling

interface PickUpDropOffCardProps {
  onSetPickUp: (pickUp: string) => void;
  onSetDropOff: (dropOff: string) => void;
  onSetPreferredPickupTime: (time: string) => void;
  onSetDistance: (distance: "Local" | "Regional" | "Long-haul") => void;
  onContinue: () => void; // New prop for handling continue action
}

interface LocationSuggestion {
  place_id: string;
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
}

const PickUpDropOffCard = ({
  onSetPickUp,
  onSetDropOff,
  onSetPreferredPickupTime,
  onSetDistance,
  onContinue,
}: PickUpDropOffCardProps) => {
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [preferredPickUpTime, setPreferredPickUpTime] = useState("");
  const [selectedDistance, setSelectedDistance] = useState<"Local" | "Regional" | "Long-haul" | null>(null);

  const [pickUpCoords, setPickUpCoords] = useState<L.LatLng | null>(null);
  const [dropOffCoords, setDropOffCoords] = useState<L.LatLng | null>(null);

  const [pickUpSuggestions, setPickUpSuggestions] = useState<LocationSuggestion[]>([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState<LocationSuggestion[]>([]);
  const [showPickUpSuggestions, setShowPickUpSuggestions] = useState(false);
  const [showDropOffSuggestions, setShowDropOffSuggestions] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<{pickup: boolean, dropoff: boolean}>({pickup: false, dropoff: false});

  const openCageAPIKey = "d56ab8b787864d9daabe2b8580bc9ec2"; // Your OpenCage API key
  
  // Debounce timers
  const pickUpTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dropOffTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate the distance between pick-up and drop-off using Leaflet
  const calculateDistance = () => {
    if (pickUpCoords && dropOffCoords) {
      const distance = pickUpCoords.distanceTo(dropOffCoords); // Distance in meters
      const distanceInKm = Math.round(distance / 1000); // Convert to km and round
      setCalculatedDistance(distanceInKm);

      // Set distance category
      let distanceCategory: "Local" | "Regional" | "Long-haul";
      if (distance < 20000) {
        distanceCategory = "Local";
      } else if (distance >= 20000 && distance <= 100000) {
        distanceCategory = "Regional";
      } else {
        distanceCategory = "Long-haul";
      }
      
      setSelectedDistance(distanceCategory);
      onSetDistance(distanceCategory);
      
      console.log(`Distance calculated: ${distanceInKm} km (${distanceCategory})`);
    } else {
      console.log("Cannot calculate distance: missing coordinates", { pickUpCoords, dropOffCoords });
    }
  };

  // Fetch location suggestions as user types
  const fetchLocationSuggestions = async (query: string, isPickUp: boolean) => {
    if (query.length < 2) {
      if (isPickUp) {
        setPickUpSuggestions([]);
        setShowPickUpSuggestions(false);
      } else {
        setDropOffSuggestions([]);
        setShowDropOffSuggestions(false);
      }
      return;
    }

    try {
      setIsLoading(prev => isPickUp ? {...prev, pickup: true} : {...prev, dropoff: true});
      
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${openCageAPIKey}&limit=5&no_annotations=1&min_confidence=5`
      );

      // Debug API response
      console.log(`Got response for ${isPickUp ? 'pickup' : 'dropoff'} location:`, 
        response.data.results ? `${response.data.results.length} results` : 'No results');

      if (response.data.results && response.data.results.length > 0) {
        const suggestions = response.data.results.map((result: any) => ({
          place_id: result.annotations?.osm?.id || String(Math.random()),
          formatted: result.formatted,
          geometry: result.geometry
        }));
        
        if (isPickUp) {
          setPickUpSuggestions(suggestions);
          setShowPickUpSuggestions(true);
        } else {
          setDropOffSuggestions(suggestions);
          setShowDropOffSuggestions(true);
        }
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(prev => isPickUp ? {...prev, pickup: false} : {...prev, dropoff: false});
    }
  };

  // Handle debounced input for suggestions
  const handlePickUpChange = (value: string) => {
    setPickUp(value);
    
    // Clear any existing timeout
    if (pickUpTimerRef.current) {
      clearTimeout(pickUpTimerRef.current);
    }
    
    // Set new timeout for API call
    pickUpTimerRef.current = setTimeout(() => {
      if (value.length >= 2) {
        fetchLocationSuggestions(value, true);
      }
    }, 300); // 300ms debounce
  };

  const handleDropOffChange = (value: string) => {
    setDropOff(value);
    
    // Clear any existing timeout
    if (dropOffTimerRef.current) {
      clearTimeout(dropOffTimerRef.current);
    }
    
    // Set new timeout for API call
    dropOffTimerRef.current = setTimeout(() => {
      if (value.length >= 2) {
        fetchLocationSuggestions(value, false);
      }
    }, 300); // 300ms debounce
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: LocationSuggestion, isPickUp: boolean) => {
    if (isPickUp) {
      setPickUp(suggestion.formatted);
      setPickUpCoords(L.latLng(suggestion.geometry.lat, suggestion.geometry.lng));
      setShowPickUpSuggestions(false);
      
      console.log("Selected pickup location:", suggestion.formatted, suggestion.geometry);
    } else {
      setDropOff(suggestion.formatted);
      setDropOffCoords(L.latLng(suggestion.geometry.lat, suggestion.geometry.lng));
      setShowDropOffSuggestions(false);
      
      console.log("Selected dropoff location:", suggestion.formatted, suggestion.geometry);
    }
  };

  // Recalculate distance whenever pickup or dropoff coordinates change
  useEffect(() => {
    if (pickUpCoords && dropOffCoords) {
      calculateDistance();
    }
  }, [pickUpCoords, dropOffCoords]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (pickUpTimerRef.current) clearTimeout(pickUpTimerRef.current);
      if (dropOffTimerRef.current) clearTimeout(dropOffTimerRef.current);
    };
  }, []);

  const handleSubmit = () => {
    if (!pickUp || !dropOff) {
      alert("Please select both pickup and drop-off locations.");
      return;
    }
    
    if (!preferredPickUpTime) {
      alert("Please select a preferred pickup time.");
      return;
    }
    
    onSetPickUp(pickUp);
    onSetDropOff(dropOff);
    onSetPreferredPickupTime(preferredPickUpTime);
    
    // Ensure distance is set
    if (pickUpCoords && dropOffCoords) {
      calculateDistance();
    }
    
    // Call the onContinue prop to notify the parent component
    onContinue();
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6">Pick-Up and Drop-Off Details</h3>
        
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-white/80 mb-1">Pick-Up Location</label>
            <input
              type="text"
              value={pickUp}
              onChange={(e) => handlePickUpChange(e.target.value)}
              placeholder="Enter the pick-up location"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            {isLoading.pickup && (
              <div className="absolute right-3 top-9">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              </div>
            )}
            
            {showPickUpSuggestions && pickUpSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                {pickUpSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion, true)}
                  >
                    {suggestion.formatted}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-white/80 mb-1">Drop-Off Location</label>
            <input
              type="text"
              value={dropOff}
              onChange={(e) => handleDropOffChange(e.target.value)}
              placeholder="Enter the drop-off location"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            {isLoading.dropoff && (
              <div className="absolute right-3 top-9">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              </div>
            )}
            
            {showDropOffSuggestions && dropOffSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                {dropOffSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion, false)}
                  >
                    {suggestion.formatted}
                  </div>
                ))}
              </div>
            )}
          </div>

          {calculatedDistance !== null && pickUpCoords && dropOffCoords && (
            <div className="bg-white/30 rounded-lg p-3 text-white">
              <p><strong>Estimated Distance:</strong> {calculatedDistance} km</p>
              <p><strong>Trip Classification:</strong> {selectedDistance}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Preferred Pick-Up Time</label>
            <input
              type="datetime-local"
              value={preferredPickUpTime}
              onChange={(e) => setPreferredPickUpTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="pt-4">
            <PurpleButton label="Continue" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUpDropOffCard;