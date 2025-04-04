
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboardComponent from "@/components/dashboard/AdminDashboard";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if the user is authenticated and has the correct role
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (userRole !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate(userRole === "security" ? "/security-dashboard" : "/login");
      return;
    }
  }, [navigate, toast]);
  
  return <AdminDashboardComponent />;
};

export default AdminDashboard;
