'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import { uploadAsset } from '@/app/actions/upload-actions'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = 'Upload Image' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Optional: Add simple client side validation here (e.g. file.size < 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB')
      return
    }

    try {
      setIsUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)

      const url = await uploadAsset(formData)
      onChange(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      
      {value ? (
        <div className="relative group w-full aspect-video md:w-64 md:aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <Image 
            src={value} 
            alt="Uploaded Preview" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <UploadCloud className="w-6 h-6" />
              <span className="text-sm font-medium">Click to upload image</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
      )}
      
      {error && <p className="text-sm text-red-500 mt-2 font-medium">{error}</p>}
    </div>
  )
}
