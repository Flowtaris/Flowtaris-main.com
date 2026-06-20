'use client'

import dynamic from 'next/dynamic'

const TarixChatWidget = dynamic(
  () => import('./TarixChatWidget').then((mod) => mod.TarixChatWidget),
  { ssr: false }
)

export function ChatWrapper({ whatsappNumber }: { whatsappNumber?: string }) {
  return <TarixChatWidget whatsappNumber={whatsappNumber} />
}
