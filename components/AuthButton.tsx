import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center justify-between">
      Hey, {user.email?.split("@")[0]}!
      <form action={signOut}>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className={`${buttonVariants({
        variant: "outline",
      })} border-primary text-primary hover:bg-primary hover:text-primary-foreground float-right`}
    >
      Login
    </Link>
  );
}
