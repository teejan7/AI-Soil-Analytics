"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BarChart3, Camera, Home, Leaf, User, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../translations/LanguageProvider";

const navigation = [
  { href: "/home", key: "home" as const, icon: Home },
  { href: "/analyze", key: "analyze" as const, icon: Camera },
  { href: "/history", key: "history" as const, icon: BarChart3 },
  { href: "/profile", key: "profile" as const, icon: User },
];

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [offline, setOffline] = useState(false);
  const showNavigation = !["/", "/login", "/register"].includes(pathname);

  useEffect(() => {
    const updateConnection = () => setOffline(!navigator.onLine);
    updateConnection();
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="app-topbar">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-2">
          <Link href="/home" className="brand-mark" aria-label="SoilCare home">
            <Leaf size={19} aria-hidden="true" />
            <span>SoilCare</span>
          </Link>
          <LanguageSelector />
        </div>
      </div>
      <div className={showNavigation ? "app-content with-bottom-nav" : "app-content"}>
        {offline && (
          <div className="offline-banner" role="status">
            <WifiOff size={17} aria-hidden="true" />
            <span>Offline mode · ऑफ़लाइन मोड · ಆಫ್‌ಲೈನ್ ಮೋಡ್</span>
          </div>
        )}
        {children}
      </div>
      {showNavigation && (
        <nav className="bottom-nav" aria-label="Primary navigation">
          {navigation.map(({ href, key, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                href={href}
                key={href}
                className={active ? "bottom-nav-link active" : "bottom-nav-link"}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={21} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
                <span>{t(key)}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
