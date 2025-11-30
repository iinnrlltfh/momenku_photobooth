"use client"

import { useState } from "react"
import Link from "next/link"

export default function Home() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Logo */}
          <div className="text-4xl font-bold text-slate-700" style={{ fontFamily: "Dancing Script, cursive" }}>
            Momenku
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors text-lg">
              Home
            </Link>
            <Link href="/frames" className="text-slate-600 hover:text-slate-900 transition-colors text-lg">
              Frames
            </Link>
            <Link href="/photobooth" className="text-slate-600 hover:text-slate-900 transition-colors text-lg">
              Photobooth
            </Link>
            <Link href="/photo-preview" className="text-slate-600 hover:text-slate-900 transition-colors text-lg">
              Photo Preview
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Background */}
      <div className="flex-1 bg-gradient-to-r from-pink-200 via-pink-100 to-blue-200 flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-2xl">
          {/* Main Heading */}
          <h1
            className="text-6xl md:text-7xl font-bold text-slate-700 leading-tight"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Welcome to Momenku
          </h1>

          {/* Subheading */}
          <div className="space-y-2">
            <p className="text-2xl text-slate-600">Capture your moment.</p>
            <p className="text-2xl text-slate-600">Cherish it forever.</p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/frames">
              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`px-12 py-4 rounded-full text-xl font-semibold border-2 transition-all duration-300 ${
                  isHovering ? "bg-white/20 border-slate-400 text-slate-700" : "bg-white border-slate-300 text-slate-600"
                }`}
              >
                Start ✨
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
