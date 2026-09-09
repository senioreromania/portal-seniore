"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  className?: string;
}

/**
 * Google AdSense ad unit.
 * Uses the standard AdSense push pattern.
 */
export function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    pushedRef.current = true;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []);

  return (
    <div className={`ad-container w-full ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client="ca-pub-5360360429135111"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
