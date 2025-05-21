"use client"

import { motion } from "framer-motion"
import { Award, BookOpen, CheckCircle, ExternalLink, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ExpertProfileProps {
  className?: string
}

export function ExpertProfile({ className = "" }: ExpertProfileProps) {
  return (
    <div className={`${className}`}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 to-primary/30 opacity-70 blur-lg"></div>
          <div className="relative rounded-xl overflow-hidden border-2 border-primary/50">
            <Image
              src="https://i.postimg.cc/43Ymzx1g/ricardo-almeida1.png"
              width={600}
              height={600}
              alt="Ricardo Almeida - Especialista em Renda Passiva"
              className="w-full aspect-square object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/30">
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-primary fill-primary" />
                  ))}
              </div>
              <div className="text-sm">Especialista certificado em investimentos</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Ricardo Almeida</h2>
            <p className="text-xl text-primary font-medium">Especialista em Renda Passiva & Investimentos</p>
          </div>

          <p className="text-muted-foreground">
            Com mais de 10 anos de experiência no mercado financeiro, Ricardo Almeida transformou sua própria vida
            financeira e já ajudou mais de 15.000 pessoas a construírem fontes de renda passiva sustentáveis.
          </p>

          <div className="space-y-3">
            {[
              "Certificado pela CVM como Consultor de Valores Mobiliários",
              "Autor de 3 livros best-sellers sobre investimentos",
              "Palestrante em mais de 50 eventos sobre liberdade financeira",
              "Criador do método 8x8 de diversificação de renda passiva",
            ].map((credential, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-2"
              >
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p>{credential}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>Site Oficial</span>
            </Button>
          </div>

          <blockquote className="border-l-4 border-primary pl-4 italic">
            "Minha missão é democratizar o acesso ao conhecimento financeiro e ajudar pessoas comuns a conquistarem a
            verdadeira liberdade financeira através de fontes de renda passiva."
          </blockquote>
        </motion.div>
      </div>
    </div>
  )
}
