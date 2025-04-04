
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronUp, ChevronDown, Maximize2, Minimize2 } from "lucide-react";
import { GoogleMap, useJsApiLoader, HeatmapLayer } from "@react-google-maps/api";
import { venueCenter, generateMockHeatmapPoints, generateRandomAlert, getDensityLevel, getRandomVenueArea } from "@/utils/heatmapData";

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const libraries = ["visualization"] as ["visualization"]; // Required for HeatmapLayer

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeId: 'satellite',
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { lightness: 13 }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#0e1626" }]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#1a1f2c" }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#2a2e39" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#404758" }]
    }
  ]
};

interface CrowdHeatmapProps {
  securityView?: boolean;
}

const CrowdHeatmap: React.FC<CrowdHeatmapProps> = ({ securityView = false }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDmBzWIHq9c40jCUHDBqzl-P-nFi3_zV20", // Using a development key with restrictions
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [alerts, setAlerts] = useState<Array<any>>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<any | null>(null);
  const [areaInfoWindows, setAreaInfoWindows] = useState<any[]>([]);
  const markersRef = useRef<google.maps.Marker[]>([]);
  
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Add area markers
    const areas = Array(8).fill(0).map(() => getRandomVenueArea());
    const uniqueAreas = areas.filter((area, index, self) => 
      self.findIndex(a => a.name === area.name) === index
    );
    
    const newMarkers: google.maps.Marker[] = [];
    
    uniqueAreas.forEach(area => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(area.lat, area.lng),
        map: map,
        title: area.name,
        label: { 
          text: area.name.substring(0, 1),
          color: '#ffffff',
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#33C3F0',
          fillOpacity: 0.8,
          strokeWeight: 1,
          strokeColor: '#ffffff',
        }
      });
      
      marker.addListener('click', () => {
        setSelectedArea(area.name);
        
        // Calculate simulated crowd density for this area
        const density = Math.floor(Math.random() * 100);
        const color = density > 75 ? "#ea384c" : density > 50 ? "#f6ad55" : "#4fd1c5";
        
        const contentString = `
          <div style="padding: 8px; color: #333; background: rgba(255, 255, 255, 0.95); border-radius: 4px; min-width: 150px;">
            <h3 style="margin: 0 0 8px; font-weight: bold;">${area.name}</h3>
            <div style="font-size: 12px; margin-bottom: 6px;">Current density: <span style="color: ${color}">${density}%</span></div>
            <div style="font-size: 12px;">Personnel: ${Math.floor(Math.random() * 5) + 1} Active</div>
          </div>
        `;
        
        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          position: new google.maps.LatLng(area.lat, area.lng),
        });
        
        // Close all open infoWindows
        areaInfoWindows.forEach(window => window.close());
        setAreaInfoWindows([infoWindow]);
        
        infoWindow.open(map);
      });
      
      newMarkers.push(marker);
    });
    
    markersRef.current = newMarkers;
    
    // Generate initial heatmap data
    setHeatmapData(generateMockHeatmapPoints());
  }, [areaInfoWindows]);
  
  const onUnmount = useCallback(() => {
    setMap(null);
    // Clean up markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  }, []);
  
  // Simulate real-time updates to the heatmap
  useEffect(() => {
    const timer = setInterval(() => {
      setHeatmapData(generateMockHeatmapPoints());
      
      // Randomly add alerts (10% chance)
      if (Math.random() < 0.1) {
        setAlerts(prev => [...prev, generateRandomAlert()]);
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Clean up infoWindows when component unmounts
  useEffect(() => {
    return () => {
      areaInfoWindows.forEach(window => window.close());
    };
  }, [areaInfoWindows]);
  
  const renderAreaDetails = () => {
    if (!selectedArea) return null;
    const density = Math.floor(Math.random() * 100); // Simulated data
    
    return (
      <Card className="bg-darkgray-light border-gray-700 p-4 mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{selectedArea}</h3>
            <div className="text-sm text-muted-foreground mb-2">Current density: {density}%</div>
            
            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div className="p-2 bg-darkgray rounded-md">
                <div className="text-muted-foreground">Personnel</div>
                <div className="font-medium">{Math.floor(Math.random() * 5) + 1} Active</div>
              </div>
              <div className="p-2 bg-darkgray rounded-md">
                <div className="text-muted-foreground">Capacity</div>
                <div className="font-medium">{Math.floor(Math.random() * 2000) + 500}</div>
              </div>
              <div className="p-2 bg-darkgray rounded-md">
                <div className="text-muted-foreground">Temperature</div>
                <div className="font-medium">{Math.floor(Math.random() * 10) + 20}°C</div>
              </div>
              <div className="p-2 bg-darkgray rounded-md">
                <div className="text-muted-foreground">Risk Level</div>
                <div className={`font-medium ${
                  density > 75 ? "text-alertred" : 
                  density > 50 ? "text-warnyellow" : 
                  "text-safeteal"
                }`}>
                  {density > 75 ? "High" : density > 50 ? "Moderate" : "Low"}
                </div>
              </div>
            </div>
          </div>
          
          {securityView && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-skyblue text-skyblue"
            >
              Navigate Here
            </Button>
          )}
        </div>
        
        {density > 75 && (
          <div className="mt-4 alert-card">
            <div className="flex items-start">
              <AlertCircle className="mr-2 text-alertred" />
              <div>
                <p className="font-medium">High Density Warning</p>
                <p className="text-xs">This area is approaching capacity limits. Consider redirecting crowd flow.</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    );
  };
  
  const closeSelectedArea = () => {
    setSelectedArea(null);
    areaInfoWindows.forEach(window => window.close());
    setAreaInfoWindows([]);
  };
  
  return (
    <div className={`relative ${expanded ? 'fixed inset-0 z-50 bg-black/90 p-4 flex flex-col' : ''}`}>
      {expanded && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Venue Heatmap - Full View</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setExpanded(false);
              closeSelectedArea();
            }}
          >
            <Minimize2 />
          </Button>
        </div>
      )}
      
      <div className={`map-container relative ${expanded ? 'flex-grow' : 'aspect-video w-full'}`}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={venueCenter}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            {heatmapData.length > 0 && (
              <HeatmapLayer
                data={heatmapData}
                options={{
                  radius: 20,
                  opacity: 0.7,
                  gradient: [
                    'rgba(79, 209, 197, 0)',
                    'rgba(79, 209, 197, 1)',
                    'rgba(246, 173, 85, 1)',
                    'rgba(234, 56, 76, 1)'
                  ]
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-full bg-darkgray flex items-center justify-center">
            Loading Maps...
          </div>
        )}
        
        {/* Toggle expand button */}
        {!expanded && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 bg-black/50" 
            onClick={() => setExpanded(true)}
          >
            <Maximize2 />
          </Button>
        )}
      </div>
      
      {/* Alert indicators */}
      {alerts.length > 0 && !expanded && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-alertred flex items-center">
              <AlertCircle size={16} className="mr-1" /> 
              Active Alerts ({alerts.length})
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={() => setAlerts([])}
            >
              Clear
            </Button>
          </div>
          {alerts.slice(0, 2).map((alert, index) => (
            <div key={index} className="alert-card text-sm">
              <p className="font-medium">{alert.type}</p>
              <p className="text-xs">Location: {alert.location} • {alert.time}</p>
            </div>
          ))}
          {alerts.length > 2 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
            >
              View {alerts.length - 2} more alerts
            </Button>
          )}
        </div>
      )}
      
      {/* Selected area details */}
      {expanded ? (
        <div className="mt-4 w-full max-w-3xl mx-auto">
          {renderAreaDetails()}
        </div>
      ) : (
        renderAreaDetails()
      )}
    </div>
  );
};

export default CrowdHeatmap;
