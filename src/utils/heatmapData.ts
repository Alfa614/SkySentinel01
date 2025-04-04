
// Mock venue coordinates (for a generic event venue)
// In a real app, these would be actual GPS coordinates
export const venueCenter = { lat: 34.0522, lng: -118.2437 }; // Example: Los Angeles coordinates

export const generateMockHeatmapPoints = (count: number = 200) => {
  const points = [];
  
  // Create random distribution of points around the venue center
  for (let i = 0; i < count; i++) {
    // Random offset from center (within ~0.003 degrees, roughly 300m)
    const lat = venueCenter.lat + (Math.random() - 0.5) * 0.006;
    const lng = venueCenter.lng + (Math.random() - 0.5) * 0.006;
    
    // Create weight based on areas (simulate hotspots)
    let weight = Math.random();
    
    // Create artificial hotspots
    const distanceFromCenter = Math.sqrt(
      Math.pow(lat - venueCenter.lat, 2) + 
      Math.pow(lng - venueCenter.lng, 2)
    );
    
    // Points closer to center are more likely to be crowded
    if (distanceFromCenter < 0.001) {
      weight = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
    }
    
    // Create a few random hotspots
    const isHotspot = Math.random() < 0.15; // 15% chance
    if (isHotspot) {
      weight = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
    }
    
    points.push({ location: new google.maps.LatLng(lat, lng), weight });
  }
  
  return points;
};

export const getRandomVenueArea = () => {
  const areas = [
    { name: "Main Stage", lat: venueCenter.lat + 0.001, lng: venueCenter.lng },
    { name: "Food Court", lat: venueCenter.lat - 0.001, lng: venueCenter.lng + 0.001 },
    { name: "VIP Area", lat: venueCenter.lat, lng: venueCenter.lng + 0.0015 },
    { name: "Second Stage", lat: venueCenter.lat - 0.0015, lng: venueCenter.lng - 0.001 },
    { name: "Merchandise", lat: venueCenter.lat + 0.001, lng: venueCenter.lng - 0.001 },
    { name: "Entry Gates", lat: venueCenter.lat + 0.002, lng: venueCenter.lng + 0.002 },
    { name: "Parking Area", lat: venueCenter.lat - 0.002, lng: venueCenter.lng - 0.002 },
    { name: "Medical Tent", lat: venueCenter.lat, lng: venueCenter.lng - 0.0015 }
  ];
  
  return areas[Math.floor(Math.random() * areas.length)];
};

// Simulate an alert at a random location
export const generateRandomAlert = () => {
  const alertTypes = ["Suspicious activity", "Potential weapon", "Overcrowding", "Medical emergency", "Fight"];
  const area = getRandomVenueArea();
  
  return {
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    location: area.name,
    coordinates: { lat: area.lat, lng: area.lng },
    time: new Date().toLocaleTimeString(),
    resolved: false
  };
};

export const getDensityLevel = (point: google.maps.visualization.WeightedLocation) => {
  if (!point.weight) return "low";
  if (point.weight > 0.7) return "high";
  if (point.weight > 0.4) return "moderate";
  return "low";
};
