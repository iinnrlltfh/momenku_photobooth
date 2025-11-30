"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface FrameContextType {
  selectedFrameId: number | null
  setSelectedFrameId: (id: number | null) => void
}

const FrameContext = createContext<FrameContextType | undefined>(undefined)

export function FrameProvider({ children }: { children: React.ReactNode }) {
  const [selectedFrameId, setSelectedFrameId] = useState<number | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedFrameId")
    if (saved) {
      setSelectedFrameId(Number(saved))
    }
  }, [])

  // Save to localStorage when changed
  useEffect(() => {
    if (selectedFrameId !== null) {
      localStorage.setItem("selectedFrameId", String(selectedFrameId))
    }
  }, [selectedFrameId])

  return <FrameContext.Provider value={{ selectedFrameId, setSelectedFrameId }}>{children}</FrameContext.Provider>
}

export function useFrame() {
  const context = useContext(FrameContext)
  if (context === undefined) {
    throw new Error("useFrame must be used within a FrameProvider")
  }
  return context
}
