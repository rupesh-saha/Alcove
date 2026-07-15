import React from "react";
import Navbar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar";
import SubNav from "@/components/SubNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <SubNav/>
      
      <main className="flex-1">
        {children}
      </main>
      
      <FooterBar/>
    </div>
  );
}