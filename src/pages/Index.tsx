
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Eye, Map, Bell, Users, BarChart, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-darkgray text-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-deepblue to-deepblue-dark">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <ShieldAlert size={40} className="text-skyblue mr-3" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  SkyGuard<span className="text-skyblue">Sentinel</span>
                </h1>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Real-Time Event Security & Crowd Management
              </h2>
              <p className="text-lg mb-8 text-gray-300 max-w-lg">
                Advanced AI-powered surveillance for large public events. Monitor crowd density, detect threats, and alert security personnel in real-time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-skyblue hover:bg-skyblue-dark text-white font-bold px-6 py-3"
                  size="lg"
                >
                  Access Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/demo")}
                  className="border-skyblue text-skyblue hover:bg-skyblue/10"
                  size="lg"
                >
                  View Demo
                </Button>
              </div>
            </div>
            <div className="md:w-5/12">
              <div className="bg-darkgray-light p-2 rounded-lg border border-gray-700">
                <div className="aspect-video relative bg-darkgray rounded-md overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-gradient-to-br from-deepblue/50 to-skyblue/50 rounded-lg filter blur-xl absolute"></div>
                    <div className="relative z-10 text-center">
                      <ShieldAlert size={60} className="text-white mx-auto mb-4" />
                      <p className="text-xl font-bold">Threat Detection Demo</p>
                      <p className="text-sm text-gray-300 mt-2">Log in to access full features</p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-alertred text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
                    LIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-darkgray-light border border-gray-700 rounded-lg p-6">
              <div className="bg-deepblue rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Map className="text-skyblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Crowd Heatmap</h3>
              <p className="text-gray-300">
                Real-time visualization of crowd density using color-coded maps, helping identify congestion and potential risks.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-darkgray-light border border-gray-700 rounded-lg p-6">
              <div className="bg-deepblue rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Eye className="text-skyblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Threat Detection</h3>
              <p className="text-gray-300">
                Advanced AI models detect weapons, dangerous objects, and suspicious behavior from camera feeds and images.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-darkgray-light border border-gray-700 rounded-lg p-6">
              <div className="bg-deepblue rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bell className="text-skyblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Alerts</h3>
              <p className="text-gray-300">
                Automated notifications sent to security personnel with threat details, location, and visual evidence.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-darkgray-light border border-gray-700 rounded-lg p-6">
              <div className="bg-deepblue rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-skyblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Security Dashboard</h3>
              <p className="text-gray-300">
                Intuitive interface for security staff to receive, respond to, and manage alerts in real-time.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-darkgray-light border border-gray-700 rounded-lg p-6">
              <div className="bg-deepblue rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-skyblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Team Coordination</h3>
              <p className="text-gray-300">
                Streamlined communication between event organizers and security personnel for rapid response.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-darkgray-light border border-gray-700 rounded-lg p-6">
              <div className="bg-deepblue rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="text-skyblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Analytics & Reporting</h3>
              <p className="text-gray-300">
                Comprehensive data analysis and reporting tools to improve security planning for future events.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-deepblue to-deepblue-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance event security?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join event organizers worldwide who trust SkyGuard Sentinel for crowd management and threat detection.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-skyblue hover:bg-skyblue-dark text-white font-bold px-8 py-3"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-darkgray-light py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldAlert className="text-skyblue mr-2" />
              <span className="text-lg font-bold">SkyGuard Sentinel</span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; 2025 SkyGuard Technologies. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
