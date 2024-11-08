"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance Ai" width={173.57} height={39} />
        <Link
          href="/"
          className={`text-sm transition-colors duration-300 ${pathname === "/" ? "font-bold text-primary" : "text-muted-foreground hover:text-white"}`}
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={`text-sm transition-all duration-300 ${pathname === "/transactions" ? "font-bold text-primary" : "text-muted-foreground hover:text-white"}`}
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={`text-sm transition-all duration-300 ${pathname === "/subscription" ? "font-bold text-primary" : "text-muted-foreground hover:text-white"}`}
        >
          Assinatura
        </Link>
      </div>
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
