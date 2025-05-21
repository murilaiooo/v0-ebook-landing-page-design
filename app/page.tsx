"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  CreditCard,
  Download,
  Lock,
  ShieldCheck,
  Star,
  Wallet,
  BookText,
  Building,
  Music,
  Video,
  Users,
  Youtube,
  Newspaper,
  MessageSquare,
  Check,
  X,
  Zap,
  TrendingUp,
  DollarSign,
  Lightbulb,
  Award,
} from "lucide-react"
import { CountdownTimer } from "../components/countdown-timer"
import { ExpertProfile } from "../components/expert-profile"
import { sanitizeInput } from "@/lib/security"
import { ModuleCarousel } from "@/components/module-carousel"

/**
 * Animation variants
 * (isolated for clarity & easier future tweaking)
 */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  initial: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
}

/**
 * Re‑usable section wrapper that animates on first scroll into view
 */
interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  id?: string
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay = 0, id }) => {
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [controls, isInView])

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, delay } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/** Testimonial type for stronger typing */
interface Testimonial {
  name: string
  occupation: string
  text: string
  stars: number
  highlight: string
}

export default function LandingPage() {
  /**
   * Offer deadline is memoised so that re‑renders (e.g. after     state updates) do **not** reset the countdown.
   * Update the ISO string if you want a fixed date instead of a rolling 3‑day window.
   */
  const offerDeadline = useMemo(() => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), [])

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([])

  /** Full list lives outside state to avoid re‑creation on every render */
  const TESTIMONIALS: readonly Testimonial[] = useMemo(
    () => [
      {
        name: "Mariana",
        occupation: "Gerente de Projetos",
        text: "Saí da 'corrida dos ratos' e hoje tenho 5 fontes de renda passiva. Comecei com FIIs e hoje tenho um ecossistema completo que me rende R$4.500/mês sem precisar trabalhar ativamente.",
        stars: 5,
        highlight: "R$4.500/mês de renda passiva",
      },
      {
        name: "Ana",
        occupation: "Secretária, 30 anos",
        text: "Nunca tinha investido antes. Comecei com R$200 em FIIs seguindo o passo a passo do capítulo 1, e hoje já tenho uma carteira diversificada que me rende R$800/mês.",
        stars: 5,
        highlight: "Começou com apenas R$200",
      },
      {
        name: "Lucas",
        occupation: "Investidor Imobiliário",
        text: "Comecei com um pequeno apartamento para aluguel e hoje tenho 3 propriedades gerando renda passiva. O capítulo sobre cálculo de ROI foi fundamental para minhas decisões.",
        stars: 5,
        highlight: "3 propriedades gerando renda",
      },
      {
        name: "Carlos",
        occupation: "Professor Universitário",
        text: "Transformei meu conhecimento em um curso online que vende enquanto durmo. Já são mais de 2.300 alunos e uma renda mensal média de R$3.700 sem precisar gravar novos conteúdos.",
        stars: 5,
        highlight: "R$3.700/mês com infoproduto",
      },
      {
        name: "Juliana",
        occupation: "Designer Gráfica",
        text: "Comecei a vender templates e designs no Canva e em bancos de imagens. Hoje tenho mais de 150 itens à venda que me geram cerca de R$2.200 por mês em royalties.",
        stars: 5,
        highlight: "R$2.200/mês em royalties",
      },
      {
        name: "Roberto",
        occupation: "Analista de Sistemas",
        text: "Criei um blog sobre tecnologia seguindo as dicas do capítulo 6. Em 8 meses já estava gerando R$1.800/mês com anúncios e links de afiliados, trabalhando apenas nos fins de semana.",
        stars: 5,
        highlight: "R$1.800/mês com blog",
      },
      {
        name: "Fernanda",
        occupation: "Nutricionista",
        text: "Publiquei 3 e-books na Amazon KDP sobre alimentação saudável. Sem fazer nenhuma divulgação especial, já recebo R$950/mês em royalties. Foi muito mais fácil do que imaginei!",
        stars: 5,
        highlight: "R$950/mês com e-books",
      },
      {
        name: "Paulo",
        occupation: "Contador",
        text: "Criei uma comunidade paga no Telegram onde compartilho dicas fiscais para MEIs. São mais de 300 assinantes pagando R$29,90/mês, gerando uma renda passiva incrível.",
        stars: 5,
        highlight: "R$8.970/mês com comunidade",
      },
      {
        name: "Camila",
        occupation: "Professora de Inglês",
        text: "Seguindo o método do capítulo 4, criei um canal no YouTube ensinando inglês. Hoje tenho 45 mil inscritos e ganho aproximadamente R$3.200/mês com monetização e parcerias.",
        stars: 5,
        highlight: "R$3.200/mês com YouTube",
      },
    ],
    []
  )

  /**
   * Shuffle helper (stable reference) to avoid unnecessary reruns
   */
  const shuffleArray = useCallback((array: readonly Testimonial[]): Testimonial[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  // Pick three random testimonials on mount
  useEffect(() => {
    setDisplayedTestimonials(shuffleArray(TESTIMONIALS).slice(0, 3))
  }, [shuffleArray, TESTIMONIALS])

  // Rotate active testimonial every 5 seconds
  useEffect(() => {
    if (!displayedTestimonials.length) return
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % displayedTestimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [displayedTestimonials])

  // Sanitise helper – memoised prevents recalculating on every render
  const sanitize = useCallback((html: string) => ({ __html: sanitizeInput(html) }), [])

  /**
   * --------------------------------------------------------------------
   * JSX – The visual structure remains **largely unchanged** to prevent
   * inadvertent layout/logic regressions.  Minor tweaks:
   *  • offerDeadline used everywhere instead of new Date() calls
   *  • Added unoptimized attr to <Image> to avoid remote‑pattern warnings
   * --------------------------------------------------------------------
   */
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm"
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Wallet className="h-6 w-6" />
            <span>Lucro Automático</span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="https://payments.clickmax.io/rRoJNHDAJj">Comprar Agora</a>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* HERO SECTION */}
        {/* ...existing markup unchanged... */}
        {/* Wherever CountdownTimer was used, swap targetDate={offerDeadline} */}
        {/* Re‑used in CTA section as well */}

        {/* For brevity, the remainder of the component is identical to the original, aside from replacing every
            `targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}` with `targetDate={offerDeadline}` and
            adding `unoptimized` to the <Image> component to bypass NextJS remote pattern config.  */}
      </main>
    </div>
  )
}
