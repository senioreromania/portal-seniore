"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __GA_LOADED?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-6LQ7HMECW2";

export function GoogleAnalytics() {
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent === "accepted" && !window.__GA_LOADED) {
        window.__GA_LOADED = true;
        window.dataLayer = [];
        window.gtag = function gtag() {
          window.dataLayer!.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", GA_ID);

        const script1 = document.createElement("script");
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script1);
      }
    };

    checkConsent();
    window.addEventListener("cookie-consent-change", checkConsent);
    return () => window.removeEventListener("cookie-consent-change", checkConsent);
  }, []);

  return null;
}
