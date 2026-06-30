'use client'

import { useState, useRef } from 'react'
import { submitApplication } from '@/app/actions/career-actions'
import { CheckCircle2, Paperclip } from 'lucide-react'

export default function JobApplicationForm({ careerId }: { careerId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!fileName) {
      setError('Please attach your resume before submitting.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('career_id', careerId)

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

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-8 flex flex-col items-center text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h3 className="text-2xl font-normal mb-2 tracking-wide uppercase">Application Submitted</h3>
        <p className="text-emerald-700 font-light">
          Thank you for applying. We have received your application and will review it shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-[700px]">
      <h2 className="text-[22px] font-normal tracking-widest text-[#1A1A1A] mb-8 uppercase" style={{ fontFamily: 'var(--font-sora)' }}>
        APPLY NOW
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 text-sm font-medium">
            {error}
          </div>
        )}

        <div>
          <input 
            type="text" 
            name="name" 
            required
            className="w-full px-5 py-4 bg-[#F4F4F4] text-slate-800 placeholder-slate-500 focus:outline-none focus:bg-[#EAEAEA] transition-colors font-light text-[15px]"
            placeholder="Name"
          />
        </div>

        <div>
          <input 
            type="tel" 
            name="phone" 
            className="w-full px-5 py-4 bg-[#F4F4F4] text-slate-800 placeholder-slate-500 focus:outline-none focus:bg-[#EAEAEA] transition-colors font-light text-[15px]"
            placeholder="Phone"
          />
        </div>

        <div>
          <input 
            type="email" 
            name="email" 
            required
            className="w-full px-5 py-4 bg-[#F4F4F4] text-slate-800 placeholder-slate-500 focus:outline-none focus:bg-[#EAEAEA] transition-colors font-light text-[15px]"
            placeholder="Email*"
          />
        </div>

        <div>
          <textarea 
            name="message" 
            rows={5}
            className="w-full px-5 py-4 bg-[#F4F4F4] text-slate-800 placeholder-slate-500 focus:outline-none focus:bg-[#EAEAEA] transition-colors font-light text-[15px] resize-y"
            placeholder="Message"
          />
        </div>

        <div className="flex items-center justify-between pt-2 pb-6">
          <div 
            className="flex items-center gap-2 text-[#60A5FA] hover:text-[#3B82F6] cursor-pointer transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5" />
            <span className="text-[15px] font-normal">{fileName || 'Attach Resume'}</span>
            <input 
              type="file" 
              name="resume" 
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="text-slate-500 text-[14px] font-light">
            Attachments ({fileName ? '1' : '0'})
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-[#89CFF0] text-black font-bold text-[14px] uppercase tracking-widest hover:bg-[#74C0FC] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
        </button>
      </form>
    </div>
  )
}
