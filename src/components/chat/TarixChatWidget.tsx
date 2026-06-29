"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, ShieldCheck, Zap, MessageSquare, Link2 } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Service } from "@/types/database"

type Message = {
  id: string
  sender: "bot" | "user"
  text: string
  type?: "text" | "options" | "button" | "service_card"
  options?: string[]
  link?: string
  buttonLabel?: string
}

type UserData = {
  interest: string
  name: string
  email: string
  phone: string
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
  const [step, setStep] = useState("main_menu")
  const [userData, setUserData] = useState<UserData>({ interest: "", name: "", email: "", phone: "" })
  const [isTyping, setIsTyping] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [resumeTooltip, setResumeTooltip] = useState(false)
  const [initialScrollY, setInitialScrollY] = useState(0)
  
  const [servicesData, setServicesData] = useState<Service[]>([])
  const [servicesHeroData, setServicesHeroData] = useState<any[]>([])
  const [faqsData, setFaqsData] = useState<any[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [sRes, hRes, fRes] = await Promise.all([
          supabase.from("services").select("*").order("priority"),
          supabase.from("services_hero").select("*"),
          supabase.from("faqs").select("*").eq("status", "Active").order("priority")
        ])
        if (sRes.data) setServicesData(sRes.data)
        if (hRes.data) setServicesHeroData(hRes.data)
        if (fRes.data) setFaqsData(fRes.data)
      } catch (err) {
        console.error("Failed to load chat data", err)
      }
    }
    loadData()
  }, [])

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
        if (isInputFocused || window.innerWidth < 1024) return
        const diff = Math.abs(window.scrollY - initialScrollY)
        if (diff > 80) {
          setIsOpen(false)
          if (step !== "main_menu" && step !== "completed") {
            setResumeTooltip(true)
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen, step, initialScrollY, isInputFocused])

  // Auto-close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isInputFocused) return
        setIsOpen(false)
        if (step !== "main_menu" && step !== "completed") {
          setResumeTooltip(true)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen, step, isInputFocused])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setResumeTooltip(false)
      enqueueBotMessages([
        { text: "Hi! I'm Tarix 👋\n\nI can help you with:", delay: 400 },
        {
          text: "What would you like to explore today?",
          type: "options",
          options: ["Services", "FAQs", "Implementation", "Support"],
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
    msgs: { text: string; type?: "text" | "options" | "button" | "service_card"; options?: string[]; delay?: number; link?: string; buttonLabel?: string }[]
  ) => {
    setIsTyping(true)
    let currentDelay = 0

    msgs.forEach((msg, index) => {
      currentDelay += msg.delay || 600
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            sender: "bot",
            text: msg.text,
            type: msg.type || "text",
            options: msg.options,
            link: msg.link,
            buttonLabel: msg.buttonLabel,
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
    processNextStep(option, true)
  }

  const processNextStep = (input: string, isOption: boolean = false) => {
    const normInput = input.trim()

    const searchFaqAndRespond = (query: string) => {
      const q = query.toLowerCase()
      if (q.length < 3) return false // Lowered to 3 to support acronyms like "ERP"
      
      // Try exact match first (useful if they click a generated option)
      const exactMatch = faqsData.find(f => f.question.toLowerCase() === q)
      if (exactMatch) {
        setUserData(prev => ({ ...prev, interest: `FAQ Topic: ${exactMatch.question}` }))
        enqueueBotMessages([
          { text: exactMatch.answer },
          { text: "Did this answer your question?", type: "options", options: ["Yes", "No"] }
        ])
        setStep('faq_feedback')
        return true
      }

      // If no exact match, find all partial matches in the questions
      const matchedFaqs = faqsData.filter(f => f.question.toLowerCase().includes(q))
      
      if (matchedFaqs.length === 1) {
        const matchedFaq = matchedFaqs[0]
        setUserData(prev => ({ ...prev, interest: `FAQ Topic: ${matchedFaq.question}` }))
        enqueueBotMessages([
          { text: matchedFaq.answer },
          { text: "Did this answer your question?", type: "options", options: ["Yes", "No"] }
        ])
        setStep('faq_feedback')
        return true
      } else if (matchedFaqs.length > 1) {
        enqueueBotMessages([
          { text: `I found a few questions related to "${query}". Which one would you like to know?` },
          { type: "options", options: matchedFaqs.slice(0, 5).map(f => f.question) }
        ])
        setStep('faqs_list')
        return true
      }
      
      return false
    }

    // --- MAIN MENU ---
    if (step === 'main_menu') {
      if (normInput === 'Services' || normInput.toLowerCase().includes('service')) {
        setStep('services_list')
        if (servicesData.length > 0) {
          enqueueBotMessages([
            { text: "Here are our core services:" },
            { text: "Select a service to learn more:", type: 'options', options: servicesData.map(s => s.name) }
          ])
        } else {
          enqueueBotMessages([{ text: "We offer ERP Strategy Consulting, Integrations, and more. What specific service are you looking for?" }])
        }
      } else if (normInput === 'FAQs' || normInput.toLowerCase().includes('faq')) {
        setStep('faqs_list')
        if (faqsData.length > 0) {
          enqueueBotMessages([
            { text: "You can type your question to search, or pick a common topic below:", type: 'options', options: faqsData.map(f => f.question) }
          ])
        } else {
          enqueueBotMessages([{ text: "Our FAQ system is currently updating. Can I connect you with our team instead?", type: 'options', options: ['Yes', 'No'] }])
          setStep('ask_contact')
        }
      } else if (normInput === 'Implementation') {
        setUserData(prev => ({ ...prev, interest: 'Implementation' }))
        enqueueBotMessages([
          { text: "Our implementation process ensures zero disruption, full data fidelity, and seamless user adoption. We utilize a phased rollout approach for maximum stability." },
          { text: "Would you like our team to contact you?", type: 'options', options: ['Yes', 'No'] }
        ])
        setStep('ask_contact')
      } else if (normInput === 'Support') {
        setUserData(prev => ({ ...prev, interest: 'Support' }))
        enqueueBotMessages([
          { text: "We provide comprehensive 24/7 Managed ERP Support, system monitoring, and continuous optimization services." },
          { text: "Would you like our team to contact you?", type: 'options', options: ['Yes', 'No'] }
        ])
        setStep('ask_contact')
      } else {
        if (!searchFaqAndRespond(normInput)) {
          enqueueBotMessages([{ text: "I'm still learning! Please choose one of the options below:", type: 'options', options: ["Services", "FAQs", "Implementation", "Support"] }])
        }
      }
    }

    // --- SERVICES LIST ---
    else if (step === 'services_list') {
      const s = servicesData.find(x => x.name.toLowerCase() === normInput.toLowerCase()) ||
                servicesData.find(x => x.name.toLowerCase().includes(normInput.toLowerCase()))
      
      if (s) {
        setUserData(prev => ({ ...prev, interest: s.name }))
        const hero = servicesHeroData.find(h => h.service_id === s.id)
        const desc = hero?.normal_description || hero?.hero_description || `Our ${s.name} service helps businesses streamline operations and maximize ROI.`
        
        enqueueBotMessages([
          { 
            text: `**${s.name}**\n\n${desc}`, 
            type: "service_card", 
            link: `/services/${s.slug}`,
            buttonLabel: "Know More"
          },
          { text: "Would you like to know more about:", type: "options", options: ["Implementation", "Support"] }
        ])
        setStep('impl_support')
      } else {
        if (!searchFaqAndRespond(normInput)) {
          enqueueBotMessages([{ text: "I couldn't find that exact service. Please choose from the list.", type: "options", options: servicesData.map(s => s.name) }])
        }
      }
    }

    // --- IMPLEMENTATION / SUPPORT SELECTION ---
    else if (step === 'impl_support') {
      if (normInput === 'Implementation') {
        enqueueBotMessages([
          { text: `Our implementation process for ${userData.interest || 'this service'} involves deep discovery, tailored architecture, rigorous testing, and a guided go-live phase.` },
          { text: "Would you like our team to contact you?", type: 'options', options: ['Yes', 'No'] }
        ])
        setStep('ask_contact')
      } else if (normInput === 'Support') {
        enqueueBotMessages([
          { text: `We offer dedicated post-go-live support, proactive maintenance, and continuous feature enhancements for ${userData.interest || 'this service'}.` },
          { text: "Would you like our team to contact you?", type: 'options', options: ['Yes', 'No'] }
        ])
        setStep('ask_contact')
      } else {
        if (!searchFaqAndRespond(normInput)) {
          enqueueBotMessages([{ text: "Would you like to know more about:", type: "options", options: ["Implementation", "Support"] }])
        }
      }
    }

    // --- ASK CONTACT ---
    else if (step === 'ask_contact') {
      if (normInput === 'Yes') {
        enqueueBotMessages([{ text: "Great! Let's get a few details. First, what is your name?" }])
        setStep('lead_name')
      } else {
        enqueueBotMessages([{ text: "No problem! You can continue browsing or select another option.", type: "options", options: ["Services", "FAQs", "Support"] }])
        setStep('main_menu')
      }
    }

    // --- LEAD COLLECTION ---
    else if (step === 'lead_name') {
      if (normInput.length < 2) {
        enqueueBotMessages([{ text: "Please enter your full name." }])
        return
      }
      setUserData(prev => ({ ...prev, name: normInput }))
      enqueueBotMessages([{ text: `Thanks, ${normInput}. What is your mobile number?` }])
      setStep('lead_phone')
    }
    else if (step === 'lead_phone') {
      if (normInput.length < 5) {
        enqueueBotMessages([{ text: "Please enter a valid mobile number." }])
        return
      }
      setUserData(prev => ({ ...prev, phone: normInput }))
      enqueueBotMessages([{ text: `Got it. Lastly, what is your email address?` }])
      setStep('lead_email')
    }
    else if (step === 'lead_email') {
      if (!validateEmail(normInput)) {
        enqueueBotMessages([{ text: "That email doesn't look valid. Please check and try again." }])
        return
      }
      setUserData(prev => ({ ...prev, email: normInput }))
      enqueueBotMessages([
        { text: "All set! Click the button below to send these details to our team on WhatsApp.", type: "button", buttonLabel: "Connect via WhatsApp" }
      ])
      setStep('completed')
    }

    // --- FAQS ---
    else if (step === 'faqs_list') {
      if (!searchFaqAndRespond(normInput)) {
        enqueueBotMessages([
          { text: "I couldn't find an exact match in our FAQs. Would you like to contact our team for a specific answer?", type: "options", options: ["Yes", "No"] }
        ])
        setStep('ask_contact')
      }
    }
    
    // --- FAQ FEEDBACK ---
    else if (step === 'faq_feedback') {
      if (normInput === 'Yes') {
        enqueueBotMessages([{ text: "Awesome! Let me know if you need anything else.", type: "options", options: ["Services", "FAQs", "Support"] }])
        setStep('main_menu')
      } else {
        enqueueBotMessages([{ text: "I apologize. Would you like to:", type: "options", options: ["Contact Support", "Talk to Sales"] }])
        setStep('contact_options')
      }
    }

    // --- CONTACT OPTIONS ---
    else if (step === 'contact_options') {
      setUserData(prev => ({ ...prev, interest: normInput })) 
      enqueueBotMessages([{ text: "We'd be happy to help. What is your name?" }])
      setStep('lead_name')
    }
  }

  const openWhatsApp = () => {
    const message = `Hello,\n\nI'm interested in your services.\n\nName: ${userData.name}\nPhone: ${userData.phone}\nEmail: ${userData.email}\nService Interested: ${userData.interest}\n\nPlease contact me.`
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
            className="mb-4 sm:mb-6 w-[300px] min-[375px]:w-[340px] sm:w-[380px] h-[450px] sm:h-[520px] max-h-[75vh] sm:max-h-[80vh] bg-[#0A0F1C]/95 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.15)] border border-white/10 overflow-hidden flex flex-col relative"
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
            <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
                      
                      {msg.type === "service_card" ? (
                        <div className="flex flex-col">
                          {msg.text.split('\n').map((line, i) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return <h4 key={i} className="text-cyan-400 font-bold text-base mb-1">{line.replace(/\*\*/g, '')}</h4>
                            }
                            return <span key={i} className="block mt-1">{line}</span>
                          })}
                          {msg.link && (
                            <a href={msg.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-semibold text-xs uppercase tracking-wider transition-colors border border-cyan-500/30 bg-cyan-500/10 rounded-lg px-3 py-2 w-fit">
                              <Link2 className="w-3.5 h-3.5" /> {msg.buttonLabel || "Know More"}
                            </a>
                          )}
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}

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
                          {msg.buttonLabel || "Connect Securely"}
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
                    step === "completed"
                      ? "Chat completed."
                      : "Type your response..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  disabled={step === "completed" || isTyping}
                  className="flex-1 bg-[#0A0F1C]/80 px-4 py-3 text-sm text-white placeholder-gray-500 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || step === "completed" || isTyping}
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

      {/* Floating Pill Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          setShowTooltip(false)
          setResumeTooltip(false)
        }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3.5 bg-white border-2 sm:border-[3px] border-sky-400 rounded-full shadow-[0_10px_40px_rgba(14,165,233,0.3)] transition-all z-50 ${isOpen ? 'pr-4 sm:pr-6' : ''}`}
        style={{ fontFamily: 'var(--font-sora)' }}
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" strokeWidth={2.5} />
        ) : (
          <>
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" strokeWidth={2.5} />
            <span className="text-slate-900 font-bold text-sm sm:text-lg tracking-tight pt-0.5">
              {resumeTooltip ? "Resume Chat" : "Chat with Tarix"}
            </span>
          </>
        )}
      </motion.button>
    </div>
  )
}
