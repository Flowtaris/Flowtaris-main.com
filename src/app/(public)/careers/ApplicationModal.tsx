'use client'

import { useState, useRef, useEffect } from 'react'
import { Career } from '@/types/database'
import { submitApplication } from '@/app/actions/career-actions'
import { X, CheckCircle2, Paperclip } from 'lucide-react'

interface ApplicationModalProps {
  career: Career | null
  onClose: () => void
}

export default function ApplicationModal({ career, onClose }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (career) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [career])

  if (!career) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('career_id', career.id)

    try {
      await submitApplication(formData)
      setIsSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName(null)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#0A1628]/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[600px] bg-[#FAFAFA] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Section */}
        <div className="p-8 pb-6 border-b border-slate-200 relative shrink-0 bg-white">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold text-[#0A1628] mb-2 pr-12">
            Apply for {career.position_name}
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            {career.category}  {career.location}  {career.employment_type}
          </p>
        </div>

        <div className="overflow-y-auto p-8 pt-6 flex-1 custom-scrollbar">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628] mb-3">Application Submitted</h3>
              <p className="text-slate-500">
                Thank you for applying. We have received your application and will review it shortly.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-[#0A1628] text-white rounded-xl hover:bg-[#1a2942] transition-colors font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {/* Requirements Block (Only show if requirements exist) */}
              {career.requirements && (
                <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                    Requirements
                  </h4>
                  <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                    <div className="whitespace-pre-wrap">{career.requirements}</div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E8A020] focus:ring-1 focus:ring-[#E8A020] transition-all text-[15px] shadow-sm"
                    placeholder="Full Name *"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E8A020] focus:ring-1 focus:ring-[#E8A020] transition-all text-[15px] shadow-sm"
                    placeholder="Email *"
                  />
                </div>

                <div>
                  <input 
                    type="tel" 
                    name="phone" 
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E8A020] focus:ring-1 focus:ring-[#E8A020] transition-all text-[15px] shadow-sm"
                    placeholder="Phone Number (optional)"
                  />
                </div>

                <div>
                  <textarea 
                    name="message" 
                    rows={4}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E8A020] focus:ring-1 focus:ring-[#E8A020] transition-all text-[15px] resize-y shadow-sm"
                    placeholder="Why are you a great fit? (optional)"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 pb-4">
                  <div 
                    className="flex items-center gap-2 text-[#0A1628] hover:text-[#E8A020] cursor-pointer transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-5 h-5" />
                    <span className="text-[15px] font-bold">{fileName || 'Attach Resume *'}</span>
                    <input 
                      type="file" 
                      name="resume" 
                      ref={fileInputRef}
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <div className="text-slate-500 text-[14px]">
                    Attachments ({fileName ? '1' : '0'})
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#87CEEB] text-slate-900 font-bold rounded-xl hover:bg-[#6CB4D4] transition-colors disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 23, 42, 0.2);
        }
      `}} />
    </div>
  )
}
