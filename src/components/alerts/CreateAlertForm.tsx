
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { AlertOctagon, Send } from "lucide-react";

const CreateAlertForm: React.FC = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [alertType, setAlertType] = useState("security");
  const [severity, setSeverity] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!title || !description || !location) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate sending alert
    setTimeout(() => {
      toast({
        title: "Alert Created Successfully",
        description: "All security personnel have been notified.",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setAlertType("security");
      setSeverity("medium");
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Alert Title</Label>
        <Input 
          id="title"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief alert title"
          className="bg-darkgray border-gray-700"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Provide details about the situation..."
          className="bg-darkgray border-gray-700"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger id="location" className="bg-darkgray border-gray-700">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main_stage">Main Stage</SelectItem>
            <SelectItem value="north_gate">North Gate</SelectItem>
            <SelectItem value="food_court">Food Court</SelectItem>
            <SelectItem value="vip_section">VIP Section</SelectItem>
            <SelectItem value="backstage">Backstage Area</SelectItem>
            <SelectItem value="parking">Parking Lot</SelectItem>
            <SelectItem value="camp_grounds">Camping Grounds</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Alert Type</Label>
        <Select value={alertType} onValueChange={setAlertType}>
          <SelectTrigger className="bg-darkgray border-gray-700">
            <SelectValue placeholder="Select alert type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="security">Security Threat</SelectItem>
            <SelectItem value="medical">Medical Emergency</SelectItem>
            <SelectItem value="crowd">Crowd Management</SelectItem>
            <SelectItem value="facility">Facility Issue</SelectItem>
            <SelectItem value="weather">Weather Alert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Severity</Label>
        <RadioGroup 
          value={severity} 
          onValueChange={setSeverity}
          className="flex space-x-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label 
              htmlFor="low" 
              className="text-safeteal cursor-pointer flex items-center"
            >
              Low
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label 
              htmlFor="medium" 
              className="text-warnyellow cursor-pointer"
            >
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label 
              htmlFor="high" 
              className="text-alertred cursor-pointer flex items-center"
            >
              <AlertOctagon size={14} className="mr-1" /> High
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-skyblue hover:bg-skyblue-dark text-white" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Sending...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Send size={16} className="mr-2" />
            Send Alert to Security Team
          </div>
        )}
      </Button>
    </form>
  );
};

export default CreateAlertForm;
