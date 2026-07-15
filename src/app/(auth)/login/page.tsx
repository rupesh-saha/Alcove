"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const [role, setRole] = useState<"guest" | "host">("guest");
  
  const sideImageUrl = "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // Call better-auth signIn
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/", 
    });

    setIsLoading(false);

    if (error) {
      console.error("Login failed:", error);
      alert(error.message || "Invalid email or password.");
      return;
    }

    if (data) {
      router.push("/");
    }
  };

  const onGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
    });
    
    setIsGoogleLoading(false);

    if (error) {
      console.error("Google login failed:", error);
      alert(error.message || "Could not authenticate with Google.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface">
      
      <div className="hidden md:flex flex-1 relative overflow-hidden items-end p-16 lg:p-24 bg-secondary">
        <Image 
          alt="Artisanal coffee and thoughtful design" 
          className="object-cover opacity-60 mix-blend-multiply" 
          fill 
          priority 
          src={sideImageUrl} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full max-w-lg"
        >
          <h2 className="text-3xl lg:text-4xl font-serif text-surface mb-4 leading-tight italic">
            "Travel is fatal to prejudice, bigotry, and narrow-mindedness."
          </h2>
          <p className="text-lg text-surface/80 font-medium">
            — Mark Twain
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 relative overflow-y-auto">
        <div className="w-full max-w-md mx-auto py-8">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex justify-center md:justify-start"
          >
            <Link className="flex items-center hover:opacity-80 transition-opacity" href="/">
              <Image
                alt="Alcove Logo"
                className="object-contain h-10 w-auto"
                height={40}
                priority
                src="/logo.png"
                width={150}
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl font-serif text-ink mb-3">Welcome back</h1>
            <p className="text-[#55433c] mb-8 text-lg">Sign in to continue your journey.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8"
          >
            <div className="flex bg-[#e8dac7]/40 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("guest")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  role === "guest" 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-[#89726b] hover:text-ink"
                }`}
              >
                Log in as Guest
              </button>
              <button
                type="button"
                onClick={() => setRole("host")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  role === "host" 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-[#89726b] hover:text-ink"
                }`}
              >
                Log in as Host
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
              
              <TextField 
                className="w-full flex flex-col gap-1.5" 
                isRequired 
                name="email" 
                type="email" 
              >
                <Label className="text-sm font-semibold text-ink">Email address</Label>
                <Input className="bg-white border border-[#dcc1b8]/40 rounded-xl px-4 py-3 text-ink placeholder-[#89726b] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" placeholder="jane@example.com"/>
              </TextField>

              <TextField 
                className="w-full flex flex-col gap-1.5" 
                isRequired 
                minLength={8} 
                name="password" 
                type="password" 
              >
                <div className="flex justify-between items-center w-full">
                  <Label className="text-sm font-semibold text-ink">Password</Label>
                  <Link className="text-xs font-semibold text-primary hover:text-[#a54f2f] transition-colors" href="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
                <Input className="bg-white border border-[#dcc1b8]/40 rounded-xl px-4 py-3 text-ink placeholder-[#89726b] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" placeholder="••••••••"/>
              </TextField>

              <Button 
                className="w-full mt-2 bg-primary hover:bg-[#a54f2f] text-white font-semibold py-4 rounded-xl shadow-md transition-all duration-300" 
                isLoading={isLoading}
                type="submit"
              >
                {isLoading ? "Signing In..." : `Sign In as ${role === "host" ? "Host" : "Guest"}`}
              </Button>
            </Form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="grow border-t border-[#dcc1b8]/40"></div>
              <span className="mx-4 text-xs font-bold text-[#89726b] uppercase tracking-wider">or continue with</span>
              <div className="grow border-t border-[#dcc1b8]/40"></div>
            </div>

            {/* Google Social Login */}
            <button 
              type="button"
              onClick={onGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex justify-center items-center gap-3 bg-white border border-[#dcc1b8]/40 hover:border-primary/40 hover:bg-surface text-ink font-semibold py-3.5 px-4 rounded-xl shadow-sm transition-all duration-300 disabled:opacity-70"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Footer Sign Up Link */}
            <p className="mt-8 text-center text-[#55433c] text-sm">
              Don't have an account?{' '}
              <Link className="text-primary font-semibold hover:underline decoration-2 underline-offset-4" href="/signup">
                Sign up
              </Link>
            </p>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}