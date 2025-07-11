import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mt-20">
        Welcome to the User Management System
      </h1>
      <Link
        href="/auth/login"
        className={buttonVariants({ variant: "default" })}
      >
        Login
      </Link>
      <Link
        href="/auth/signup"
        className={buttonVariants({ variant: "default" })}
      >
        Signup
      </Link>
    </div>
  );
}
