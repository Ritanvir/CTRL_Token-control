"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const NavItem = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      className={[
        "px-3 py-2 rounded-xl text-sm font-semibold transition",
        active
          ? "text-white bg-white/10 border border-white/15 shadow"
          : "text-white/75 hover:text-white hover:bg-white/5",
      ].join(" ")}
    >
      {label}
    </Link>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const explorerBase =
    process.env.NEXT_PUBLIC_EXPLORER || "https://sepolia.explorer.zksync.io";

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            {/* Left brand */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-white font-extrabold tracking-wide">CTRL</span>
              <span className="text-xs font-bold px-2 py-1 rounded-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow">
                zkSync
              </span>
            </Link>

            {/* Middle nav */}
            <nav className="hidden sm:flex items-center gap-2">
              <NavItem href="/" label="Home" active={isActive("/")} />
              <NavItem href="/user" label="User" active={isActive("/user")} />
              <NavItem href="/admin" label="Admin" active={isActive("/admin")} />
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* IMPORTANT: only render wallet-dependent UI after mounted */}
              {mounted && isConnected && address ? (
                <a
                  href={`${explorerBase}/address/${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  title="Open wallet in explorer"
                >
                  {address.slice(0, 6)}…{address.slice(-4)}
                </a>
              ) : (
                // Keep SSR/CSR consistent space (optional)
                <span className="hidden md:inline-flex px-3 py-2 rounded-xl text-xs text-white/40 bg-white/5 border border-white/10">
                  Not connected
                </span>
              )}

              {mounted ? (
                <ConnectButton />
              ) : (
                <div className="h-[40px] w-[140px] rounded-xl bg-white/5 border border-white/10" />
              )}
            </div>
          </div>

          {/* Mobile nav */}
          <div className="sm:hidden px-4 pb-3 flex items-center gap-2">
            <NavItem href="/" label="Home" active={isActive("/")} />
            <NavItem href="/user" label="User" active={isActive("/user")} />
            <NavItem href="/admin" label="Admin" active={isActive("/admin")} />
          </div>
        </div>
      </div>
    </header>
  );
}
