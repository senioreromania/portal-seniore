"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __ADS_LOADED?: boolean;
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = "ca-pub-5360360429135111";

export function GoogleAdSense() {
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent === "accepted" && !window.__ADS_LOADED) {
        window.__ADS_LOADED = true;

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }
    };

    checkConsent();
    window.addEventListener("cookie-consent-change", checkConsent);
    return () => window.removeEventListener("cookie-consent-change", checkConsent);
  }, []);

  return null;
}
