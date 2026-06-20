"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, ShieldCheck, Zap } from "lucide-react"
import Image from "next/image"

type Message = {
  id: string
  sender: "bot" | "user"
  text: string
  type?: "text" | "options" | "button"
  options?: string[]
}

type UserData = {
  interest: string
  name: string
  email: string
}

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex space-x-1.5 p-4 bg-[#162032] rounded-2xl rounded-tl-none w-16 items-center justify-center border border-blue-500/10 shadow-lg"
  >
    <motion.div
      className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
    />
    <motion.div
      className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
    />
    <motion.div
      className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
    />
  </motion.div>
)

export function TarixChatWidget({ whatsappNumber = "1234567890" }: { whatsappNumber?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({ interest: "", name: "", email: "" })
  const [isTyping, setIsTyping] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [resumeTooltip, setResumeTooltip] = useState(false)
  const [initialScrollY, setInitialScrollY] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-hide initial tooltip after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  // Record initial scroll position when opened
  useEffect(() => {
    if (isOpen) {
      setInitialScrollY(window.scrollY)
    }
  }, [isOpen])

  // Auto-close on scroll with threshold (> 80px) + show resume tooltip if chat in progress
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        // Disable auto-close on scroll for mobile devices 
        // to prevent virtual keyboard popups from closing the chat
        if (window.innerWidth < 768) return

        const diff = Math.abs(window.scrollY - initialScrollY)
        if (diff > 80) {
          setIsOpen(false)
          if (step > 0 && step < 3) {
            setResumeTooltip(true)
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen, step, initialScrollY])

  // Auto-close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        if (step > 0 && step < 3) {
          setResumeTooltip(true)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, step])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setResumeTooltip(false)
      enqueueBotMessages([
        {
          text: "Hey! I'm Tarix, your guide here. Ready to clear up any bottlenecks in your business flow?",
          delay: 500,
        },
        {
          text: "What are you looking to optimize today?",
          type: "options",
          options: ["Set up ERP", "Connect systems", "Custom solutions", "Just browsing"],
          delay: 800,
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const enqueueBotMessages = (
    msgs: { text: string; type?: "text" | "options" | "button"; options?: string[]; delay?: number }[]
  ) => {
    setIsTyping(true)
    let currentDelay = 0

    msgs.forEach((msg, index) => {
      currentDelay += msg.delay || 800
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            sender: "bot",
            text: msg.text,
            type: msg.type || "text",
            options: msg.options,
          },
        ])

        if (index === msgs.length - 1) {
          setIsTyping(false)
        }
      }, currentDelay)
    })
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const input = inputValue.trim()
    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    processNextStep(input)
  }

  const handleOptionClick = (option: string) => {
    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: option }
    setMessages((prev) => [...prev, userMessage])

    setUserData((prev) => ({ ...prev, interest: option }))
    setStep(1)

    enqueueBotMessages([
      {
        text: `Awesome choice! ${option} is our specialty. To get started, what's your name?`,
        delay: 800,
      },
    ])
  }

  const processNextStep = (input: string) => {
    if (step === 1) {
      if (input.length < 2) {
        enqueueBotMessages([
          { text: "That seems a bit short. Could you please provide your full name so I know who I'm talking to?" },
        ])
        return
      }
      setUserData((prev) => ({ ...prev, name: input }))
      setStep(2)
      enqueueBotMessages([
        {
          text: `Great to meet you, ${input}! What's the best email address to send details to?`,
          delay: 800,
        },
      ])
    } else if (step === 2) {
      if (!validateEmail(input)) {
        enqueueBotMessages([
          { text: "Hmm, that email doesn't look quite right. Could you please double-check and try again?", delay: 500 },
        ])
        return
      }
      setUserData((prev) => ({ ...prev, email: input }))
      setStep(3)
      enqueueBotMessages([
        { text: "Got it. You're all set!", delay: 600 },
        {
          text: "Click below to ping our team on WhatsApp for a quick response.",
          type: "button",
          delay: 800,
        },
      ])
    }
  }

  const openWhatsApp = () => {
    const message = `Hi Flowtaris Team!\n\nMy name is ${userData.name}.\nEmail: ${userData.email}\nI'm interested in: ${userData.interest}\n\nI would like to discuss this further.`
    const encodedMessage = encodeURIComponent(message)
    const cleanNumber = whatsappNumber.replace(/\D/g, '')
    const finalNumber = cleanNumber.length === 10 ? '91' + cleanNumber : cleanNumber
    window.open(`https://wa.me/${finalNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(5px)" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mb-4 sm:mb-6 w-[290px] min-[375px]:w-[330px] sm:w-[360px] h-[400px] sm:h-[480px] max-h-[70vh] sm:max-h-[80vh] bg-[#0A0F1C]/95 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.15)] border border-white/10 overflow-hidden flex flex-col relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 rounded-full blur-[80px]"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 bg-white/5 border-b border-white/10 p-4 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center p-[2px] bg-gradient-to-br from-cyan-400 to-blue-600">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                    <Image
                      src="/images/tarix-icon.png"
                      alt="Tarix AI"
                      fill
                      className="object-cover scale-110"
                    />
                  </div>
                  {/* Online dot */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0A0F1C] rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-wide flex items-center gap-2">
                    Tarix <Sparkles className="w-3 h-3 text-cyan-400" />
                  </h3>
                  <p className="text-xs text-blue-200/70 font-medium">Flowtaris AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              className="relative z-10 flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-tr-sm"
                          : "bg-[#162032] text-gray-200 border border-blue-500/10 rounded-tl-sm"
                      }`}
                    >
                      <p>{msg.text}</p>

                      {msg.type === "options" && (
                        <div className="mt-4 flex flex-col gap-2">
                          {msg.options?.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleOptionClick(opt)}
                              className="text-left px-4 py-2.5 text-sm bg-blue-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-white rounded-xl transition-all duration-300 font-medium shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.type === "button" && (
                        <button
                          onClick={openWhatsApp}
                          className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#20bd5a] hover:to-[#178f44] text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:-translate-y-0.5"
                        >
                          <ShieldCheck className="w-5 h-5" />
                          Connect Securely
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="relative z-10 p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    step === 0
                      ? "Select an option..."
                      : step === 3
                      ? "Chat completed."
                      : "Type your response..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={step === 0 || step === 3 || isTyping}
                  className="flex-1 bg-[#0A0F1C]/80 px-4 py-3 text-sm text-white placeholder-gray-500 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || step === 0 || step === 3 || isTyping}
                  className="p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1 opacity-50">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Powered by Flowtaris Intelligence
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button and Tooltip */}
      <div className="relative">
        <AnimatePresence>
          {!isOpen && showTooltip && !resumeTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0A0F1C] text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Chat with Tarix
            </motion.div>
          )}
          {!isOpen && resumeTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0A0F1C] text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => {
                setIsOpen(true)
                setResumeTooltip(false)
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Resume Chat? 💬
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            setIsOpen(!isOpen)
            setShowTooltip(false)
            setResumeTooltip(false)
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-gradient-to-br from-blue-600 to-cyan-500 border-2 border-white/10"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="w-full h-full relative p-[2px] rounded-full overflow-hidden">
              <div className="w-full h-full bg-black rounded-full overflow-hidden relative group">
                 {/* Live floating animation for the icon */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src="/images/tarix-icon.png"
                    alt="Tarix"
                    fill
                    className="object-cover scale-110"
                  />
                </motion.div>
              </div>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  )
}
