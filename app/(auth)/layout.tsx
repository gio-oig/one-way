"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getAuthLayoutTitle } from "utils/functions";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const layoutTitle = getAuthLayoutTitle(pathname);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">{layoutTitle}</h1>
      </div>
      {children}
    </div>
  );
}
