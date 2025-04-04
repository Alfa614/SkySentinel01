
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Bell, CheckCircle, Map, Radio } from "lucide-react";
import CrowdHeatmap from "@/components/maps/CrowdHeatmap";
import AlertsList from "@/components/alerts/AlertsList";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const SecurityDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("alerts");
  const [dutyStatus, setDutyStatus] = useState("available");
  const [newAlerts, setNewAlerts] = useState<string[]>([]);

  // Simulate receiving a new alert
  useEffect(() => {
    const timer = setTimeout(() => {
      const alertTypes = ["Suspicious activity detected", "High crowd density warning", "Potential threat identified"];
      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      setNewAlerts(prev => [...prev, randomAlert]);
      
      toast({
        title: "⚠️ New Alert",
        description: randomAlert,
        variant: "destructive",
      });
    }, 45000); // 45 seconds
    
    return () => clearTimeout(timer);
  }, [toast, newAlerts]);

  const handleStatusChange = (status: string) => {
    setDutyStatus(status);
    toast({
      title: "Status Updated",
      description: `Your duty status is now set to ${status}`,
    });
  };

  const handleEmergencyRequest = () => {
    toast({
      title: "Emergency Backup Requested",
      description: "Your request for assistance has been sent to all available personnel",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-skyblue">Security Dashboard</h1>
          <p className="text-muted-foreground">Duty Status: 
            <span className={`ml-2 font-medium ${
              dutyStatus === "available" ? "text-safeteal" :
              dutyStatus === "busy" ? "text-warnyellow" :
              "text-gray-400"
            }`}>
              {dutyStatus === "available" ? "Available" : 
               dutyStatus === "busy" ? "On Assignment" : "Off Duty"}
            </span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex space-x-2">
            <Button 
              variant={dutyStatus === "available" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("available")}
              className={dutyStatus === "available" ? "bg-safeteal hover:bg-safeteal-dark" : ""}
            >
              <CheckCircle className="mr-1" size={14} /> Available
            </Button>
            <Button 
              variant={dutyStatus === "busy" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("busy")}
              className={dutyStatus === "busy" ? "bg-warnyellow hover:bg-warnyellow-dark text-black" : ""}
            >
              <Radio className="mr-1" size={14} /> On Assignment
            </Button>
            <Button 
              variant={dutyStatus === "off" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("off")}
              className={dutyStatus === "off" ? "bg-gray-600 hover:bg-gray-700" : ""}
            >
              Off Duty
            </Button>
          </div>
          
          <Button 
            onClick={handleEmergencyRequest}
            className="bg-alertred hover:bg-alertred-dark text-white font-bold"
          >
            <AlertCircle className="mr-2" size={16} />
            Request Backup
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-darkgray-light border-gray-700 mb-6">
          <TabsTrigger 
            value="alerts" 
            className="data-[state=active]:bg-deepblue data-[state=active]:text-white"
          >
            <Bell className="mr-2" size={16} />
            Alerts
            {newAlerts.length > 0 && (
              <Badge className="ml-2 bg-alertred">{newAlerts.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="map" 
            className="data-[state=active]:bg-deepblue data-[state=active]:text-white"
          >
            <Map className="mr-2" size={16} />
            Venue Map
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts" className="space-y-4">
          {newAlerts.length > 0 && (
            <Card className="bg-alertred/20 border-alertred animate-pulse-alert">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertCircle className="mr-2" />
                  New Alerts Requiring Attention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {newAlerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className="bg-darkgray-light p-4 rounded-md flex justify-between items-center animate-slide-in-right"
                  >
                    <div>
                      <p className="font-medium">{alert}</p>
                      <p className="text-xs text-muted-foreground">Just now • Section A4</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => {
                        setNewAlerts(prev => prev.filter((_, i) => i !== index));
                        toast({
                          title: "Alert Acknowledged",
                          description: "You've marked this alert as being handled",
                        });
                      }}
                    >
                      Acknowledge
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          
          <Card className="bg-darkgray-light border-gray-700">
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertsList userRole="security" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map" className="space-y-4">
          <Card className="bg-darkgray-light border-gray-700">
            <CardHeader>
              <CardTitle>Venue Map & Crowd Density</CardTitle>
            </CardHeader>
            <CardContent>
              <CrowdHeatmap securityView={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
