"use client";

import { useState } from "react";
import { MapPin, Clock, Search, X } from "lucide-react";
import { getDeliveryTime } from "@/lib/utils";

interface Location {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Function to get area name from coordinates using browser's geocoding API
async function getAreaName(lat: number, lng: number): Promise<string> {
  try {
    // Get user's preferred language from browser
    const userLanguage = navigator.language || 'en';
    
    // Use the browser's built-in geocoding API with language preference
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept-Language': userLanguage,
          // Required by Nominatim's usage policy
          'User-Agent': 'BlinkitClone/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    const data = await response.json();
    
    // Try to get the most relevant address component
    if (data.address) {
      // Prefer city/town name
      if (data.address.city) {
        return data.address.city;
      }
      // Then try town
      if (data.address.town) {
        return data.address.town;
      }
      // Then try suburb
      if (data.address.suburb) {
        return data.address.suburb;
      }
      // Then try village
      if (data.address.village) {
        return data.address.village;
      }
      // Then try state
      if (data.address.state) {
        return data.address.state;
      }
      // Finally, use the display name
      return data.display_name.split(',')[0];
    }
    
    // Fallback to coordinates if no address found
    return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  } catch (error) {
    console.error("Error getting area name:", error);
    // Fallback to coordinates if geocoding fails
    return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  }
}

export function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock recent locations - in a real app, this would come from a database
  const [recentLocations, setRecentLocations] = useState<string[]>([
    "123 Main Street, City Center",
    "456 Park Avenue, Downtown",
    "789 Residential Area, Suburb",
  ]);

  // Mock search results - in a real app, this would come from a geocoding API
  const searchResults = searchQuery
    ? [
        `${searchQuery}, City Center`,
        `${searchQuery}, Downtown`,
        `${searchQuery}, Suburb`,
      ]
    : [];

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      // Get current position with high accuracy
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000, // 10 seconds timeout
            maximumAge: 0
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Get area name from coordinates
      const areaName = await getAreaName(latitude, longitude);

      // Update location state
      setLocation({
        address: areaName,
        coordinates: {
          lat: latitude,
          lng: longitude,
        },
      });

      // Update recent locations
      setRecentLocations(prev => {
        const newLocations = [areaName, ...prev.filter(loc => loc !== areaName)];
        return newLocations.slice(0, 3); // Keep only 3 most recent locations
      });

      setIsOpen(false);
    } catch (err) {
      console.error("Location detection error:", err);
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Please allow location access to detect your location");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable");
            break;
          case err.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("Failed to detect location");
        }
      } else {
        setError(err instanceof Error ? err.message : "Failed to detect location");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (address: string) => {
    setLocation({ address });
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 hover:border-green-500 hover:shadow-md transition-all"
      >
        <MapPin className="h-5 w-5 text-green-600" />
        <div className="text-left">
          <div className="flex items-center space-x-1">
            <p className="text-xs text-gray-500">Deliver to</p>
            <span className="text-xs text-gray-500">▼</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900 max-w-[200px] truncate">
              {location?.address || "Select Location"}
            </span>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <Clock className="h-3 w-3" />
              <span>by {getDeliveryTime()}</span>
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-96 rounded-lg border bg-white p-4 shadow-lg">
          <div className="mb-4">
            <button
              onClick={detectLocation}
              disabled={isLoading}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-100 disabled:opacity-50"
            >
              <MapPin className="h-4 w-4" />
              <span>{isLoading ? "Detecting..." : "Detect my location"}</span>
            </button>
            {error && (
              <p className="mt-2 text-xs text-red-600">{error}</p>
            )}
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your delivery location"
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {searchQuery ? (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500">Search Results</p>
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectLocation(result)}
                  className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{result}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500">Recent Locations</p>
              {recentLocations.map((address, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectLocation(address)}
                  className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{address}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 