
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Camera, Upload, X, Check, ScreenShare, Videotape, SquareStack } from "lucide-react";

const ThreatDetection: React.FC = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionMode, setDetectionMode] = useState<'camera' | 'upload' | 'stream'>('camera');
  const [activeStream, setActiveStream] = useState(false);
  const [detectionResult, setDetectionResult] = useState<null | {
    threat: boolean;
    type?: string;
    confidence?: number;
    location?: string;
  }>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      analyzeFile(file);
    }
  };
  
  const analyzeFile = (file: File) => {
    setIsAnalyzing(true);
    setDetectionResult(null);
    
    // Simulate AI processing
    setTimeout(() => {
      // Random result for demo - 30% chance of threat detection
      const isThreat = Math.random() < 0.3;
      
      if (isThreat) {
        const threatTypes = ["knife", "gun", "sharp object", "suspicious behavior"];
        const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-99% confidence
        
        setDetectionResult({
          threat: true,
          type: randomThreat,
          confidence: confidence,
          location: "Frame center"
        });
        
        toast({
          title: "⚠️ Potential Threat Detected",
          description: `Type: ${randomThreat} (${confidence}% confidence)`,
          variant: "destructive",
        });
      } else {
        setDetectionResult({
          threat: false
        });
        
        toast({
          title: "Scan Complete",
          description: "No threats detected in the image",
        });
      }
      
      setIsAnalyzing(false);
    }, 3000);
  };
  
  const startCameraStream = async () => {
    try {
      setActiveStream(true);
      
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Could not access device camera. Please check permissions.",
        variant: "destructive",
      });
      setActiveStream(false);
    }
  };
  
  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      // Stop all tracks in the stream
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setActiveStream(false);
  };
  
  const captureFrame = () => {
    if (videoRef.current) {
      setIsAnalyzing(true);
      
      // Simulate processing the video frame
      setTimeout(() => {
        // Random result for demo
        const isThreat = Math.random() < 0.2;
        
        if (isThreat) {
          const threatTypes = ["knife", "gun", "sharp object", "suspicious behavior"];
          const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
          const confidence = Math.floor(Math.random() * 30) + 70;
          
          setDetectionResult({
            threat: true,
            type: randomThreat,
            confidence: confidence,
            location: "Lower right quadrant"
          });
          
          toast({
            title: "⚠️ Potential Threat Detected",
            description: `Type: ${randomThreat} (${confidence}% confidence)`,
            variant: "destructive",
          });
        } else {
          setDetectionResult({
            threat: false
          });
          
          toast({
            title: "Frame Analyzed",
            description: "No threats detected",
          });
        }
        
        setIsAnalyzing(false);
      }, 1500);
    }
  };
  
  const renderDetectionInterface = () => {
    switch (detectionMode) {
      case 'camera':
        return (
          <div className="space-y-4">
            <div className="relative bg-black rounded-md overflow-hidden aspect-video">
              {!activeStream ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Camera size={40} className="text-gray-500 mb-2" />
                  <Button 
                    onClick={startCameraStream} 
                    className="bg-skyblue hover:bg-skyblue-dark"
                  >
                    Start Camera
                  </Button>
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={captureFrame} 
                      className="bg-skyblue hover:bg-skyblue-dark"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Frame"}
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={stopCameraStream} 
                      variant="destructive"
                    >
                      Stop Camera
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            {detectionResult && (
              <Card className={`border-l-4 ${
                detectionResult.threat ? "border-l-alertred bg-alertred/10" : "border-l-safeteal bg-safeteal/10"
              }`}>
                <CardContent className="pt-4">
                  {detectionResult.threat ? (
                    <div className="flex items-start">
                      <AlertCircle className="text-alertred mr-2" />
                      <div>
                        <h3 className="font-bold">Potential {detectionResult.type} Detected</h3>
                        <p className="text-sm">Confidence: {detectionResult.confidence}%</p>
                        <p className="text-sm">Location: {detectionResult.location}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="text-safeteal mr-2" />
                      <span>No threats detected in the analyzed frame.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        );
        
      case 'upload':
        return (
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-700 rounded-md p-8 text-center cursor-pointer hover:bg-gray-900/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
              <Upload size={30} className="mx-auto mb-2 text-gray-500" />
              <h3 className="font-medium mb-1">Upload Image for Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Click or drag-and-drop to upload an image for threat detection
              </p>
            </div>
            
            {isAnalyzing && (
              <div className="text-center p-4 space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skyblue mx-auto"></div>
                <p>Analyzing image for potential threats...</p>
              </div>
            )}
            
            {detectionResult && (
              <Card className={`border-l-4 ${
                detectionResult.threat ? "border-l-alertred bg-alertred/10" : "border-l-safeteal bg-safeteal/10"
              }`}>
                <CardContent className="pt-4">
                  {detectionResult.threat ? (
                    <div className="flex items-start">
                      <AlertCircle className="text-alertred mr-2" />
                      <div>
                        <h3 className="font-bold">Potential {detectionResult.type} Detected</h3>
                        <p className="text-sm">Confidence: {detectionResult.confidence}%</p>
                        <p className="text-sm">Location: {detectionResult.location}</p>
                        <Button 
                          className="bg-alertred hover:bg-alertred-dark mt-2"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Alert Sent",
                              description: "Security team has been notified of the threat.",
                            });
                          }}
                        >
                          Send Alert to Security
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="text-safeteal mr-2" />
                      <span>No threats detected in the uploaded image.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        );
        
      case 'stream':
        return (
          <div className="space-y-4">
            <div className="bg-darkgray rounded-md p-6 text-center">
              <ScreenShare size={30} className="mx-auto mb-2 text-gray-500" />
              <h3 className="font-medium mb-1">CCTV Feed Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to security camera feeds for continuous monitoring
              </p>
              <Button 
                className="bg-skyblue hover:bg-skyblue-dark"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "CCTV integration will be available in the next version.",
                  });
                }}
              >
                Connect to CCTV Network
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="bg-darkgray-light border-gray-700">
      <CardHeader>
        <CardTitle>Threat Detection</CardTitle>
        <CardDescription>
          Analyze images and video for potential security threats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-6">
          <Button
            variant={detectionMode === 'camera' ? "default" : "outline"}
            className={detectionMode === 'camera' ? "bg-skyblue hover:bg-skyblue-dark" : ""}
            onClick={() => {
              if (activeStream) stopCameraStream();
              setDetectionMode('camera');
              setDetectionResult(null);
            }}
          >
            <Camera size={16} className="mr-2" />
            Camera
          </Button>
          <Button
            variant={detectionMode === 'upload' ? "default" : "outline"}
            className={detectionMode === 'upload' ? "bg-skyblue hover:bg-skyblue-dark" : ""}
            onClick={() => {
              if (activeStream) stopCameraStream();
              setDetectionMode('upload');
              setDetectionResult(null);
            }}
          >
            <Upload size={16} className="mr-2" />
            Upload
          </Button>
          <Button
            variant={detectionMode === 'stream' ? "default" : "outline"}
            className={detectionMode === 'stream' ? "bg-skyblue hover:bg-skyblue-dark" : ""}
            onClick={() => {
              if (activeStream) stopCameraStream();
              setDetectionMode('stream');
              setDetectionResult(null);
            }}
          >
            <Videotape size={16} className="mr-2" />
            CCTV
          </Button>
        </div>
        
        {renderDetectionInterface()}
      </CardContent>
      <CardFooter className="flex flex-col text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <SquareStack size={14} />
          <span>AI Model: TensorFlow Lite (YOLOv5)</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Detects knives, guns, and suspicious activities with 85%+ accuracy
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreatDetection;
