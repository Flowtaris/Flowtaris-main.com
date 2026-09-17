import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.SUPABASE_URL_NET || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY_NET || '';

export async function GET() {
  try {
    let dataFromDb = null;

    if (supabaseUrl && supabaseKey) {
      const client = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await client.from('page_content').select('*').eq('id', 'net-cms').single();
      if (!error && data && data.content) {
        dataFromDb = data.content;
      }
    }

    if (dataFromDb) {
      return NextResponse.json(dataFromDb);
    }

    // Fallback: use hardcoded default if DB is empty or credentials missing
    const fallbackData = {
      header: {
        logoText: "Flowtaris",
        logoSubText: "",
        logoTagline: "Accountability Engine",
        navLinks: [
          { href: "/integration-observatory", label: "Observatory" },
          { href: "/delivery-standards", label: "Standards" },
          { href: "/roi-ledger", label: "ROI Ledger" },
          { href: "/compliance-vault", label: "Compliance" }
        ],
        statusChip: "All Systems Nominal",
        ctaText: "Get Started",
        ctaLink: "https://flowtaris.com/contact"
      },
      hero: {
        h1Line1: "Raw Data",
        h1Line2: "Zero Spin.",
        h1Line3: "Real Results.",
        bodyText: "Live telemetry from Flowtaris enterprise integrations — no promises, no marketing. Only deterministic numbers pulled straight from production.",
        stats: [
          { val: "99.99%", lbl: "Uptime SLA" },
          { val: "42ms", lbl: "P99 Latency" },
          { val: "0", lbl: "Data Loss" }
        ],
        ctaPrimaryText: "Explore Telemetry",
        ctaPrimaryLink: "#telemetry",
        ctaSecondaryText: "View Architecture",
        ctaSecondaryLink: "/architecture"
      },
      footer: {
        platformLinks: [
          { href: "/integration-observatory", label: "Observatory" },
          { href: "/delivery-standards", label: "Standards" },
          { href: "/roi-ledger", label: "ROI Ledger" },
          { href: "/compliance-vault", label: "Compliance Vault" },
          { label: "xxx", href: "/contact" }
        ],
        companyLinks: [
          { href: "https://flowtaris.com/about", label: "About Us" },
          { href: "https://flowtaris.com/careers", label: "Careers" },
          { href: "https://flowtaris.com/blog", label: "Engineering Blog" }
        ],
        ecosystemLinks: [
          { href: "https://flowtaris.com", label: "flowtaris.com" },
          { href: "https://flowtaris.ai", label: "flowtaris.ai" },
          { href: "https://flowtaris.co", label: "flowtaris.co" }
        ],
        contactBtnText: "Consult an Architect",
        contactBtnLink: "https://flowtaris.com/contact"
      },
      performance: {
        tagline: "// live_metrics.query()",
        title: "Deterministic Performance",
        description: "Extracted directly from CI/CD pipeline telemetry. Not marketing claims. Real numbers from real production systems.",
        payloadSuccessRate: 99.99,
        payloadSuccessRateLabel: "Payload Success Rate",
        payloadSuccessRateDesc: "30-Day Rolling Window",
        metrics: [
          { label: "Deployment Frequency", value: 14, unit: "/ day", desc: "Microservice artifacts merged to main and shipped to production daily." },
          { label: "Lead Time", value: 4.2, unit: "hrs", desc: "From initial git commit to code running in production." },
          { label: "Change Failure Rate", value: 0.01, unit: "%", desc: "Deployments requiring immediate rollback or hotfix." },
          { label: "Mean Time To Restore", value: 12, unit: "mins", desc: "P1/P2 incident duration from alert to full restoration." }
        ]
      },
      ctaSection: {
        tagline: "Ready to Build",
        title: "Stop Guessing.<br />Start Engineering.",
        description: "Whether you need SAP-NetSuite integration, real-time Kafka pipelines, or legacy modernization into event-driven architecture, Flowtaris delivers with public accountability.",
        primaryBtnText: "Consult an Architect →",
        primaryBtnLink: "https://flowtaris.com/contact",
        secondaryBtnText: "Explore Observatory",
        secondaryBtnLink: "/integration-observatory"
      },
      standardSection: {
        tagline: "The Flowtaris Standard",
        title: "Engineering Over Marketing.",
        description: "Over 70% of enterprise digital transformations fail because they are built by system integrators who write scripts, not engineers who build distributed systems.",
        cards: [
          {
            iconId: "shield",
            title: "Strict Schema Validation",
            description: "Every payload is validated against a JSON Schema.",
            codeHtml: "..."
          },
          {
            iconId: "refresh",
            title: "Idempotent Processors",
            description: "Retries never produce duplicates.",
            codeHtml: "..."
          },
          {
            iconId: "lightning",
            title: "Automated Circuit Breakers",
            description: "If error rate exceeds 5% in 60 seconds, the circuit trips.",
            codeHtml: "..."
          }
        ]
      },
      transparencySection: {
        tagline: "Operational Transparency",
        title: "Real Dashboards.<br />Real Data.",
        descPara1: "Every metric is sourced from live Supabase tables...",
        descPara2: "We believe the most powerful sales tool is public accountability.",
        stats: [
          { value: "847", label: "Integrations Deployed" },
          { value: "23", label: "Enterprise Clients" },
          { value: "4.7M", label: "Payloads / Month" },
          { value: "12", label: "ERP Platforms" }
        ],
        images: {
          main: "/control-room.jpg",
          sub1: "/dashboard.jpg",
          sub2: "/roi-chart.jpg"
        }
      },
      faqSection: {
        tagline: "Technical Knowledge Base",
        title: "Engineering FAQ",
        faqs: [
          { question: "How does Flowtaris handle API rate limits?", answer: "Token bucket algorithms with exponential backoff on all outbound clients." },
          { question: "What is the Accountability Engine?", answer: "A public ledger of technical competence." },
          { question: "What happens when an ERP goes offline?", answer: "Kafka-backed middleware absorbs backpressure." },
          { question: "How is data integrity guaranteed?", answer: "JSON Schema validation at ingress." }
        ]
      },
      complianceVault: {
        hero: {
          badge: "Enterprise Compliance Framework",
          titleLine1: "Security is an ",
          titleAccent: "Engineering",
          titleLine2: " Standard.",
          description: "Compliance isn't a legal checklist—it is the mathematical foundation of accountability."
        },
        philosophy: {
          title: "Zero-Trust is a Baseline. Accountability is the Goal.",
          paragraphs: ["At Flowtaris, we believe that integrating mission-critical enterprise systems..."]
        },
        policies: [],
        faqs: [],
        telemetry: {
          title: "Live Audit Telemetry Stream",
          logs: []
        }
      },
      roiLedger: {
        hero: {
          badge: "Financial Engineering",
          titleLine1: "Integration is a",
          titleAccent: "Wealth",
          titleLine2: " Engine.",
          description: "Stop viewing enterprise integration as a capital sink."
        },
        philosophy: {
          title: "Predictable Opex. Zero Technical Debt.",
          paragraphs: []
        },
        facts: [],
        faqs: []
      },
      deliveryStandards: {
        hero: {
          badge: "Delivery SLA Guarantee",
          titleLine1: "Zero Scope Creep. ",
          titleAccent: "Absolute",
          titleLine2: " Enforcement.",
          description: "Enterprise software delivery is broken by scope creep."
        },
        manifesto: {
          title: "The Enforcement Pipeline.",
          paragraphs: []
        },
        nodes: [],
        faqs: []
      },
      observatory: {
        hero: {
          badge: "Telemetry & Tracing",
          titleLine1: "The Absolute ",
          titleAccent: "End of",
          titleLine2: " Black Boxes.",
          description: "Legacy Enterprise Service Buses (ESBs) fail because they hide data mutations."
        },
        gridNodes: [],
        faqs: [],
        architecture: {
          title: "The Mechanics of Absolute Visibility",
          paragraphs: []
        }
      }
    };
    return NextResponse.json(fallbackData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read CMS data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing credentials for .net' }, { status: 500 });
    }

    const client = createClient(supabaseUrl, supabaseKey);
    const { error } = await client.from('page_content').upsert({
      id: 'net-cms',
      content: content,
      updated_at: new Date().toISOString()
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save CMS data' }, { status: 500 });
  }
}
