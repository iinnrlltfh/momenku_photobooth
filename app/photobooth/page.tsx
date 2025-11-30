"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFrame } from "@/contexts/FrameContext"

export default function MomenkuPhotobooth() {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null)
  const [duration, setDuration] = useState("3s")
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [showRetakeModal, setShowRetakeModal] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { selectedFrameId } = useFrame()
  const router = useRouter()

  // Define which frames can take 3 photos (rest can take 4)
  const threePhotoFrames = [2, 5, 6, 9, 7]
  const maxPhotos = selectedFrameId && threePhotoFrames.includes(selectedFrameId) ? 3 : 4

  // Request camera access
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: "user" },
          audio: false,
        })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
        setCameraError(null)
      } catch (error) {
        console.error("Error accessing camera:", error)
        setCameraError("Unable to access camera. Please grant camera permissions.")
      }
    }

    startCamera()

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Redirect to frames page if no frame is selected
  useEffect(() => {
    if (selectedFrameId === null) {
      router.push("/frames")
    }
  }, [selectedFrameId, router])

  // Capture photo from video stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const photoDataUrl = canvas.toDataURL("image/jpeg")
        setCapturedPhotos((prev) => [...prev, photoDataUrl])
      }
    }
  }

  // Start automatic photo capture sequence
  const startCaptureSequence = () => {
    if (isCapturing || !stream) return

    setIsCapturing(true)
    setCapturedPhotos([]) // Clear previous photos
    
    const intervalSeconds = parseInt(duration)
    let photosRemaining = maxPhotos
    let currentCountdown = intervalSeconds

    // Initial countdown
    setCountdown(currentCountdown)

    const countdownInterval = setInterval(() => {
      currentCountdown--
      if (currentCountdown === 0) {
        // Take photo
        capturePhoto()
        photosRemaining--

        if (photosRemaining === 0) {
          // All photos taken
          clearInterval(countdownInterval)
          setCountdown(null)
          setIsCapturing(false)
        } else {
          // Reset countdown for next photo
          currentCountdown = intervalSeconds
          setCountdown(currentCountdown)
        }
      } else {
        setCountdown(currentCountdown)
      }
    }, 1000)
  }

  // Handle retake button click
  const handleRetakeClick = () => {
    if (capturedPhotos.length > 0) {
      setShowRetakeModal(true)
    } else {
      startCaptureSequence()
    }
  }

  // Confirm retake
  const confirmRetake = () => {
    setShowRetakeModal(false)
    startCaptureSequence()
  }

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
      <div className="flex-1 bg-gradient-to-r from-pink-200 via-pink-100 to-blue-200 px-6 py-12 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-16">
            {/* Left Side - Camera and Photo Section */}
            <div className="w-full max-w-2xl space-y-6">
              {/* Camera Preview Box */}
              <h1 className="text-center text-lg font-semibold">Make sure your face is within this line</h1>
              <div className="bg-white rounded-2xl shadow-2xl p-6 aspect-[4/3] flex items-center justify-center overflow-hidden relative">
                {cameraError ? (
                  <div className="text-center">
                    <svg
                      className="w-20 h-20 mx-auto text-red-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-red-600 text-sm">{cameraError}</p>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Countdown Overlay */}
                    {countdown !== null && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <div className="text-white text-[200px] font-bold animate-pulse">
                          {countdown}
                        </div>
                      </div>
                    )}
                  </>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Captured Photos Grid */}
              <div className="flex items-center justify-center gap-8">
                {Array.from({ length: maxPhotos }).map((_, index) => (
                  <div
                    key={index}
                    className="w-32 h-32 bg-white rounded-lg shadow-md border-2 border-slate-300 flex items-center justify-center overflow-hidden relative"
                  >
                    {capturedPhotos[index] ? (
                      <img
                        src={capturedPhotos[index]}
                        alt={`Captured photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <line x1="4" y1="4" x2="20" y2="20" strokeLinecap="round" />
                        <line x1="20" y1="4" x2="4" y2="20" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Controls */}
            <div className="space-y-8 mb-64 self-center">
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
                <button
                  onClick={() => router.push("/frames")}
                  className="px-6 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all shadow-sm text-sm"
                >
                  Change Frame
                </button>
                <button
                  onClick={startCaptureSequence}
                  disabled={isCapturing || !stream}
                  className="px-6 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCapturing ? "Capturing..." : "Start"}
                </button>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={isCapturing}
                    className="pl-5 pr-8 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all appearance-none cursor-pointer shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="3s">3s</option>
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

              {/* Retake & Done Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleRetakeClick}
                  disabled={isCapturing || !stream}
                  className="px-6 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCapturing ? "Capturing..." : "Retake"}
                </button>
                <button
                  onClick={() => {
                    // Handle done action - could navigate to preview or save photos
                    console.log("Photos done:", capturedPhotos)
                  }}
                  disabled={capturedPhotos.length === 0}
                  className="px-6 py-2.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:bg-white transition-all shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retake Confirmation Modal */}
      {showRetakeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="p-14 max-w-xl w-full mx-4 shadow-2xl" style={{ backgroundColor: "#FDF2F8" }}>
            <p className="text-center text-slate-700 text-lg mb-12 leading-relaxed">
              Ingin ambil ulang foto? <br />
              foto sebelumnya akan hilang
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRetakeModal(false)}
                className="px-10 py-2 bg-purple-400 hover:bg-purple-600 text-white rounded-full text-sm font-medium transition-all shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmRetake}
                className="px-10 py-2 bg-purple-400 hover:bg-purple-600 text-white rounded-full text-sm font-medium transition-all shadow-md"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
