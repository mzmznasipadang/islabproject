// src/app/components/layout-wrapper.tsx
import ThreeBackground from './three-background';
import Image from 'next/image';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThreeBackground />
      
      {/* Header */}
      <header className="relative z-10 p-4 flex justify-between items-center">
        <Image
          src="/binus-logo.png"
          alt="BINUS Logo"
          width={120}
          height={32}
          className="h-8 w-auto"
        />
        <button className="bg-white rounded-full px-4 py-1 text-sm">
          Sign-in
        </button>
      </header>
      
      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 text-center text-white/80 py-6 mt-auto">
        <div className="text-lg font-semibold">SCHOOL OF INFORMATION SYSTEMS</div>
        <div className="text-sm">
          Copyright © BINUS Higher Education 2024. All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
