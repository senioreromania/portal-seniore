"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type QA = { question: string; answer: ReactNode };

export function FaqSection({ title, items }: { title: string; items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 bg-paper border-t border-navy-deep/5">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-xl font-bold text-navy-deep mb-6">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-navy-deep/10 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-heading text-sm font-semibold text-navy-deep">
                  {item.question}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-navy-deep/40 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-navy-deep/60 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
