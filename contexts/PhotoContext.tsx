"use client"

import React, { createContext, useContext, useState } from "react"

interface PhotoContextType {
  capturedPhotos: string[]
  setCapturedPhotos: (photos: string[]) => void
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined)

export function PhotoProvider({ children }: { children: React.ReactNode }) {
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])

  return <PhotoContext.Provider value={{ capturedPhotos, setCapturedPhotos }}>{children}</PhotoContext.Provider>
}

export function usePhoto() {
  const context = useContext(PhotoContext)
  if (context === undefined) {
    throw new Error("usePhoto must be used within a PhotoProvider")
  }
  return context
}
