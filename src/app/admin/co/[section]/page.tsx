import { notFound } from 'next/navigation'
import HeroEditor from '../HeroEditor'
import JudgmentEditor from '../JudgmentEditor'
import JudgmentSlugsEditor from '../JudgmentSlugsEditor'
import LeverageEditor from '../LeverageEditor'
import PrinciplesEditor from '../PrinciplesEditor'
import ResourcesEditor from '../ResourcesEditor'
import TrustEditor from '../TrustEditor'
import WorkdayEditor from '../WorkdayEditor'
import Link from 'next/link'

export default async function CoSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = await params;
  const { section } = resolvedParams;

  let EditorComponent;
  switch (section) {
    case 'hero': EditorComponent = <HeroEditor site="co" />; break;
    case 'judgment': EditorComponent = <JudgmentEditor site="co" />; break;
    case 'judgment-slugs': EditorComponent = <JudgmentSlugsEditor site="co" />; break;
    case 'leverage': EditorComponent = <LeverageEditor site="co" />; break;
    case 'principles': EditorComponent = <PrinciplesEditor site="co" />; break;
    case 'resources': EditorComponent = <ResourcesEditor site="co" />; break;
    case 'trust': EditorComponent = <TrustEditor site="co" />; break;
    case 'workday': EditorComponent = <WorkdayEditor site="co" />; break;
    default: return notFound();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", padding: "40px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <Link href="/admin/co" style={{ fontSize: 13, color: "#475569", textDecoration: "none", fontWeight: 500 }}>
            ? Back to Trust Dashboard
          </Link>
        </div>
        {EditorComponent}
      </div>
    </div>
  )
}
