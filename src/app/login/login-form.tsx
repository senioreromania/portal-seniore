"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push(redirectTo || "/cont");
    router.refresh();
  }

  return (
    <div className="bg-white rounded-xl border border-navy-deep/10 p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-navy-deep mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            placeholder="email@exemplu.ro"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-navy-deep mb-1.5"
          >
            Parolă
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            placeholder="Parola ta"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy-deep text-paper py-3 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Se conectează..." : "Conectează-te"}
        </button>

        <p className="text-center text-sm text-navy-deep/60">
          Nu ai cont?{" "}
          <Link
            href="/inregistrare"
            className="font-semibold text-navy-deep hover:text-gold transition-colors"
          >
            Înregistrează-te
          </Link>
        </p>
      </form>
    </div>
  );
}
