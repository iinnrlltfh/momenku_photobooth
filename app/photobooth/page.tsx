"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFrame } from "@/contexts/FrameContext"

export default function MomenkuPhotobooth() {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null)
  const [duration, setDuration] = useState("3s")
  const { selectedFrameId } = useFrame()
  const router = useRouter()

  // Redirect to frames page if no frame is selected
  useEffect(() => {
    if (selectedFrameId === null) {
      router.push("/frames")
    }
  }, [selectedFrameId, router])

  // Don't render if no frame is selected
  if (selectedFrameId === null) {
    return null
  }

  const filters = [
    { id: 1, color: "bg-orange-700", border: "border-orange-900" },
    { id: 2, color: "bg-black", border: "border-gray-800" },
    { id: 3, color: "bg-gray-500", border: "border-gray-600" },
    { id: 4, color: "bg-blue-200", border: "border-blue-300" },
    { id: 5, color: "bg-black", border: "border-gray-800" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-4xl font-bold text-slate-700" style={{ fontFamily: "Dancing Script, cursive" }}>
            Momenku
          </div>

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

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-r from-pink-200 via-pink-100 to-blue-200 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-16">
            {/* Left Side - Photo Preview Box */}
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-2xl shadow-2xl p-8 aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-40 h-40 mx-auto text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <line
                      x1="4"
                      y1="4"
                      x2="20"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Controls */}
            <div className="space-y-8">
              <h2 className="text-4xl font-semibold text-slate-700">Choose a filter for your photos!</h2>

              {/* Filter Selection - Circular Buttons */}
              <div className="flex gap-4">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-14 h-14 rounded-full ${filter.color} ${filter.border} border-2 transition-all duration-200 hover:scale-110 shadow-lg ${
                      selectedFilter === filter.id ? "ring-4 ring-white scale-110" : ""
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="px-6 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all shadow-sm text-sm">
                  Upload Image
                </button>
                <button className="px-6 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all shadow-sm text-sm">
                  Change Frame
                </button>
                <button className="px-6 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all shadow-sm text-sm">
                  Start
                </button>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="pl-5 pr-8 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all appearance-none cursor-pointer shadow-sm text-sm"
                  >
                    <option value="3s">3s</option>
                    <option value="5s">5s</option>
                    <option value="10s">10s</option>
                  </select>
                  <svg
                    className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
