
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn, UserPlus, Shield } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AuthForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("security");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Form validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // For demonstration purposes, simulate authentication
    try {
      // In a real app, you would call Firebase Authentication here
      setTimeout(() => {
        // Store user info in localStorage for demo purposes
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        
        toast({
          title: isLogin ? "Logged in successfully" : "Account created successfully",
          description: `Welcome to SkySentinel, you're logged in as ${userRole}`,
        });
        
        // Redirect based on role
        navigate(userRole === "admin" ? "/admin-dashboard" : "/security-dashboard");
        
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-[350px] md:w-[450px] bg-darkgray-light border-gray-700">
      <Tabs defaultValue={isLogin ? "login" : "register"} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger 
            value="login" 
            onClick={() => setIsLogin(true)}
            className="data-[state=active]:bg-deepblue data-[state=active]:text-white"
          >
            Log In
          </TabsTrigger>
          <TabsTrigger 
            value="register" 
            onClick={() => setIsLogin(false)}
            className="data-[state=active]:bg-deepblue data-[state=active]:text-white"
          >
            Register
          </TabsTrigger>
        </TabsList>
        
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-skyblue">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Log in to access SkySentinel's security features" 
              : "Register to set up your SkySentinel account"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <button 
                  type="button" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <RadioGroup value={userRole} onValueChange={setUserRole} className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="security" id="security" />
                      <Label htmlFor="security" className="flex items-center space-x-1">
                        <Shield size={16} />
                        <span>Security</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">Admin/Organizer</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-skyblue hover:bg-skyblue-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                  <span>{isLogin ? "Log In" : "Create Account"}</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-gray-400 text-center">
            {isLogin ? (
              <p>Don't have an account? <span className="text-skyblue cursor-pointer hover:underline" onClick={() => setIsLogin(false)}>Register</span></p>
            ) : (
              <p>Already have an account? <span className="text-skyblue cursor-pointer hover:underline" onClick={() => setIsLogin(true)}>Log In</span></p>
            )}
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
