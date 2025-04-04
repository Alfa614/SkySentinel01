
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CrowdHeatmap from "@/components/maps/CrowdHeatmap";
import ThreatDetection from "@/components/detection/ThreatDetection";
import { ArrowLeft } from "lucide-react";

const Demo = () => {
  return (
    <div className="min-h-screen bg-darkgray">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-skyblue hover:underline mb-6">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">SkyGuard Sentinel Demo</h1>
        <p className="text-gray-400 mb-8">
          Experience the core features of our security monitoring platform
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-darkgray-light border-gray-700">
            <CardHeader>
              <CardTitle>Real-time Crowd Heatmap</CardTitle>
              <CardDescription>
                Visualize crowd density across different areas of the venue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CrowdHeatmap />
              <p className="text-sm text-muted-foreground mt-4">
                This is a simulated demo. In a production environment, this would display real-time data from sensors and cameras.
              </p>
            </CardContent>
          </Card>
          
          <ThreatDetection />
        </div>
        
        <div className="mt-10 text-center">
          <p className="mb-4 text-gray-300">Ready to see the full platform?</p>
          <Link to="/login">
            <Button className="bg-skyblue hover:bg-skyblue-dark text-white">
              Log In to Access Complete Features
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Demo;
