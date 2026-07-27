import { useRef, useState } from 'react'

import { AigcLab } from '../components/AigcLab'
import { AppShell } from '../components/AppShell'
import { CaseStudyView } from '../components/CaseStudyView'
import { Hero } from '../components/Hero'
import { Manifesto } from '../components/Manifesto'
import { ProfileContact } from '../components/ProfileContact'
import { ReportDetailView } from '../components/ReportDetailView'
import { ResearchIndex } from '../components/ResearchIndex'
import { SelectedWork } from '../components/SelectedWork'
import type { Project, Report } from '../data/portfolio'

export function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeReport, setActiveReport] = useState<Report | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  const closeOverlay = () => {
    setActiveProject(null)
    setActiveReport(null)
    lastTrigger.current?.focus()
  }

  return (
    <AppShell>
      <main className="app">
        <Hero />
        <Manifesto />
        <SelectedWork
          onOpen={(project, trigger) => {
            lastTrigger.current = trigger
            setActiveProject(project)
          }}
        />
        <AigcLab />
        <ResearchIndex
          onOpen={(report, trigger) => {
            lastTrigger.current = trigger
            setActiveReport(report)
          }}
        />
        <ProfileContact />
      </main>
      {activeProject ? (
        <CaseStudyView project={activeProject} onClose={closeOverlay} />
      ) : null}
      {activeReport ? (
        <ReportDetailView report={activeReport} onClose={closeOverlay} />
      ) : null}
    </AppShell>
  )
}
