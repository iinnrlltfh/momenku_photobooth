"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useFrame } from "@/contexts/FrameContext"

const frames = [
  {
    id: 1,
    type: "cinema",
    renderFrame: () => (
      <div className="relative w-full h-64 flex items-center justify-center bg-red-900 p-4">
        {/* Theater curtains */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 bg-red-700"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #991b1b 0px, #991b1b 2px, #dc2626 2px, #dc2626 4px)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-8 bg-red-700"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #991b1b 0px, #991b1b 2px, #dc2626 2px, #dc2626 4px)",
          }}
        />

        {/* Main frame with now showing sign */}
        <div className="w-full h-full relative bg-black/50 flex flex-col items-center justify-center p-4">
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-orange-700 border-4 border-white px-6 py-2 rounded-lg w-5/6 max-w-sm">
            <div className="text-center text-white font-bold text-sm tracking-wider">NOW SHOWING</div>
          </div>

          <div className="w-full h-32 bg-white rounded-lg shadow-lg mt-12 flex flex-col overflow-hidden">
            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
              <div className="absolute top-4 right-4 w-5 h-4 bg-white rounded-full opacity-60" />
            </div>
            <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    type: "postal",
    renderFrame: () => (
      <div
        className="relative w-full h-64 bg-yellow-50 border-8"
        style={{ borderImage: "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 2px, #1e3a8a 2px, #1e3a8a 4px) 1" }}
      >
        <div className="absolute top-2 left-2 w-8 h-8 bg-amber-800 rounded-full shadow-md" />
        <div className="relative w-full h-full p-3 flex flex-col items-center justify-center">
          <div className="w-full h-full bg-white border-2 border-amber-300 flex flex-col overflow-hidden">
            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
              <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
            </div>
            <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    type: "leopard",
    renderFrame: () => (
      <div
        className="relative w-full h-64 bg-pink-300 p-4"
        style={{
          backgroundImage: "radial-gradient(circle, #ec4899 2px, transparent 2px)",
          backgroundSize: "15px 15px",
        }}
      >
        <div className="w-full h-full border-8 border-yellow-100 flex flex-col overflow-hidden bg-white shadow-lg">
          <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
            <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
          </div>
          <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
        </div>

        {/* Pink bow decoration */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-pink-400 rounded-full" />
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-pink-500" />
      </div>
    ),
  },
  {
    id: 4,
    type: "browser",
    renderFrame: () => (
      <div className="relative w-full h-64 bg-slate-900 p-2">
        {/* Browser bar */}
        <div className="bg-gradient-to-b from-slate-200 to-slate-100 rounded-t-md p-2 h-8 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="flex-1 bg-white rounded ml-2 text-xs text-slate-400 px-2">landscape.jpg</div>
        </div>

        {/* Content */}
        <div className="bg-white w-full flex-1 flex flex-col">
          <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
            <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
          </div>
          <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
        </div>
      </div>
    ),
  },
  {
    id: 5,
    type: "navy-postal",
    renderFrame: () => (
      <div
        className="relative w-full h-64 bg-yellow-50 border-8"
        style={{ borderImage: "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 2px, #1e3a8a 2px, #1e3a8a 4px) 1" }}
      >
        <div className="absolute top-2 left-2 w-8 h-8 bg-amber-800 rounded-full shadow-md" />
        <div className="relative w-full h-full p-3 flex flex-col items-center justify-center">
          <div className="w-full h-full bg-white border-2 border-blue-900 flex flex-col overflow-hidden">
            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
              <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
            </div>
            <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    type: "cinema-alt",
    renderFrame: () => (
      <div className="relative w-full h-64 flex items-center justify-center bg-red-900 p-4">
        <div
          className="absolute left-0 top-0 bottom-0 w-6 bg-red-700"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #991b1b 0px, #991b1b 1px, #dc2626 1px, #dc2626 3px)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-6 bg-red-700"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #991b1b 0px, #991b1b 1px, #dc2626 1px, #dc2626 3px)",
          }}
        />

        <div className="w-full h-full relative bg-black/40 flex flex-col items-center justify-center p-3">
          <div className="w-full h-32 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
              <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
            </div>
            <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    type: "disco",
    renderFrame: () => (
      <div
        className="relative w-full h-64 bg-gradient-to-b from-pink-300 to-pink-200 p-4"
        style={{
          backgroundImage: "radial-gradient(circle, #ec4899 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      >
        <div className="w-full h-full border-8 border-yellow-100 flex flex-col overflow-hidden bg-white shadow-lg">
          <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
            <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
          </div>
          <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
        </div>
      </div>
    ),
  },
  {
    id: 8,
    type: "postal-classic",
    renderFrame: () => (
      <div
        className="relative w-full h-64 bg-yellow-50 border-8"
        style={{ borderImage: "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 2px, #1e3a8a 2px, #1e3a8a 4px) 1" }}
      >
        <div className="relative w-full h-full p-3 flex flex-col items-center justify-center">
          <div className="w-full h-full bg-white border-2 border-red-600 flex flex-col overflow-hidden">
            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
              <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
            </div>
            <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    type: "cinema-premium",
    renderFrame: () => (
      <div className="relative w-full h-64 flex items-center justify-center bg-red-950 p-4">
        <div
          className="absolute left-0 top-0 bottom-0 w-8 bg-red-800"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #7f1d1d 0px, #7f1d1d 2px, #dc2626 2px, #dc2626 4px)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-8 bg-red-800"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #7f1d1d 0px, #7f1d1d 2px, #dc2626 2px, #dc2626 4px)",
          }}
        />

        <div className="w-full h-full relative bg-black/50 flex flex-col items-center justify-center p-4">
          <div className="w-full h-32 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
              <div className="absolute top-4 right-4 w-4 h-3 bg-white rounded-full opacity-60" />
            </div>
            <div className="h-8 bg-gradient-to-b from-lime-400 to-lime-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    type: "postal-compact",
    renderFrame: () => (
      <div
        className="relative w-full h-64 bg-yellow-50 border-6"
        style={{ borderImage: "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 2px, #1e3a8a 2px, #1e3a8a 4px) 1" }}
      >
        <div className="relative w-full h-full p-2 flex flex-col items-center justify-center">
          <div className="w-full h-full bg-white border border-amber-300 flex flex-col overflow-hidden">
            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-100 relative">
              <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white rounded-full opacity-60" />
              <div className="absolute top-3 right-3 w-3 h-2 bg-white rounded-full opacity-60" />
            </div>
            <div className="h-6 bg-gradient-to-b from-lime-400 to-lime-500" />
          </div>
        </div>
      </div>
    ),
  },
]

const frameImages = [
  { id: 2, src: "/images/2.png", alt: "Pink aesthetic frame" },
  { id: 1, src: "/images/1.png", alt: "Pink leopard frame" },
  { id: 5, src: "/images/6.png", alt: "Classic postal frame" },
  { id: 3, src: "/images/4.png", alt: "Vintage postal frame" },
  { id: 4, src: "/images/5.png", alt: "Exclusive postal frame" },
  { id: 6, src: "/images/8.png", alt: "Cinema theater frame" },
  { id: 9, src: "/images/3.png", alt: "Theater marquee frame" },
  { id: 7, src: "/images/9.png", alt: "Browser window frame" },
  { id: 8, src: "/images/10.png", alt: "Modern browser frame" },
  { id: 10, src: "/images/7.png", alt: "Movie theater frame" },
]

export default function FramesPage() {
  const { selectedFrameId, setSelectedFrameId } = useFrame()
  const router = useRouter()

  const handleFrameSelect = (frameId: number) => {
    setSelectedFrameId(frameId)
    // Redirect to photobooth immediately after selection
    router.push("/photobooth")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-4xl font-bold text-slate-700"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Momenku
          </Link>

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

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-r from-pink-200 via-pink-100 to-blue-200 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-slate-700 mb-2" style={{ fontFamily: "Dancing Script, cursive" }}>
              Choose Your Frame
            </h1>
            <p className="text-lg text-slate-600">Select a frame style for your photobooth session</p>
          </div> */}

          {/* Frames Grid */}
          <div className="grid grid-cols-5 gap-20 mb-12">
            {frameImages.map((frame) => (
              <button
                key={frame.id}
                onClick={() => handleFrameSelect(frame.id)}
                className={`group relative transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none rounded-lg overflow-hidden mt-6 cursor-pointer ${
                  selectedFrameId === frame.id
                    ? "ring-4 ring-slate-700 shadow-2xl -translate-y-2"
                    : "shadow-lg hover:shadow-2xl"
                }`}
              >
                <Image
                  src={frame.src || "/placeholder.svg"}
                  alt={frame.alt}
                  width={200}
                  height={400}
                  className="h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
