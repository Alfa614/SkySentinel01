
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertTriangle, AlertCircle, Clock, MapPin, Camera, MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock alert data
const mockAlerts = [
  {
    id: "alert-001",
    type: "Weapon Detection",
    description: "Potential knife detected on camera",
    location: "Main Stage East",
    timestamp: "2025-04-04T13:45:22",
    severity: "high",
    status: "active",
    imageUrl: null
  },
  {
    id: "alert-002",
    type: "Crowd Density",
    description: "Overcrowding detected at entrance",
    location: "North Gate",
    timestamp: "2025-04-04T13:15:10",
    severity: "medium",
    status: "active",
    imageUrl: null
  },
  {
    id: "alert-003",
    type: "Suspicious Activity",
    description: "Individual attempting to climb barrier",
    location: "VIP Section",
    timestamp: "2025-04-04T12:30:45",
    severity: "medium",
    status: "resolved",
    imageUrl: null
  },
  {
    id: "alert-004",
    type: "Medical Emergency",
    description: "Person collapsed in crowd",
    location: "Food Court",
    timestamp: "2025-04-04T12:05:33",
    severity: "high",
    status: "resolved",
    imageUrl: null
  },
  {
    id: "alert-005",
    type: "Restricted Access",
    description: "Unauthorized entry attempt",
    location: "Backstage Area",
    timestamp: "2025-04-04T11:45:12",
    severity: "low",
    status: "resolved",
    imageUrl: null
  }
];

interface AlertsListProps {
  userRole?: 'admin' | 'security';
}

const AlertsList: React.FC<AlertsListProps> = ({ userRole = 'admin' }) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [alerts, setAlerts] = useState(mockAlerts);
  
  const filteredAlerts = filter === "all" 
    ? alerts 
    : filter === "active" 
      ? alerts.filter(alert => alert.status === "active")
      : alerts.filter(alert => alert.status === "resolved");
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "resolved" } 
          : alert
      )
    );
    
    toast({
      title: "Alert Resolved",
      description: "The alert has been marked as resolved.",
    });
  };
  
  const handleRespondToAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "in_progress" } 
          : alert
      )
    );
    
    toast({
      title: "Response Initiated",
      description: "You have been assigned to this alert.",
    });
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-alertred text-white";
      case "medium": return "bg-warnyellow text-black";
      case "low": return "bg-safeteal text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <AlertCircle size={16} className="text-alertred" />;
      case "in_progress": return <Clock size={16} className="text-warnyellow" />;
      case "resolved": return <CheckCircle size={16} className="text-safeteal" />;
      default: return <AlertTriangle size={16} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select
          defaultValue="all"
          onValueChange={setFilter}
        >
          <SelectTrigger className="w-[180px] bg-darkgray border-gray-700">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Alerts</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        
        <span className="text-sm text-muted-foreground">
          Showing {filteredAlerts.length} alerts
        </span>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>No alerts found matching the current filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id}
              className={`bg-darkgray-light border-gray-700 p-4 ${
                alert.status === "active" ? "border-l-4 border-l-alertred" : ""
              }`}
            >
              <div className="flex justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity === "high" ? "Critical" : 
                       alert.severity === "medium" ? "Warning" : "Low Risk"}
                    </Badge>
                    <h3 className="font-medium">{alert.type}</h3>
                  </div>
                  
                  <p className="text-sm">{alert.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      <span>{formatTime(alert.timestamp)}</span>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(alert.status)}
                      <span className="ml-1">
                        {alert.status === "active" ? "Active" : 
                         alert.status === "in_progress" ? "In Progress" : "Resolved"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  {alert.imageUrl && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Camera size={16} />
                    </Button>
                  )}
                  
                  {userRole === 'admin' && alert.status === "active" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      <CheckCircle size={14} className="mr-1" />
                      Resolve
                    </Button>
                  )}
                  
                  {userRole === 'security' && alert.status === "active" && (
                    <Button 
                      variant="default" 
                      size="sm"
                      className="text-xs bg-skyblue hover:bg-skyblue-dark"
                      onClick={() => handleRespondToAlert(alert.id)}
                    >
                      Respond
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsList;
