import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { AnimatedStat } from '@/components/ui/AnimatedStat'

const stats = [
  { value: 50,  suffix: '+', label: 'Enterprise Implementations Delivered' },
  { value: 99,  suffix: '%', label: 'Client Retention Rate'                },
  { value: 6,   suffix: '',  label: 'Enterprise Platforms Supported'       },
]

export function StatsRow() {
  return (
    <section className="bg-navy-900 py-16">
      <div className="container-content">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-0
                          divide-y sm:divide-y-0 sm:divide-x divide-navy-800">
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 sm:py-0 sm:px-10 first:pl-0 last:pr-0">
                <AnimatedStat
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  dark
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
