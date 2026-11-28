import './globals.css';
import Link from 'next/link';
import { ProfileProvider } from '@/components/Profile';
import ProfileChip from '@/components/ProfileChip';
import AnnouncementBar from '@/components/AnnouncementBar';

export const metadata = {
  title: 'Master Ji - City - Play School to College - COMPLETE Study',
  description: 'Complete study from Play School to College - notes, tests, Best Subject Test, Stream Selector, College Guide and School Management.',
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0ea5e9' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Noto+Sans+Devanagari:wght@400;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-screen">
        <ProfileProvider>
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2">
              <Link href="/" className="flex items-center gap-2 font-extrabold text-slate-900">
                <span className="text-2xl">🎓</span>
                <span className="leading-tight">Master Ji <span className="block text-[10px] font-semibold text-slate-500 sm:inline sm:text-xs">City · Play School to College</span></span>
              </Link>
              <nav className="no-scrollbar hidden gap-1 overflow-x-auto text-sm font-semibold md:flex">
                <Link className="rounded-lg px-3 py-2 hover:bg-yellow-100" href="/study-1-8">📚 Play-8th</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-blue-50" href="/study-9-12">🧠 9th-12th</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-green-50" href="/study-9-12/stream">🎯 Stream</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" href="/college-study">🎓 College</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-orange-50" href="/states">🗺️ States</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-violet-50" href="/computer-course">💻 Computer</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-pink-50" href="/doubt">🤖 Doubt</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-blue-50" href="/mock-test">📝 Mock Test</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-yellow-100" href="/certificate">🏆 Certificate</Link>
                <Link className="rounded-lg px-3 py-2 hover:bg-indigo-50" href="/school">🏫 School</Link>
              </nav>
              <ProfileChip />
            </div>
            <nav className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-2 text-sm font-semibold md:hidden">
              <Link className="shrink-0 rounded-lg bg-yellow-100 px-3 py-1.5" href="/study-1-8">📚 Play-8th</Link>
              <Link className="shrink-0 rounded-lg bg-blue-50 px-3 py-1.5" href="/study-9-12">🧠 9th-12th</Link>
              <Link className="shrink-0 rounded-lg bg-green-50 px-3 py-1.5" href="/study-9-12/stream">🎯 Stream</Link>
              <Link className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5" href="/college-study">🎓 College</Link>
              <Link className="shrink-0 rounded-lg bg-orange-50 px-3 py-1.5" href="/states">🗺️ States</Link>
              <Link className="shrink-0 rounded-lg bg-pink-50 px-3 py-1.5" href="/doubt">🤖 Doubt</Link>
              <Link className="shrink-0 rounded-lg bg-blue-50 px-3 py-1.5" href="/mock-test">📝 Mock Test</Link>
              <Link className="shrink-0 rounded-lg bg-yellow-100 px-3 py-1.5" href="/certificate">🏆 Certificate</Link>
              <Link className="shrink-0 rounded-lg bg-indigo-50 px-3 py-1.5" href="/school">🏫 School</Link>
            </nav>
          </header>
          <AnnouncementBar />
          {children}
          <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
            Master Ji - City · Play School to College - COMPLETE Study
          </footer>
        </ProfileProvider>
      </body>
    </html>
  );
}
