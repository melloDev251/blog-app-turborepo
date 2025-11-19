import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NavbarContainer from "@/components/navbarContainer";
import Providers from "./providers";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "I-Blog",
  description: "Description for the blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>
          {children}
          <Toaster
            expand={false}
            richColors
            theme="light"
            position="top-center"
          />
        </Providers>
      </body>
    </html>
  );
}
