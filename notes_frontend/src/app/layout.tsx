import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "Create, view, edit, and delete notes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <Header />
        <div className="app-main">
          <Sidebar />
          <main className="app-content">
            <div className="mx-auto max-w-screen-2xl">{children}</div>
          </main>
        </div>
        <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-500">
          Built with Next.js • <Link className="text-blue-600 hover:underline" href="/">Ocean Notes</Link>
        </footer>
      </body>
    </html>
  );
}
