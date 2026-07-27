import { useRef, useState } from 'react'

import { AppShell } from '../components/AppShell'
import { Capabilities } from '../components/Capabilities'
import { CaseStudyView } from '../components/CaseStudyView'
import { ContactFooter } from '../components/ContactFooter'
import { Hero } from '../components/Hero'
import { Profile } from '../components/Profile'
import { ReportDetailView } from '../components/ReportDetailView'
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
        <Profile />
        <SelectedWork
          onOpenProject={(project, trigger) => {
            lastTrigger.current = trigger
            setActiveProject(project)
          }}
          onOpenReport={(report, trigger) => {
            lastTrigger.current = trigger
            setActiveReport(report)
          }}
        />
        <Capabilities />
        <ContactFooter />
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
