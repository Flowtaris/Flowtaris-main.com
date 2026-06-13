'use client'

import { useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/Toast'

const STATUSES = ['new', 'contacted', 'qualified', 'proposal_sent', 'closed_won', 'closed_lost']

export function LeadStatusManager({
  leadId,
  currentStatus,
  userId,
}: {
  leadId: string
  currentStatus: string
  userId: string
}) {
  const [status, setStatus] = useState(currentStatus)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  const updateStatus = (newStatus: string) => {
    startTransition(async () => {
      const supabase = createClient()

      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId)

      if (error) {
        toast('error', 'Failed to update status', error.message)
        return
      }

      // Log the activity
      await supabase.from('lead_activity').insert({
        lead_id:      leadId,
        action:       'status_change',
        note:         `Status changed from "${status}" to "${newStatus}"`,
        performed_by: userId,
      })

      // Audit log
      await supabase.from('audit_logs').insert({
        user_id:      userId,
        action:       'lead.status_change',
        target_table: 'leads',
        target_id:    leadId,
        after_state:  { status: newStatus },
        before_state: { status },
      })

      setStatus(newStatus)
      toast('success', 'Lead status updated')
      router.refresh()
    })
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      disabled={isPending}
      className="input max-w-[200px] text-sm"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.replace('_', ' ').toUpperCase()}
        </option>
      ))}
    </select>
  )
}
