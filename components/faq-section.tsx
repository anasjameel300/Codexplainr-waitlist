"use client"

import { useState } from "react"
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What is CodExplainr?",
      answer:
        "CodExplainr is an AI-powered platform that transforms complex code into simple, understandable explanations. It breaks down codebases into functions, generates visual flow diagrams, and provides interview-ready insights—all designed to help you truly understand how code works.",
    },
    {
      question: "How does CodExplainr work?",
      answer:
        "Upload any code file or GitHub repository, and CodExplainr will parse it, analyze each component, and generate explanations in plain English. You'll also get visual flow diagrams showing how different parts of the code work together, plus AI-generated interview questions based on your code.",
    },
    {
      question: "Who should use CodExplainr?",
      answer:
        "CodExplainr is perfect for students learning to code, job seekers preparing for technical interviews, bootcamp graduates, fresh developers upskilling, and anyone who wants to deeply understand how code works instead of just memorizing it.",
    },
    {
      question: "Can I use CodExplainr for multiple projects?",
      answer:
        "Yes! The Free tier allows you to parse up to 5 codebases per month, while the Pro tier offers unlimited uploads. You can analyze as many projects as you want to build a comprehensive understanding of different coding patterns and techniques.",
    },
    {
      question: "Is my code private and secure?",
      answer:
        "Absolutely. We take privacy seriously. Your code is encrypted, processed securely, and never shared or used for training without your explicit consent. You maintain complete control over your data and can delete it anytime.",
    },
    {
      question: "Can CodExplainr help with interview preparation?",
      answer:
        "Yes! Pro users get access to AI-generated interview questions and answers based on their uploaded code. This helps you practice explaining your projects, understand potential follow-ups, and build confidence for technical interviews.",
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden pb-12 pt-24">
      {/* Background blur effects */}
      <div className="bg-primary/20 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-primary/20 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      <div className="z-10 container mx-auto px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="border-primary/40 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 uppercase">
            <span>✶</span>
            <span className="text-sm">Faqs</span>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-6 max-w-xl text-center text-4xl font-medium md:text-[54px] md:leading-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Questions? We've got{" "}
          <span className="bg-gradient-to-b from-foreground via-rose-200 to-primary bg-clip-text text-transparent">
            answers
          </span>
        </motion.h2>

        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="from-secondary/40 to-secondary/10 rounded-2xl border border-white/10 bg-gradient-to-b p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:border-white/20 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
            >
              <div className="flex items-start justify-between">
                <h3 className="m-0 font-medium pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=""
                >
                  {openItems.includes(index) ? (
                    <Minus className="text-primary flex-shrink-0 transition duration-300" size={24} />
                  ) : (
                    <Plus className="text-primary flex-shrink-0 transition duration-300" size={24} />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    className="mt-4 text-muted-foreground leading-relaxed overflow-hidden"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
