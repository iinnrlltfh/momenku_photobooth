"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFrame } from "@/contexts/FrameContext"
import { usePhoto } from "@/contexts/PhotoContext"

export default function PhotoPreview() {
  const { selectedFrameId } = useFrame()
  const { capturedPhotos } = usePhoto()
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [compositeImage, setCompositeImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isHoveringRetake, setIsHoveringRetake] = useState(false)
  const [isHoveringDownload, setIsHoveringDownload] = useState(false)

  useEffect(() => {
    // Redirect if no frame or photos
    if (selectedFrameId === null || capturedPhotos.length === 0) {
      router.push("/photobooth")
      return
    }

    // Composite for frame IDs 1-6 with transparent frames
    if (selectedFrameId >= 1 && selectedFrameId <= 6) {
      compositeWithTransparentFrame()
    } else {
      setIsLoading(false)
    }
  }, [selectedFrameId, capturedPhotos, router])

  const compositeWithTransparentFrame = async () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    try {
      // Set canvas size to match the actual frame dimensions (533x1600)
      const canvasWidth = 533
      const canvasHeight = 1600
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      // Fill with white background
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // ========================================
      // 🎯 POSISI FOTO UNTUK SETIAP FRAME
      // ========================================
      // x = jarak dari kiri
      // y = jarak dari atas
      // width = lebar kotak foto
      // height = tinggi kotak foto
      
      let photoAreas: Array<{ x: number; y: number; width: number; height: number }> = []
      
      switch (selectedFrameId) {
        case 1:
          // TODO: Adjust these values for Frame 1
          photoAreas = [
            { x: 5, y: 135, width: 533, height: 315 },
            { x: 5, y: 520, width: 533, height: 315 },
            { x: 5, y: 870, width: 533, height: 315 },
          ]
          break
        case 2:
          // Frame 2 - Already positioned correctly
          photoAreas = [
            { x: 5, y: 55, width: 533, height: 315 },
            { x: 5, y: 390, width: 533, height: 315 },
            { x: 5, y: 730, width: 533, height: 315 },
            { x: 5, y: 1070, width: 533, height: 315 },
          ]
          break
        case 3:
          // TODO: Adjust these values for Frame 3
          photoAreas = [
            { x: 5, y: 75, width: 533, height: 315 },
            { x: 5, y: 423, width: 533, height: 315 },
            { x: 5, y: 750, width: 533, height: 315 },
            { x: 5, y: 1090, width: 533, height: 315 },
          ]
          break
        case 4:
          // TODO: Adjust these values for Frame 4
          photoAreas = [
            { x: 5, y: 75, width: 533, height: 315 },
            { x: 5, y: 423, width: 533, height: 315 },
            { x: 5, y: 750, width: 533, height: 315 },
            { x: 5, y: 1090, width: 533, height: 315 },
          ]
          break
        case 5:
          // TODO: Adjust these values for Frame 5
          photoAreas = [
            { x: 5, y: 75, width: 533, height: 315 },
            { x: 5, y: 423, width: 533, height: 315 },
            { x: 5, y: 750, width: 533, height: 315 },
            { x: 5, y: 1090, width: 533, height: 315 },
          ]
          break
        case 6:
          // TODO: Adjust these values for Frame 6
          photoAreas = [
            { x: 5, y: 75, width: 533, height: 315 },
            { x: 5, y: 423, width: 533, height: 315 },
            { x: 5, y: 750, width: 533, height: 315 },
            { x: 5, y: 1090, width: 533, height: 315 },
          ]
          break
        default:
          // Default positioning
          photoAreas = [
            { x: 5, y: 75, width: 533, height: 315 },
            { x: 5, y: 423, width: 533, height: 315 },
            { x: 5, y: 750, width: 533, height: 315 },
            { x: 5, y: 1090, width: 533, height: 315 },
          ]
      }
      // ========================================

      // Draw captured photos
      for (let i = 0; i < Math.min(capturedPhotos.length, photoAreas.length); i++) {
        const photo = capturedPhotos[i]
        const area = photoAreas[i]

        // Load and draw photo
        await new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            // Save context state
            ctx.save()
            
            // Create clipping region for pixel-perfect bounds
            ctx.beginPath()
            ctx.rect(area.x, area.y, area.width, area.height)
            ctx.clip()
            
            // Calculate aspect ratio for object-fit: cover behavior (fills area, crops excess)
            const imgAspect = img.width / img.height
            const areaAspect = area.width / area.height

            let drawWidth, drawHeight, drawX, drawY

            if (imgAspect > areaAspect) {
              // Image is wider - fit to height and crop sides
              drawHeight = area.height
              drawWidth = drawHeight * imgAspect
              drawX = area.x + (area.width - drawWidth) / 2  // Center horizontally
              drawY = area.y
            } else {
              // Image is taller - fit to width and crop top/bottom
              drawWidth = area.width
              drawHeight = drawWidth / imgAspect
              drawX = area.x
              drawY = area.y + (area.height - drawHeight) / 2  // Center vertically
            }

            // Draw image with cover behavior (fills entire area, no whitespace)
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
            
            // Restore context state (removes clipping)
            ctx.restore()
            resolve()
          }
          img.onerror = reject
          img.src = photo
        })
      }

      // Load and draw transparent frame overlay
      const frameImg = new Image()
      await new Promise<void>((resolve, reject) => {
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, canvasWidth, canvasHeight)
          resolve()
        }
        frameImg.onerror = reject
        frameImg.src = `/images/transparent/${selectedFrameId}_transparent.png`
      })

      // Convert canvas to image
      const compositeDataUrl = canvas.toDataURL("image/png")
      setCompositeImage(compositeDataUrl)
      setIsLoading(false)
    } catch (error) {
      console.error("Error compositing image:", error)
      setIsLoading(false)
    }
  }

  const downloadImage = () => {
    if (!compositeImage) return

    const link = document.createElement("a")
    link.href = compositeImage
    link.download = `momenku-photo-${Date.now()}.png`
    link.click()
  }

  const handleRetake = () => {
    router.push("/photobooth")
  }

  if (selectedFrameId === null || capturedPhotos.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-4xl font-bold text-slate-700" style={{ fontFamily: "Dancing Script, cursive" }}>
            Momenku
          </div>

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
        <div className="max-w-7xl mx-auto h-full">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
                <p className="text-slate-600 text-lg">Creating your masterpiece...</p>
              </div>
            </div>
          ) : (
            <>
              {selectedFrameId >= 1 && selectedFrameId <= 6 && compositeImage ? (
                <div className="flex items-center justify-around h-full px-12">
                  {/* Frame on the left - smaller */}
                  <div className="flex-shrink-0">
                    <img 
                      src={compositeImage} 
                      alt="Composite photo with frame" 
                      className="h-auto shadow-lg"
                      style={{ maxHeight: "500px", width: "auto" }}
                    />
                  </div>
                  
                  {/* Buttons on the right */}
                  <div className="flex gap-6">
                    <button
                      onClick={handleRetake}
                      onMouseEnter={() => setIsHoveringRetake(true)}
                      onMouseLeave={() => setIsHoveringRetake(false)}
                      className="px-16 py-3 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer relative"
                      style={
                        isHoveringRetake
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
                      {isHoveringRetake && (
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
                      Retake
                    </button>
                    <button
                      onClick={downloadImage}
                      onMouseEnter={() => setIsHoveringDownload(true)}
                      onMouseLeave={() => setIsHoveringDownload(false)}
                      className="px-16 py-3 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer relative"
                      style={
                        isHoveringDownload
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
                      {isHoveringDownload && (
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
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-slate-700 mb-6">
                      Your Captured Photos
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {capturedPhotos.map((photo, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                          <img 
                            src={photo} 
                            alt={`Captured photo ${index + 1}`} 
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleRetake}
                        className="px-8 py-3 bg-white hover:bg-gray-50 text-slate-600 border-2 border-slate-300 rounded-full text-lg font-medium transition-all shadow-md"
                      >
                        Retake Photos
                      </button>
                    </div>
                    
                    <p className="mt-6 text-slate-500 text-sm">
                      Frame compositing is currently only available for Frames 1-6
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Hidden canvas for compositing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  )
}
