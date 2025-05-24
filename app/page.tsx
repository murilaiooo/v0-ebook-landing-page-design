"use client"

// Note: Removed dangerouslySetInnerHTML for testimonials and FAQs to prevent XSS.
// Content is now rendered as plain text. If HTML formatting is required,
// a robust HTML sanitization library (e.g., DOMPurify) should be implemented.
import React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronLeft, // Added
  ChevronRight, // Added
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
// import { sanitizeInput } from "@/lib/security" // Removed sanitizeInput import
import { ModuleCarousel } from "@/components/module-carousel"

// Animation variants
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

// Animated Section component
const AnimatedSection = ({ children, className, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.6,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [displayedTestimonials, setDisplayedTestimonials] = useState([])
  const allTestimonials = [
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
  ]

  useEffect(() => {
    // Função para embaralhar o array
    const shuffleArray = (array) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    // Seleciona 3 depoimentos aleatórios
    const randomTestimonials = shuffleArray(allTestimonials).slice(0, 3)
    setDisplayedTestimonials(randomTestimonials)
  }, [])

  // useEffect for autoplay was here - removed to disable autoplay.
  // Navigation is now manual via dot indicators.

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? displayedTestimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === displayedTestimonials.length - 1 ? 0 : prev + 1
    );
  };

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
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='1' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          <div className="container relative mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center mb-8"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4"
              >
                Método Comprovado • Resultados Reais
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight"
              >
                Construa <span className="text-primary">8 Fontes de Renda Passiva</span> Que Trabalham Para Você 24h Por
                Dia
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Descubra como pessoas comuns estão gerando R$2.500 a R$4.500 por mês com métodos simples e acessíveis,
                mesmo começando do zero.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-8 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="md:col-span-3 space-y-6"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-2 text-primary mb-2">
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                  <span className="text-sm text-muted-foreground ml-1">(237 avaliações verificadas)</span>
                </motion.div>

                <motion.div variants={staggerContainer} className="space-y-4">
                  {[
                    "Comece com apenas R$100-R$200 de investimento inicial",
                    "Passo a passo detalhado para iniciantes sem experiência prévia",
                    "8 métodos comprovados + plano de ação de 30/60/90 dias",
                    "Exemplos reais de pessoas comuns que implementaram as estratégias",
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-primary/20 p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-lg">{item}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-8">
                  <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Preço Normal</p>
                    <p className="text-2xl font-bold line-through text-muted-foreground">R$98,00</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex-1 flex flex-col items-center justify-center p-4 rounded-lg border-2 border-primary bg-primary/10 relative"
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      OFERTA LIMITADA
                    </div>
                    <p className="text-sm text-primary">Hoje Apenas</p>
                    <p className="text-3xl font-bold text-primary">R$9,90</p>
                  </motion.div>
                  {/* Add a smaller version of the countdown timer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-full mt-4"
                  >
                    <CountdownTimer
                      targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
                      className="scale-75 transform origin-top"
                    />
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 animate-pulse"
                  >
                    <a href="https://payments.clickmax.io/rRoJNHDAJj" className="flex items-center justify-center gap-2">
                      <span>QUERO GERAR RENDA PASSIVA</span>
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Garantia de 7 Dias</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Acesso Imediato</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="md:col-span-2 relative"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 to-primary/30 opacity-70 blur-lg"></div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden border-2 border-primary/50"
                >
                  <Image
                    src="https://i.postimg.cc/L6BJB7Kx/compri-capa-site20250521-0801-Adi-o-de-Cor-remix-01jvsnrvqhevhtac2mggh7gfst-1.webp"
                    width={400}
                    height={600}
                    alt="Capa do E-book Guia Definitivo do Lucro Automático"
                    className="w-full object-cover"
                    priority
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute top-0 right-0 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-bl-lg"
                  >
                    90% OFF
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex justify-center mt-12"
            >
              <ArrowDown className="h-10 w-10 text-primary animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* Social Proof Banner */}
        <AnimatedSection className="bg-secondary py-6">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            >
              <motion.div variants={fadeInUp} className="flex flex-col items-center">
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-primary"
                >
                  +1500
                </motion.p>
                <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col items-center">
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground">Métodos Comprovados</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col items-center">
                <p className="text-3xl font-bold text-primary">R$100</p>
                <p className="text-sm text-muted-foreground">Investimento Mínimo</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col items-center">
                <p className="text-3xl font-bold text-primary">7 dias</p>
                <p className="text-sm text-muted-foreground">Garantia de Satisfação</p>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Problem/Solution Section */}
        <AnimatedSection className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div variants={staggerContainer} className="mx-auto max-w-3xl text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
                Você Está Cansado de...
              </motion.h2>

              <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-4">
                {[
                  "Depender exclusivamente do seu salário mensal?",
                  "Trabalhar horas intermináveis para outras pessoas?",
                  "Ver seu dinheiro parado sem gerar retorno?",
                  "Não ter tempo para aproveitar a vida com sua família?",
                  "Sentir que está preso na 'corrida dos ratos'?",
                  "Ter medo de perder seu emprego e ficar sem renda?",
                  "Não conseguir realizar seus sonhos por falta de dinheiro?",
                  "Ver outras pessoas conquistando liberdade financeira enquanto você fica para trás?",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-2 text-left p-3 rounded-lg border border-border bg-secondary/30"
                  >
                    <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p>{item}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Existe Uma <span className="text-primary">Solução Comprovada</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  O <span className="font-bold text-primary">Guia Definitivo do Lucro Automático</span> foi criado para
                  transformar pessoas comuns em geradores de renda passiva, mesmo sem experiência prévia ou grandes
                  investimentos.
                </p>
              </motion.div>

              <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-4">
                {[
                  "Construa múltiplas fontes de renda que trabalham para você 24h/dia",
                  "Comece com apenas R$100-R$200 de investimento inicial",
                  "Siga um plano de ação estruturado de 30/60/90 dias",
                  "Aprenda estratégias testadas e aprovadas por centenas de pessoas",
                  "Diversifique seus investimentos para reduzir riscos",
                  "Automatize seus ganhos para ter mais tempo livre",
                  "Conquiste a verdadeira liberdade financeira",
                  "Tenha a segurança de nunca mais depender apenas do seu salário",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-2 text-left p-3 rounded-lg border border-primary/30 bg-primary/5"
                  >
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Expert Section */}
        <AnimatedSection id="especialista" className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Conheça o Especialista</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Aprenda com quem já trilhou o caminho da liberdade financeira e ajudou milhares de pessoas
              </p>
            </motion.div>

            <ExpertProfile className="max-w-5xl mx-auto" />

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 text-center"
            >
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                <a href="https://payments.clickmax.io/rRoJNHDAJj" className="flex items-center gap-2">
                  <span>Quero Aprender com o Especialista</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Testimonials Carousel */}
        <AnimatedSection id="depoimentos" className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Histórias Reais de Sucesso</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pessoas comuns que transformaram suas vidas financeiras com nosso guia
              </p>
            </motion.div>

            <div className="relative overflow-hidden">
              {/* Previous Testimonial Button */}
              {displayedTestimonials.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 border-primary/30 shadow-md rounded-full disabled:opacity-50"
                  onClick={handlePrevTestimonial}
                  aria-label="Depoimento Anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-6 md:grid-cols-3"
                >
                  {displayedTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                      className={`rounded-xl border border-primary/20 bg-background p-6 shadow-lg relative mt-6 ${
                        index !== activeTestimonial ? "md:opacity-70 md:scale-95" : ""
                      }`}
                    >
                      <div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap z-10 min-w-max shadow-md"
                        style={{ width: "auto", maxWidth: "90%" }}
                      >
                        {testimonial.highlight}
                      </div>
                      <div className="flex items-center gap-2 text-primary mb-4 mt-4">
                        {Array(testimonial.stars)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary" />
                          ))}
                      </div>
                      <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/20 p-2 text-primary font-bold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.occupation}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center mt-6 gap-2">
                {displayedTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${index === activeTestimonial ? "bg-primary" : "bg-primary/30"}`}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Testimonial Button */}
              {displayedTestimonials.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 border-primary/30 shadow-md rounded-full disabled:opacity-50"
                  onClick={handleNextTestimonial}
                  aria-label="Próximo Depoimento"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 text-center"
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="https://payments.clickmax.io/rRoJNHDAJj" className="flex items-center gap-2">
                  <span>Quero Resultados Como Esses</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* What You'll Learn Section */}
        <AnimatedSection id="capitulos" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Você Vai Aprender</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                8 métodos comprovados de renda passiva + bônus exclusivo com plano de ação
              </p>
            </motion.div>

            <ModuleCarousel
              modules={[
                {
                  title: "Investimentos em Dividendos e FIIs",
                  description: "Comece a receber renda mensal com investimentos a partir de R$100.",
                  icon: <BookText className="h-10 w-10 text-primary" />,
                  outcome: "Carteira gerando dividendos mensais",
                },
                {
                  title: "Imóveis para Aluguel",
                  description: "Maximize retornos com propriedades físicas e digitais sem complicações.",
                  icon: <Building className="h-10 w-10 text-primary" />,
                  outcome: "Renda passiva imobiliária otimizada",
                },
                {
                  title: "Royalties",
                  description: "Crie uma vez, receba para sempre com eBooks, músicas e designs.",
                  icon: <Music className="h-10 w-10 text-primary" />,
                  outcome: "Fluxo contínuo de royalties",
                },
                {
                  title: "Infoprodutos",
                  description: "Transforme seu conhecimento em produtos digitais que vendem 24/7.",
                  icon: <Video className="h-10 w-10 text-primary" />,
                  outcome: "Sistema de vendas automatizado",
                },
                {
                  title: "Marketing de Afiliados",
                  description: "Ganhe comissões promovendo produtos em que você acredita.",
                  icon: <Users className="h-10 w-10 text-primary" />,
                  outcome: "Comissões recorrentes mensais",
                },
                {
                  title: "Canais Monetizados",
                  description: "Crie conteúdo que gera renda enquanto você dorme.",
                  icon: <Youtube className="h-10 w-10 text-primary" />,
                  outcome: "Audiência engajada e monetizada",
                },
                {
                  title: "Plataformas de Renda Automática",
                  description: "Utilize plataformas prontas para criar fluxos de receita consistentes.",
                  icon: <Newspaper className="h-10 w-10 text-primary" />,
                  outcome: "Múltiplos canais de receita",
                },
                {
                  title: "Comunidades Pagas",
                  description: "Monetize seu conhecimento com grupos exclusivos e recorrentes.",
                  icon: <MessageSquare className="h-10 w-10 text-primary" />,
                  outcome: "Comunidade lucrativa e escalável",
                },
                {
                  title: "BÔNUS: Ecossistema Completo",
                  description: "Integre todas as fontes com plano de ação prático de 30/60/90 dias.",
                  icon: <Star className="h-10 w-10 text-primary" />,
                  outcome: "Liberdade financeira acelerada",
                },
              ]}
            />

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 text-center"
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="https://payments.clickmax.io/rRoJNHDAJj" className="flex items-center gap-2">
                  <span>Quero Dominar Essas Estratégias</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Key Benefits Section */}
        <AnimatedSection className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Por Que Este Guia É <span className="text-primary">Diferente</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Desenvolvido para transformar iniciantes em geradores de renda passiva
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Passo a Passo Detalhado",
                  description:
                    "Instruções claras para iniciantes, sem necessidade de formação prévia em finanças ou empreendedorismo.",
                  icon: <Lightbulb className="h-12 w-12 text-primary" />,
                },
                {
                  title: "Baixo Investimento Inicial",
                  description:
                    "Estratégias que podem ser iniciadas com apenas R$100-R$200, acessíveis para quem está começando.",
                  icon: <DollarSign className="h-12 w-12 text-primary" />,
                },
                {
                  title: "Exemplos Reais",
                  description:
                    "Casos de estudo de Mariana, Carla, Lucas e Ana, pessoas comuns que implementaram estas estratégias.",
                  icon: <Users className="h-12 w-12 text-primary" />,
                },
                {
                  title: "Diversificação de Estratégias",
                  description:
                    "Combinação de ativos financeiros, imobiliários e digitais para reduzir riscos e maximizar ganhos.",
                  icon: <TrendingUp className="h-12 w-12 text-primary" />,
                },
                {
                  title: "Ferramentas Recomendadas",
                  description:
                    "Avaliação detalhada de plataformas, custos, taxas e prazos de retorno para cada estratégia.",
                  icon: <Zap className="h-12 w-12 text-primary" />,
                },
                {
                  title: "Plano de Ação Estruturado",
                  description:
                    "Cronograma de 30/60/90 dias para implementação, com disciplina de estudo e monitoramento contínuo.",
                  icon: <Award className="h-12 w-12 text-primary" />,
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-background"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-4 p-4 rounded-full bg-primary/10"
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Target Audience */}
        <AnimatedSection className="py-16">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Para Quem É Este Guia?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Se você se identifica com algum destes perfis, este guia foi feito para você:
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Iniciantes em Finanças",
                  description:
                    "Pessoas sem formação prévia, mas com acesso a corretoras brasileiras (Clear, XP, NuInvest) e disposição para aprender.",
                  icon: <BookOpen className="h-10 w-10 text-primary" />,
                  ideal: true,
                },
                {
                  title: "Profissionais Assalariados",
                  description:
                    "Gerentes de projetos, secretárias, engenheiros que buscam renda extra e liberdade financeira para sair da 'corrida dos ratos'.",
                  icon: <Users className="h-10 w-10 text-primary" />,
                  ideal: true,
                },
                {
                  title: "Criadores de Conteúdo",
                  description:
                    "Nutricionistas, fotógrafos, infoprodutores interessados em monetizar habilidades via royalties, infoprodutos e afiliados.",
                  icon: <Video className="h-10 w-10 text-primary" />,
                  ideal: true,
                },
              ].map((audience, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`rounded-xl border p-6 shadow-sm transition-all hover:shadow-md ${
                    audience.ideal ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30"
                  }`}
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-4 flex justify-center"
                  >
                    <div className="p-3 rounded-full bg-primary/10">{audience.icon}</div>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-center">{audience.title}</h3>
                  <p className="text-muted-foreground text-center">{audience.description}</p>
                  {audience.ideal && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="mt-4 text-center"
                    >
                      <span className="inline-block bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full">
                        Ideal para você
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 text-center"
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="https://payments.clickmax.io/rRoJNHDAJj" className="flex items-center gap-2">
                  <span>Quero Começar Agora</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Comparison Table */}
        <AnimatedSection className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Compare e Decida</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Veja como sua vida pode mudar com o Guia Definitivo do Lucro Automático
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-border"
            >
              <div className="grid grid-cols-3">
                <div className="p-4 bg-background border-b border-r border-border">
                  <p className="font-medium">Características</p>
                </div>
                <div className="p-4 bg-background border-b border-r border-border">
                  <p className="font-medium text-muted-foreground">Sem o Guia</p>
                </div>
                <div className="p-4 bg-primary/10 border-b border-border">
                  <p className="font-medium text-primary">Com o Guia</p>
                </div>

                {[
                  {
                    feature: "Fontes de Renda",
                    without: "Dependência de salário único",
                    with: "Múltiplas fontes de renda passiva",
                  },
                  {
                    feature: "Tempo Livre",
                    without: "Preso a horários fixos de trabalho",
                    with: "Liberdade para gerenciar seu tempo",
                  },
                  {
                    feature: "Conhecimento Financeiro",
                    without: "Limitado e sem direcionamento",
                    with: "Estratégias práticas e testadas",
                  },
                  {
                    feature: "Potencial de Ganhos",
                    without: "Limitado ao seu salário",
                    with: "Ilimitado e escalável",
                  },
                  {
                    feature: "Segurança Financeira",
                    without: "Vulnerável a demissões e crises",
                    with: "Protegido por múltiplas fontes de renda",
                  },
                  {
                    feature: "Plano de Ação",
                    without: "Tentativa e erro, sem direção",
                    with: "Estruturado em 30/60/90 dias",
                  },
                ].map((row, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 bg-background border-b border-r border-border"
                    >
                      <p>{row.feature}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 bg-background border-b border-r border-border"
                    >
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-500" />
                        <p className="text-sm text-muted-foreground">{row.without}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className="p-4 bg-primary/10 border-b border-border"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <p className="text-sm">{row.with}</p>
                      </div>
                    </motion.div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Guarantee Section */}
        <AnimatedSection className="py-16">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-xl border border-primary/30 bg-primary/5 p-8 relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-primary/20 rounded-full blur-xl"
                ></motion.div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex-shrink-0"
                    >
                      <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                        <ShieldCheck className="h-16 w-16 text-primary" />
                      </div>
                    </motion.div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">Garantia Incondicional de 7 Dias</h2>
                      <p className="text-muted-foreground mb-4">
                        Se por qualquer motivo você não ficar satisfeito com o conteúdo do Guia Definitivo do Lucro
                        Automático, basta enviar um e-mail para nossa equipe dentro de 7 dias após a compra e
                        devolveremos 100% do seu dinheiro, sem perguntas.
                      </p>
                      <p className="font-medium">
                        Você não tem nada a perder e uma vida de liberdade financeira a ganhar.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection id="comprar" className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary">
          <div className="container mx-auto px-4">
            <motion.div variants={staggerContainer} className="max-w-3xl mx-auto text-center">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
                Comece Sua Jornada Para a Liberdade Financeira Hoje
              </motion.h2>

              {/* Add the CountdownTimer here */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <CountdownTimer
                  targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
                  className="p-4 rounded-xl border border-primary/30 bg-primary/5 inline-block mx-auto"
                />
              </motion.div>

              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
                Não perca mais tempo. Junte-se a centenas de pessoas que já transformaram suas vidas financeiras com o
                Guia Definitivo do Lucro Automático.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-background rounded-xl p-6 md:p-8 shadow-xl border border-primary/30"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-2">Guia Definitivo do Lucro Automático</h3>
                    <ul className="space-y-2">
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5 text-primary" />
                        <span>8 métodos comprovados de renda passiva</span>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5 text-primary" />
                        <span>Plano de ação de 30/60/90 dias</span>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5 text-primary" />
                        <span>Exemplos reais e estudos de caso</span>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5 text-primary" />
                        <span>Acesso imediato após o pagamento</span>
                      </motion.li>
                    </ul>
                  </div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center md:text-right"
                  >
                    <div className="text-sm text-muted-foreground mb-1">
                      De <span className="line-through">R$98,00</span> por apenas
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">R$9,90</div>
                    <div className="text-sm text-muted-foreground">Pagamento único, sem mensalidades</div>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {/* Pagamento via PIX */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary"
                  >
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-2">
                      <Wallet className="h-5 w-5" />
                      Pagamento via PIX (Recomendado)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Acesso imediato após confirmação do pagamento
                    </p>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="https://payments.clickmax.io/rRoJNHDAJj"
                        passHref
                      >
                        <Button
                          asChild
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg animate-pulse"
                        >
                          <a>COMPRAR AGORA COM PIX</a>
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Pagamento com Cartão de Crédito */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-secondary rounded-lg p-4 border-l-4 border-muted"
                  >
                    <h3 className="font-bold flex items-center gap-2 mb-2">
                      <CreditCard className="h-5 w-5" />
                      Cartão de Crédito
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Parcelamento em até 12x (sujeito a juros)
                    </p>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="https://payments.clickmax.io/rRoJNHDAJj"
                        passHref
                      >
                        <Button
                          asChild
                          variant="outline"
                          className="w-full h-14 text-lg"
                        >
                          <a>COMPRAR COM CARTÃO</a>
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>


                <motion.div
                  variants={fadeInUp}
                  className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>Pagamento 100% Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Garantia de 7 Dias</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download Imediato</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Oferta por Tempo Limitado</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection id="faq" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tire suas dúvidas sobre o Guia Definitivo do Lucro Automático
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "Preciso ter conhecimento prévio em investimentos?",
                  answer:
                    "Não! O guia foi desenvolvido para iniciantes e inclui explicações detalhadas passo a passo, desde como abrir uma conta em corretora até estratégias mais avançadas. Não é necessário ter conhecimento prévio em investimentos ou negócios online.",
                },
                {
                  question: "Quanto capital inicial é necessário?",
                  answer:
                    "Você pode começar com valores entre R$100 e R$200, especialmente para os capítulos sobre FIIs e investimentos em dividendos. O guia inclui opções para todos os orçamentos e explica como escalar a partir de um capital pequeno.",
                },
                {
                  question: "As estratégias funcionam para o mercado brasileiro?",
                  answer:
                    "Sim! Todo o material, exemplos e plataformas citadas utilizam valores em reais e referências a mercados brasileiros, como corretoras Clear, XP e NuInvest, além de plataformas como Hotmart que são populares no Brasil.",
                },
                {
                  question: "Quanto tempo leva para ver resultados?",
                  answer:
                    "O guia inclui um plano de ação estruturado de 30/60/90 dias. Alguns métodos, como dividendos e FIIs, começam a gerar resultados mensalmente. Outros, como infoprodutos e marketing de afiliados, podem gerar resultados mais rápidos, dependendo da sua implementação.",
                },
                {
                  question: "O que acontece após a compra?",
                  answer:
                    "Após a confirmação do pagamento, você receberá imediatamente um e-mail com as instruções de acesso ao material digital. O download estará disponível instantaneamente.",
                },
                {
                  question: "Existe garantia de resultados?",
                  answer:
                    "Oferecemos uma garantia de satisfação de 7 dias. Se você não ficar satisfeito com o conteúdo, pode solicitar reembolso total dentro deste período, sem questionamentos.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01 }}
                  className="rounded-lg border border-border"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                      {faq.question}
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        className="group-open:rotate-180"
                      >
                        <ChevronDown className="h-5 w-5 transition-transform" />
                      </motion.div>
                    </summary>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 pt-0 text-muted-foreground"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  </details>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">Ainda tem dúvidas? Entre em contato com nossa equipe:</p>
              <motion.p whileHover={{ scale: 1.05 }} className="text-primary font-medium">
                suportelucroautomatico@gmail.com
              </motion.p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Final CTA */}
        <AnimatedSection className="py-12 md:py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold mb-6">
              Não Deixe Para Amanhã o Que Pode Mudar Sua Vida Hoje
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto mb-8">
              De R$98,00 por apenas R$9,90. Oferta por tempo limitado!
            </motion.p>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg"
              >
                <a href="https://payments.clickmax.io/rRoJNHDAJj" className="flex items-center gap-2">
                  <span>GARANTIR MEU ACESSO AGORA</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            <motion.p variants={fadeInUp} className="mt-6 text-sm text-muted-foreground">
              Ao comprar, você concorda com nossos termos de uso e política de privacidade.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-[#1a1a1e] text-foreground py-8"
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
                  <Wallet className="h-6 w-6" />
                  <span>Lucro Automático</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Transformando vidas através da educação financeira e métodos de renda passiva.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Links Rápidos</h3>
                <ul className="space-y-2 text-sm">
                  <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link href="#capitulos" className="text-muted-foreground hover:text-foreground">
                      Capítulos
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link href="#depoimentos" className="text-muted-foreground hover:text-foreground">
                      Depoimentos
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link href="#faq" className="text-muted-foreground hover:text-foreground">
                      Perguntas Frequentes
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link href="https://payments.clickmax.io/rRoJNHDAJj" className="text-muted-foreground hover:text-foreground">
                      Comprar Agora
                    </Link>
                  </motion.li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Contato</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>suportelucroautomatico@gmail.com</li>
                  <li>Atendimento: Seg-Sex, 9h-18h</li>
                </ul>
              </div>
              <div>
                {/* // TODO: Replace javascript:void(0); with actual links for legal documents. */}
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link href="javascript:void(0);" className="text-muted-foreground hover:text-foreground">
                      Termos de Uso
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link href="javascript:void(0);" className="text-muted-foreground hover:text-foreground">
                      Política de Privacidade
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <Link href="javascript:void(0);" className="text-muted-foreground hover:text-foreground">
                      Política de Reembolso
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground"
            >
              <p>&copy; {new Date().getFullYear()} Lucro Automático. Todos os direitos reservados.</p>
              <p className="mt-2">
                Este site não é afiliado a nenhuma plataforma de pagamento. Pix e cartões de crédito são métodos de
                pagamento.
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </main>
    </div>
  )
}
