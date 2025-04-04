
import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { ShieldAlert } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-darkgray flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <ShieldAlert size={32} className="text-skyblue mr-2" />
          <h1 className="text-3xl font-bold">SkyGuard<span className="text-skyblue">Sentinel</span></h1>
        </div>
        <p className="text-gray-400">Secure authentication for event security management</p>
      </div>
      
      <AuthForm />
      
      <div className="mt-8 text-center">
        <Link to="/" className="text-skyblue hover:underline text-sm">
          Return to Home Page
        </Link>
        <p className="text-xs text-gray-500 mt-4">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
