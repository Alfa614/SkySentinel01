
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Bell, Calendar, Map, PieChart, Users } from "lucide-react";
import CrowdHeatmap from "@/components/maps/CrowdHeatmap";
import AlertsList from "@/components/alerts/AlertsList";
import CreateAlertForm from "@/components/alerts/CreateAlertForm";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleEmergencyAlert = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "All security personnel have been notified of the emergency.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-skyblue">Admin Dashboard</h1>
        <Button 
          onClick={handleEmergencyAlert}
          className="bg-alertred hover:bg-alertred-dark text-white font-bold"
        >
          <AlertCircle className="mr-2" size={16} />
          Emergency Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-darkgray-light border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2" size={18} />
              Crowd Density
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-skyblue">14,253</div>
            <p className="text-sm text-muted-foreground">People in venue</p>
            <div className="mt-2 flex items-center text-warnyellow">
              <span className="text-xs">78% Capacity</span>
              <div className="w-full bg-gray-700 h-2 ml-2 rounded-full">
                <div className="bg-warnyellow h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-darkgray-light border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="mr-2" size={18} />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-alertred">3</div>
            <p className="text-sm text-muted-foreground">Unresolved issues</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="text-center p-1 bg-alertred/20 rounded">
                <span className="text-xs text-alertred">Critical</span>
                <p className="font-bold">1</p>
              </div>
              <div className="text-center p-1 bg-warnyellow/20 rounded">
                <span className="text-xs text-warnyellow">Warning</span>
                <p className="font-bold">2</p>
              </div>
              <div className="text-center p-1 bg-safeteal/20 rounded">
                <span className="text-xs text-safeteal">Resolved</span>
                <p className="font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-darkgray-light border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2" size={18} />
              Event Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">Music Festival</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">April 4, 2025</span>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">In Progress</span>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-xs">Day 1 of 3</span>
              <div className="w-full bg-gray-700 h-2 ml-2 rounded-full">
                <div className="bg-skyblue h-2 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-darkgray-light border-gray-700 mb-6">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-deepblue data-[state=active]:text-white"
          >
            <Map className="mr-2" size={16} />
            Live Map
          </TabsTrigger>
          <TabsTrigger 
            value="alerts" 
            className="data-[state=active]:bg-deepblue data-[state=active]:text-white"
          >
            <Bell className="mr-2" size={16} />
            Alerts
          </TabsTrigger>
          <TabsTrigger 
            value="statistics" 
            className="data-[state=active]:bg-deepblue data-[state=active]:text-white"
          >
            <PieChart className="mr-2" size={16} />
            Statistics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-darkgray-light border-gray-700">
            <CardHeader>
              <CardTitle>Real-time Crowd Heatmap</CardTitle>
              <CardDescription>Monitoring crowd density and movement patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <CrowdHeatmap />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <Card className="bg-darkgray-light border-gray-700 h-full">
              <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <CardDescription>Recent security events and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertsList />
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1">
            <Card className="bg-darkgray-light border-gray-700 h-full">
              <CardHeader>
                <CardTitle>Create Alert</CardTitle>
                <CardDescription>Manually create and send alerts to security personnel</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateAlertForm />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="statistics" className="space-y-4">
          <Card className="bg-darkgray-light border-gray-700">
            <CardHeader>
              <CardTitle>Event Statistics</CardTitle>
              <CardDescription>Analytics and metrics for current event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Advanced statistics will be available in the next version.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
