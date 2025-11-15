"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, AlertCircle } from 'lucide-react'
import Link from "next/link"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setEmail("")
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      setError("Failed to join waitlist. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {!isSubmitted ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-block bg-gradient-to-r from-[#e78a53] to-[#e78a53]/60 rounded-full px-4 py-2"
              >
                <span className="text-white text-sm font-medium">Be the First to Know</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight"
              >
                Join the Waitlist
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-gray-300"
              >
                Get early access to CodExplainr and transform how you understand code.
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#e78a53] focus:ring-2 focus:ring-[#e78a53]/20 transition-all"
                  disabled={isLoading}
                />
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#e78a53] to-[#e78a53]/80 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#e78a53]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Joining..." : "Join Waitlist"}
              </button>

              <p className="text-center text-gray-400 text-sm">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.form>

            <div className="flex gap-4 pt-4 border-t border-white/10">
              <Link
                href="/"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                Back Home
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-[#e78a53] to-[#e78a53]/60 rounded-full flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Added to Waitlist!</h2>
              <p className="text-gray-300">
                Thanks for joining! We'll notify you as soon as CodExplainr is available.
              </p>
            </div>

            <Link
              href="/"
              className="inline-block px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              Return Home
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
