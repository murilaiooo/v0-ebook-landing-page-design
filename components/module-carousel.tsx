"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModuleCardProps {
  icon: React.ReactNode
  title: string
  description: string
  outcome: string
  isActive: boolean
}

export function ModuleCard({ icon, title, description, outcome, isActive }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl border ${
        isActive ? "border-primary/50 bg-primary/5" : "border-border bg-secondary/30"
      } p-6 shadow-sm transition-all ${isActive ? "shadow-md" : ""} h-full flex flex-col`}
    >
      <div className="mb-4 p-3 inline-block rounded-full bg-primary/10">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border/30">
        <div className="h-5 w-5 text-primary flex items-center justify-center">✓</div>
        <p className="text-sm font-medium">{outcome}</p>
      </div>
    </motion.div>
  )
}

interface ModuleCarouselProps {
  modules: {
    icon: React.ReactNode
    title: string
    description: string
    outcome: string
  }[]
}

export function ModuleCarousel({ modules }: ModuleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [autoplay, setAutoplay] = useState(true)
  const totalModules = modules.length

  // Determine how many cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalModules - visibleCount + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, totalModules, visibleCount])

  const handleNext = useCallback(() => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalModules - visibleCount))
  }, [totalModules, visibleCount])

  const handlePrev = useCallback(() => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }, [])

  const handleDotClick = useCallback(
    (index: number) => {
      setAutoplay(false)
      setCurrentIndex(Math.min(index, totalModules - visibleCount))
    },
    [totalModules, visibleCount],
  )

  return (
    <div className="relative">
      <div className="overflow-hidden px-4">
        <div
          className="flex transition-transform duration-500 gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
        >
          {modules.map((module, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 24) / visibleCount}px)` }}
            >
              <ModuleCard
                icon={module.icon}
                title={module.title}
                description={module.description}
                outcome={module.outcome}
                isActive={index >= currentIndex && index < currentIndex + visibleCount}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background border border-primary/30 shadow-md ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background border border-primary/30 shadow-md ${
          currentIndex >= totalModules - visibleCount ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        onClick={handleNext}
        disabled={currentIndex >= totalModules - visibleCount}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalModules - visibleCount + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-primary/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause/Resume button for module carousel autoplay accessibility */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setAutoplay(prev => !prev)}
          className="text-sm text-muted-foreground underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-2"
          aria-live="polite" // Announce changes to screen readers
        >
          {autoplay ? "Pausar Rolagem Automática" : "Iniciar Rolagem Automática"}
        </button>
      </div>
    </div>
  )
}
