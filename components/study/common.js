'use client';
// Shared bits for the step-by-step study pages: Class → Subject → Chapter → Topic, each on its own page.
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

// useSearchParams needs a Suspense boundary in the app router
export const withSuspense = (Page) => function Wrapped() {
  return <Suspense fallback={<main className="min-h-screen" />}><Page /></Suspense>;
};

// fetch JSON once per url; returns null while loading
export function useJson(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!url) return;
    let live = true;
    setData(null);
    fetch(url).then((r) => r.json()).catch(() => ({})).then((d) => { if (live) setData(d); });
    return () => { live = false; };
  }, [url]);
  return data;
}

export const qs = (obj) => new URLSearchParams(Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ''))).toString();

// Home › Class 5 › Maths › Chapter 3 › Topic 2
export function Crumbs({ items, className = 'text-pink-600' }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm font-bold sm:text-base">
      {items.map(([label, href], i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-50">›</span>}
          {href ? <Link href={href} className={`${className} hover:underline`}>{label}</Link> : <span className="opacity-80">{label}</span>}
        </span>
      ))}
    </nav>
  );
}
