import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title   = searchParams.get('title')   ?? 'Enterprise ERP & Integration Consulting'
  const label   = searchParams.get('label')   ?? 'Flowtaris'
  const type    = searchParams.get('type')    ?? 'page'

  return new ImageResponse(
    (
      <div
        style={{
          width:      '100%',
          height:     '100%',
          display:    'flex',
          flexDirection: 'column',
          backgroundColor: '#060D1A',
          padding:    '64px',
          position:   'relative',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: 'radial-gradient(circle, rgba(232,160,32,0.08) 1px, transparent 1px)',
            backgroundSize:  '32px 32px',
          }}
        />

        {/* Gold accent top */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '3px',
          background: 'linear-gradient(90deg, transparent, #E8A020, transparent)',
        }} />

        {/* Logo mark */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '12px',
          marginBottom:    'auto',
        }}>
          <div style={{
            width:           '44px',
            height:          '44px',
            borderRadius:    '10px',
            backgroundColor: '#0F2040',
            border:          '1.5px solid rgba(232,160,32,0.5)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '22px',
            fontWeight:      '700',
            color:           '#E8A020',
          }}>
            F
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '18px', letterSpacing: '0.1em' }}>
              FLOWTARIS
            </span>
            <span style={{ color: 'rgba(232,160,32,0.7)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              The Science of Business Flow
            </span>
          </div>
        </div>

        {/* Label */}
        <div style={{
          display:     'flex',
          alignItems:  'center',
          gap:         '10px',
          marginBottom: '16px',
        }}>
          <div style={{ width: '24px', height: '1px', backgroundColor: '#E8A020' }} />
          <span style={{
            color:         '#E8A020',
            fontSize:      '11px',
            fontWeight:    '500',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            {label}
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontSize:     title.length > 60 ? '36px' : '44px',
          fontWeight:   '700',
          color:        'white',
          lineHeight:   '1.15',
          letterSpacing: '-0.01em',
          maxWidth:     '900px',
        }}>
          {title}
        </div>

        {/* Bottom bar */}
        <div style={{
          display:       'flex',
          alignItems:    'center',
          justifyContent: 'space-between',
          marginTop:     '48px',
          paddingTop:    '24px',
          borderTop:     '1px solid rgba(232,160,32,0.15)',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            flowtaris.com
          </span>
          <div style={{
            backgroundColor: '#E8A020',
            color:           'white',
            fontSize:        '11px',
            fontWeight:      '600',
            padding:         '6px 14px',
            borderRadius:    '6px',
            letterSpacing:   '0.06em',
            textTransform:   'uppercase',
          }}>
            {type === 'blog' ? 'Insight' : type === 'case-study' ? 'Case Study' : 'Enterprise ERP'}
          </div>
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
    }
  )
}
