// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LayoutWrapper from './components/layout-wrapper'

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to</h1>
        <h2 className="text-5xl font-bold text-white mb-8">Information Systems Laboratory</h2>
        <h3 className="text-2xl text-white mb-12">Documents Analysis Portal</h3>
        
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 bg-white rounded-full px-8 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
        >
          <Image 
            src="/microsoft-logo.png" 
            alt="Microsoft Logo" 
            width={24} 
            height={24} 
            className="w-6 h-6" 
          />
          Sign-in with Microsoft
        </Link>
      </div>
    </LayoutWrapper>
  )
}