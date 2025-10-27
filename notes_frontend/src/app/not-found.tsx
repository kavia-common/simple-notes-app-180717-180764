import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-content">
      <section className="ocean-card p-8 text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold text-gray-900">404 – Page Not Found</h1>
        <p className="text-sm text-gray-600 mt-1">The page you’re looking for doesn’t exist.</p>
        <div className="mt-4">
          <Link href="/" className="ocean-btn-primary">Go Home</Link>
        </div>
      </section>
    </main>
  );
}
