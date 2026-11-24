'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';

const classLabel = (c) => (/^\d+$/.test(c || '') ? `Class ${c}` : c || '');
const fmtDate = (d) => new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// Certificate as SVG (1600 x 1131 ≈ A4 landscape). System fonts only, so the PNG download looks the same as the screen.
function CertificateSVG({ cert, svgRef }) {
  const nameSize = cert.name.length > 22 ? 64 : cert.name.length > 14 ? 80 : 96;
  const stars = Array.from({ length: 5 }, (_, i) => i);
  return (
    <svg ref={svgRef} viewBox="0 0 1600 1131" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full" role="img"
      aria-label={`Certificate: ${cert.name} - Master Ji Topper - ${classLabel(cert.class)} - ${cert.city}`}>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff7d6" /><stop offset="0.5" stopColor="#fffdf5" /><stop offset="1" stopColor="#e0f4ff" />
        </linearGradient>
        <linearGradient id="frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f59e0b" /><stop offset="0.35" stopColor="#ec4899" /><stop offset="0.7" stopColor="#0ea5e9" /><stop offset="1" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" /><stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1131" fill="url(#bg)" />
      <rect x="28" y="28" width="1544" height="1075" rx="36" fill="none" stroke="url(#frame)" strokeWidth="22" />
      <rect x="62" y="62" width="1476" height="1007" rx="24" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="14 10" />
      {/* corner confetti */}
      {[[120, 130, '#ec4899'], [1480, 130, '#0ea5e9'], [120, 1000, '#16a34a'], [1480, 1000, '#f59e0b']].map(([x, y, c], i) => (
        <g key={i}><circle cx={x} cy={y} r="26" fill={c} opacity="0.9" /><circle cx={x + (x < 800 ? 50 : -50)} cy={y + (y < 500 ? 34 : -34)} r="12" fill={c} opacity="0.5" /></g>
      ))}

      <text x="800" y="170" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="40" fill="#0f172a" letterSpacing="6">🎓 MASTER JI · CITY</text>
      <text x="800" y="275" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="92" fontWeight="bold" fill="#b45309">Certificate of Achievement</text>
      <text x="800" y="345" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="32" fill="#475569">This certificate is proudly presented to</text>

      <text x="800" y={470} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={nameSize} fontWeight="bold" fontStyle="italic" fill="#be185d">{cert.name}</text>
      <line x1="380" y1="500" x2="1220" y2="500" stroke="#d97706" strokeWidth="3" />

      {/* Topper badge */}
      <g transform="translate(800 610)">
        <rect x="-300" y="-56" width="600" height="112" rx="56" fill="url(#gold)" stroke="#b45309" strokeWidth="4" />
        <text x="0" y="18" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontSize="50" fontWeight="900" fill="#7c2d12">🏆 MASTER JI TOPPER</text>
      </g>

      <text x="800" y="750" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="40" fontWeight="bold" fill="#0f172a">{classLabel(cert.class)} · {cert.city}</text>
      <text x="800" y="810" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fill="#475569">for earning {cert.starsAtIssue}+ stars by studying, practising and passing tests on Master Ji</text>
      <g transform="translate(800 868)">
        {stars.map((i) => <text key={i} x={(i - 2) * 64} y="0" textAnchor="middle" fontSize="44">⭐</text>)}
      </g>

      <text x="250" y="985" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fill="#475569">Date: {fmtDate(cert.issuedOn)}</text>
      <text x="250" y="1022" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fill="#475569">Certificate No: {cert.certificateNo}</text>
      <line x1="1070" y1="985" x2="1350" y2="985" stroke="#0f172a" strokeWidth="2" />
      <text x="1210" y="1022" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="28" fontStyle="italic" fill="#0f172a">Master Ji</text>
    </svg>
  );
}

