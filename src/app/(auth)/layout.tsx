"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slay-900 px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
