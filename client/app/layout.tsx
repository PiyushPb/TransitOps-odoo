import type { Metadata } from "next";
import { Google_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const sans = Google_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Urbanist({
  variable: "--font-serif",
  subsets: ["latin"],
});

import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "TransitOps Smart",
  description: "Modern enterprise SaaS dashboard for Transport Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <AuthProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
