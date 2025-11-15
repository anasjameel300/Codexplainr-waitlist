"use client"
import { motion } from "framer-motion"
import { Twitter } from "lucide-react"

export function StickyFooter() {
  return (
    <footer className="relative w-full mt-24">
      <div
        className="w-full py-12 px-6 sm:px-8 md:px-12"
        style={{ backgroundColor: "#e78a53" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center md:items-start"
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#121113" }}>
                CodExplainr
              </h3>
              <p className="text-sm text-center md:text-left" style={{ color: "rgba(18, 17, 19, 0.7)" }}>
                Understand codebases like never before
              </p>
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <a
                  href="#features"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "#121113" }}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById("features")
                    if (element) {
                      const headerOffset = 120
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerOffset
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "#121113" }}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById("pricing")
                    if (element) {
                      const headerOffset = 120
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerOffset
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "#121113" }}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById("faq")
                    if (element) {
                      const headerOffset = 120
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerOffset
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  FAQ
                </a>
                <a
                  href="/waitlist"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "#121113" }}
                >
                  Join Waitlist
                </a>
              </div>

              {/* Social Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <a
                  href="https://x.com/AnasJameel300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 hover:bg-black/10"
                  style={{ color: "#121113" }}
                  aria-label="Follow on X (Twitter)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 pt-8 border-t border-black/20 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-xs text-center sm:text-left" style={{ color: "rgba(18, 17, 19, 0.6)" }}>
              © {new Date().getFullYear()} CodExplainr. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(18, 17, 19, 0.6)" }}>
              <span>Made with</span>
              <span className="text-red-500">♥</span>
              <span>by</span>
              <a
                href="https://x.com/AnasJameel300"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#121113" }}
              >
                Anas Jameel
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
