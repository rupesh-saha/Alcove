import React from "react";
import Navbar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar"; // Import the footer

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      
      {/* flex-1 forces the children to expand, pushing the footer to the bottom even on empty pages */}
      <main className="flex-1">
        {children}
      </main>
      
      <FooterBar/>
    </div>
  );
}