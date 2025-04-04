
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronUp, ChevronDown, Maximize2, Minimize2 } from "lucide-react";

// Mock heatmap data points (in a real app, this would come from backend)
const generateMockHeatmapData = () => {
  const venues = [
    { id: "A1", name: "Main Stage", density: Math.random() * 100 },
    { id: "A2", name: "Food Court", density: Math.random() * 100 },
    { id: "A3", name: "VIP Area", density: Math.random() * 100 },
    { id: "B1", name: "Second Stage", density: Math.random() * 100 },
    { id: "B2", name: "Merchandise", density: Math.random() * 100 },
    { id: "B3", name: "Restrooms", density: Math.random() * 100 },
    { id: "C1", name: "Entry Gates", density: Math.random() * 100 },
    { id: "C2", name: "Parking Area", density: Math.random() * 100 },
    { id: "C3", name: "Medical Tent", density: Math.random() * 100 }
  ];
  
  return venues.map(venue => ({
    ...venue,
    color: venue.density > 75 
      ? "bg-alertred/80" 
      : venue.density > 50 
        ? "bg-warnyellow/80" 
        : "bg-safeteal/80"
  }));
};

// Simulate an alert at a random location
const generateRandomAlert = () => {
  const alertTypes = ["Suspicious activity", "Potential weapon", "Overcrowding", "Medical emergency", "Fight"];
  const locations = ["Main Stage", "Food Court", "VIP Area", "Second Stage"];
  
  return {
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    time: new Date().toLocaleTimeString(),
    resolved: false
  };
};

interface CrowdHeatmapProps {
  securityView?: boolean;
}

const CrowdHeatmap: React.FC<CrowdHeatmapProps> = ({ securityView = false }) => {
  const [heatmapData, setHeatmapData] = useState(generateMockHeatmapData());
  const [expanded, setExpanded] = useState(false);
  const [alerts, setAlerts] = useState<Array<any>>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  // Simulate real-time updates to the heatmap
  useEffect(() => {
    const timer = setInterval(() => {
      setHeatmapData(generateMockHeatmapData());
      
      // Randomly add alerts (10% chance)
      if (Math.random() < 0.1) {
        setAlerts(prev => [...prev, generateRandomAlert()]);
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Generate a grid of colored cells representing the venue
  const renderHeatmap = () => {
    return (
      <div className="grid grid-cols-3 gap-2 w-full aspect-square">
        {heatmapData.map((area) => (
          <div 
            key={area.id}
            className={`${area.color} rounded-md p-2 flex flex-col justify-between cursor-pointer transition-all hover:opacity-90 ${selectedArea === area.id ? 'ring-2 ring-white' : ''}`}
            onClick={() => setSelectedArea(area.id === selectedArea ? null : area.id)}
          >
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="bg-black/50">{area.id}</Badge>
              {area.density > 75 && <AlertCircle size={20} className="text-white animate-pulse" />}
            </div>
            <div className="text-xs text-white font-medium mt-2">{area.name}</div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderAreaDetails = () => {
    if (!selectedArea) return null;
    const area = heatmapData.find(a => a.id === selectedArea);
    if (!area) return null;
    
    return (
      <Card className="bg-darkgray-light border-gray-700 p-4 mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{area.name} (Section {area.id})</h3>
            <div className="text-sm text-muted-foreground mb-2">Current density: {Math.round(area.density)}%</div>
            
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
                  area.density > 75 ? "text-alertred" : 
                  area.density > 50 ? "text-warnyellow" : 
                  "text-safeteal"
                }`}>
                  {area.density > 75 ? "High" : area.density > 50 ? "Moderate" : "Low"}
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
        
        {area.density > 75 && (
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
  
  return (
    <div className={`relative ${expanded ? 'fixed inset-0 z-50 bg-black/90 p-4 flex flex-col' : ''}`}>
      {expanded && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Venue Heatmap - Full View</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(false)}
          >
            <Minimize2 />
          </Button>
        </div>
      )}
      
      <div className={`map-container ${expanded ? 'flex-grow overflow-hidden' : ''}`}>
        {/* Map overlay with simulated heatmap */}
        <div className="absolute inset-0 bg-darkgray flex items-center justify-center">
          <div className={`${expanded ? 'w-full max-w-3xl' : 'w-full max-w-md'}`}>
            {renderHeatmap()}
          </div>
          
          {/* Toggle expand button */}
          {!expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2" 
              onClick={() => setExpanded(true)}
            >
              <Maximize2 />
            </Button>
          )}
        </div>
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
