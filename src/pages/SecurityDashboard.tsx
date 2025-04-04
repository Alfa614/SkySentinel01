
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecurityDashboardComponent from "@/components/dashboard/SecurityDashboard";
import { useToast } from "@/components/ui/use-toast";

const SecurityDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the security dashboard.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);
  
  return <SecurityDashboardComponent />;
};

export default SecurityDashboard;
