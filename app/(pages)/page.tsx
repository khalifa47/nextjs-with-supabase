import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center mt-20">
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 justify-center items-center">
          <h2 className="font-light text-3xl">
            Keep track of your most important tasks
          </h2>
          <h1 className="font-extrabold text-7xl">Just-Do-It To-Do App</h1>
          <p className="font-thin text-xs">* Not for commercial purposes</p>
        </main>
        <Link href="/todos" className={buttonVariants()}>
          Get Started
        </Link>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
