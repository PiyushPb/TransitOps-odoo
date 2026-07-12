"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bus } from "lucide-react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    try {
      await new Promise((resolve, reject) => setTimeout(() => {
        // Mock error for demonstration of proper error codes
        if (data.email === "error@example.com") {
          reject(new Error("AUTH_INVALID_CREDENTIALS"));
        } else {
          resolve(true);
        }
      }, 1500));
      toast.success("Successfully logged in!");
    } catch (error: any) {
      if (error.message === "AUTH_INVALID_CREDENTIALS") {
        toast.error("Invalid email or password.");
      } else {
        toast.error("An unexpected error occurred (Code: 500).");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center lg:hidden">
            <Bus className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold font-serif tracking-tight lg:hidden">
            TransitOps
          </span>
        </div>
      
      <div className="space-y-1.5 mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-black font-serif">Welcome back</h2>
        <p className="text-zinc-500 text-sm font-normal">
          Enter your credentials to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-black font-semibold text-sm">
            Email address <span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            className={`bg-white text-black placeholder:text-zinc-400 h-11 rounded-md focus-visible:ring-0 transition-colors ${
              errors.email ? "border-red-500 focus-visible:border-red-500" : "border-zinc-300 focus-visible:border-black"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-black font-semibold text-sm">
              Password <span className="text-red-500 ml-0.5">*</span>
            </Label>
            <Link href="#" className="text-sm font-medium text-zinc-500 hover:text-black transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`bg-white text-black placeholder:text-zinc-400 h-11 rounded-md focus-visible:ring-0 transition-colors pr-10 ${
                errors.password ? "border-red-500 focus-visible:border-red-500" : "border-zinc-300 focus-visible:border-black"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <Button 
          className="w-full h-11 rounded-md text-sm font-medium mt-6 bg-black hover:bg-zinc-800 text-white transition-colors border-0 disabled:opacity-50" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-left">
        <p className="text-zinc-500 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-black hover:underline underline-offset-4 transition-all">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
