"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { Suspense, useRef } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      title: "Code Parsing & Analysis",
      description: "Instantly parse any codebase into digestible components, functions, and modules with AI-powered analysis.",
      icon: "📊",
    },
    {
      title: "Natural Language Explanations",
      description: "Get simple English explanations for every part of your code, no jargon, no confusion.",
      icon: "📝",
    },
    {
      title: "Visual Flow Diagrams",
      description: "See how your code works together with interactive flow diagrams that show the complete logic pipeline.",
      icon: "🔄",
    },
    {
      title: "Interview Prep",
      description: "Get AI-generated interview questions, answers, and talking points for your projects.",
      icon: "🎯",
    },
  ]

  return (
    <section id="features" className="text-foreground relative overflow-hidden py-12 sm:py-24 md:py-32">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12"
      >
        <h2
          className={cn(
            "via-foreground mb-8 bg-gradient-to-b from-zinc-800 to-zinc-700 bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]",
            geist.className,
          )}
        >
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-secondary/40 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border-2 p-6 shadow-xl transition-all ease-in-out hover:shadow-lg"
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(231, 138, 83, 0.6)",
                boxShadow: "0 0 30px rgba(231, 138, 83, 0.2)",
              }}
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="text-xl leading-none font-semibold tracking-tight mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
