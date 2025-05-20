"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, AlertTriangle } from "lucide-react"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Clear interval on component unmount
    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ]

  return (
    <div className={`${className}`}>
      {timeLeft.expired ? (
        <div className="flex items-center justify-center gap-2 text-red-500">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-bold">Oferta expirada!</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">OFERTA TERMINA EM:</span>
          </div>
          <div className="flex gap-2 md:gap-4">
            {timeUnits.map((unit, index) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${unit.value}-${unit.label}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-secondary border border-primary/30 rounded-lg w-16 h-16 flex items-center justify-center"
                    >
                      <span className="text-2xl font-bold text-primary">{unit.value.toString().padStart(2, "0")}</span>
                    </motion.div>
                  </AnimatePresence>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                  ></motion.div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