export default function CertificatePage() {
  const { profile, stars: localStars, ready } = useProfile();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const svgRef = useRef(null);

  useEffect(() => {
    if (!profile?.name) return;
    fetch(`/api/certificate?name=${encodeURIComponent(profile.name)}&class=${encodeURIComponent(profile.class)}&city=${encodeURIComponent(profile.city)}`)
      .then((r) => r.json()).then(setData).catch(() => setError('Could not check your stars. Please try again.'));
  }, [profile, localStars]);

  const download = async () => {
    const svg = svgRef.current;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = 2400; canvas.height = 1697;
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `MasterJi-Topper-${data.certificate.name.replace(/[^\p{L}\p{N}]+/gu, '-')}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  };

  const stars = data?.stars ?? 0;
  const needed = data?.needed ?? 100;
  const pct = Math.min(100, Math.round((stars / needed) * 100));

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="print:hidden">
          <Link href="/" className="font-bold text-pink-600">← Home</Link>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">🏆 Topper Certificate</h1>
          <p className="text-xl font-bold text-pink-600">Collect {needed} ⭐ stars and get your Master Ji Topper Certificate!</p>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-red-700">⚠ {error}</p>}
        {ready && !profile && <p className="mt-6 rounded-2xl bg-white p-5 text-lg">Enter your name, class and city first (the popup) to see your certificate.</p>}
        {profile && !data && !error && <p className="mt-6 text-xl">⏳ Checking your stars...</p>}

        {data && !data.eligible && (
          <section className="mt-6 rounded-3xl border-4 border-yellow-300 bg-white p-6 shadow-pop print:hidden">
            <p className="text-2xl font-extrabold text-slate-900">{profile.name}, you have <span className="text-yellow-600">{stars} ⭐</span> stars</p>
            <div className="mt-4 h-8 overflow-hidden rounded-full bg-yellow-100" role="progressbar" aria-valuenow={stars} aria-valuemin={0} aria-valuemax={needed}>
              <div className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-sky-400 pr-3 text-sm font-black text-white transition-all" style={{ width: `${Math.max(pct, 6)}%` }}>{pct}%</div>
            </div>
            <p className="mt-3 text-xl font-bold text-pink-600">Only {needed - stars} more stars to become a Master Ji Topper! 💪</p>
            <h2 className="mt-6 text-xl font-extrabold text-sky-700">How to earn stars</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Link href="/study-1-8" className="rounded-2xl bg-yellow-100 p-4 font-bold hover:bg-yellow-200">📚 Chapter tests (Play-8th)<br /><span className="text-sm font-normal">+1 ⭐ per correct answer</span></Link>
              <Link href="/study-9-12/study" className="rounded-2xl bg-sky-100 p-4 font-bold hover:bg-sky-200">📘 Chapter tests (9th-12th)<br /><span className="text-sm font-normal">+1 ⭐ per correct answer</span></Link>
              <Link href="/mock-test" className="rounded-2xl bg-pink-100 p-4 font-bold hover:bg-pink-200">📝 Mock Test<br /><span className="text-sm font-normal">up to +20 ⭐ per test</span></Link>
            </div>
            {localStars > stars && <p className="mt-4 text-sm text-slate-500">Your phone shows {localStars} stars, but only stars saved on the server count for the certificate.</p>}
          </section>
        )}

        {data?.eligible && (
          <>
            <div className="mt-6 flex flex-wrap gap-3 print:hidden">
              <button onClick={download} className="rounded-2xl bg-pink-500 px-6 py-3 text-lg font-extrabold text-white shadow-pop active:translate-y-1">⬇️ Download (PNG)</button>
              <button onClick={() => window.print()} className="rounded-2xl bg-sky-500 px-6 py-3 text-lg font-extrabold text-white shadow-pop active:translate-y-1">🖨️ Print / Save as PDF</button>
              <span className="self-center text-sm font-semibold text-slate-600">🎉 Congratulations, {data.certificate.name}! ({stars} ⭐)</span>
            </div>
            <div id="certificate-print" className="mt-4 overflow-hidden rounded-2xl bg-white shadow-2xl">
              <CertificateSVG cert={data.certificate} svgRef={svgRef} />
            </div>
            <p className="mt-3 text-sm text-slate-600 print:hidden">Certificate No. {data.certificate.certificateNo} - anyone can check it at <code>/api/certificate?verify={data.certificate.certificateNo}</code></p>
          </>
        )}
      </div>
    </main>
  );
}
