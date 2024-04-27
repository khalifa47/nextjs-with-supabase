import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";

export default function PagesLayout({
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
    <>
      <Navbar isSupabaseConnected={isSupabaseConnected} />
      {children}
    </>
  );
}
