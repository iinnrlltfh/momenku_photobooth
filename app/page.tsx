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
            <Link 
              href="/" 
              className="px-4 py-2 rounded-full text-slate-600 hover:bg-[#E9D5FF] hover:text-white transition-all text-lg"
            >
              Home
            </Link>
            <Link 
              href="/frames" 
              className="px-4 py-2 rounded-full text-slate-600 hover:bg-[#E9D5FF] hover:text-white transition-all text-lg"
            >
              Frames
            </Link>
            <Link 
              href="/photobooth" 
              className="px-4 py-2 rounded-full text-slate-600 hover:bg-[#E9D5FF] hover:text-white transition-all text-lg"
            >
              Photobooth
            </Link>
            <Link 
              href="/photo-preview" 
              className="px-4 py-2 rounded-full text-slate-600 hover:bg-[#E9D5FF] hover:text-white transition-all text-lg"
            >
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
                className="px-28 py-4 rounded-full text-xl font-semibold transition-all duration-300 cursor-pointer relative"
                style={
                  isHovering
                    ? {
                        background: "linear-gradient(to bottom, #A083F7 0%, #27009D 100%)",
                        border: "linear-gradient(to top, #A083F7 0%, #27009D 100%)",
                        backgroundClip: "padding-box",
                        color: "white",
                      }
                    : {
                        background: "white",
                        border: "2px solid #e5e7eb",
                        color: "#4b5563",
                      }
                }
              >
                {isHovering && (
                  <span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      padding: "2px",
                      background: "linear-gradient(to right, rgba(160, 131, 247, 0.45) 0%, rgba(39, 0, 157, 0.81) 100%)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                )}
                Start
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
