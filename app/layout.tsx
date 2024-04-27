import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Just-Do-It",
  description: "The one-stop to-do app for all your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Navbar isSupabaseConnected={isSupabaseConnected} />
          {children}
        </main>
      </body>
    </html>
  );
}
