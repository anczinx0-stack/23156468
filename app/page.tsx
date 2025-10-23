'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterApp = () => {
    setIsEntering(true);
    setTimeout(() => {
      window.location.href = '/app';
    }, 300);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-white transition-opacity duration-300 ${isEntering ? 'opacity-0' : 'opacity-100'} overflow-hidden relative`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.03),transparent_50%)]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-yellow-100/20 animate-float animate-blob-morph blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-yellow-200/30 to-amber-100/20 animate-float-delayed animate-blob-morph blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-50/20 via-amber-50/20 to-yellow-50/20 rounded-full animate-rotate-slow blur-2xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-100/20 animate-float-reverse animate-blob-morph-reverse blur-2xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-yellow-100/20 animate-float-slow animate-blob-morph blur-2xl" />
      </div>

      <div className="relative text-center space-y-12 px-4 max-w-4xl mx-auto">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative w-64 h-64 mx-auto mb-8 animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/20 to-amber-400/20 rounded-full animate-pulse-glow blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 to-amber-300/30 rounded-full animate-rotate-slow" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-transparent to-yellow-400/10 animate-shimmer-gold rounded-full" />
              <Image
                src="/image copy.png"
                alt="Neo Editor Logo"
                width={256}
                height={256}
                className="object-contain animate-gentle-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                priority
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-amber-900 to-slate-900 bg-clip-text text-transparent leading-tight tracking-tight animate-fade-in-up hover:scale-105 transition-transform duration-300 animate-text-shimmer">
              Neo Editor
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              A professional visual editor for creating stunning HTML posters with drag-and-drop simplicity and pixel-perfect control
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-500 pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="group flex items-center gap-2 hover:text-amber-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default px-4 py-2 rounded-full hover:bg-amber-50/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <svg className="w-5 h-5 text-amber-600 group-hover:rotate-12 transition-transform group-hover:drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="group-hover:font-semibold">Drag & Drop</span>
            </div>
            <div className="group flex items-center gap-2 hover:text-amber-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default px-4 py-2 rounded-full hover:bg-amber-50/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <svg className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="group-hover:font-semibold">Resize Images</span>
            </div>
            <div className="group flex items-center gap-2 hover:text-amber-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default px-4 py-2 rounded-full hover:bg-amber-50/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <svg className="w-5 h-5 text-amber-600 group-hover:-rotate-6 transition-transform group-hover:drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="group-hover:font-semibold">Export HTML</span>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={handleEnterApp}
            size="lg"
            className="relative bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-white px-10 py-7 text-lg rounded-xl shadow-[0_10px_40px_rgba(251,191,36,0.3)] hover:shadow-[0_20px_60px_rgba(251,191,36,0.5)] transition-all duration-300 group transform hover:scale-110 animate-pulse-glow overflow-hidden border-2 border-amber-400/50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative font-bold tracking-wide drop-shadow-lg">Launch Editor</span>
            <ArrowRight className="relative ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 drop-shadow-lg" />
          </Button>
        </div>

        <div className="pt-8 text-xs text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Built with Next.js, TypeScript & Tailwind CSS
        </div>
      </div>
    </div>
  );
}
