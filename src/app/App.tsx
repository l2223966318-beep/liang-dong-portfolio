import { useCallback, useEffect, useRef, useState } from 'react'

import { AppShell } from '../components/AppShell'
import { AigcLab } from '../components/AigcLab'
import { AigcShowcasePage } from '../components/AigcShowcasePage'
import { Capabilities } from '../components/Capabilities'
import { CaseStudyView } from '../components/CaseStudyView'
import { ContactFooter } from '../components/ContactFooter'
import { Hero } from '../components/Hero'
import { Profile } from '../components/Profile'
import { ReportDetailView } from '../components/ReportDetailView'
import { SelectedWork } from '../components/SelectedWork'
import {
  getAigcProject,
  getAigcShowcaseUrl,
  type AigcProject,
} from '../data/aigc'
import { publicPath } from '../data/paths'
import type { Project, Report } from '../data/portfolio'

export function App() {
  const [activeAigcProject, setActiveAigcProject] =
    useState<AigcProject | null>(() => {
      const params = new URLSearchParams(window.location.search)
      return getAigcProject(params.get('showcase'))
    })
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeReport, setActiveReport] = useState<Report | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const overlayHistoryMarker = useRef<string | null>(null)
  const overlaySequence = useRef(0)

  const openAigcShowcase = useCallback((projectId: string) => {
    const project = getAigcProject(projectId)
    if (!project) return

    window.history.pushState(
      { portfolioShowcase: project.id },
      '',
      getAigcShowcaseUrl(project.id),
    )
    setActiveAigcProject(project)
  }, [])

  const closeAigcShowcase = useCallback(() => {
    if (
      activeAigcProject &&
      window.history.state?.portfolioShowcase === activeAigcProject.id
    ) {
      window.history.back()
      return
    }

    window.history.replaceState({}, '', publicPath(''))
    setActiveAigcProject(null)
  }, [activeAigcProject])

  const closeOverlayState = useCallback(() => {
    setActiveProject(null)
    setActiveReport(null)
    window.requestAnimationFrame(() => lastTrigger.current?.focus())
  }, [])

  const closeOverlay = useCallback(() => {
    const marker = overlayHistoryMarker.current

    if (marker && window.history.state?.portfolioOverlay === marker) {
      window.history.back()
      return
    }

    overlayHistoryMarker.current = null
    closeOverlayState()
  }, [closeOverlayState])

  const openOverlay = useCallback(
    (
      type: 'project' | 'report',
      item: Project | Report,
      trigger: HTMLButtonElement,
    ) => {
      const marker = `${type}:${item.id}:${overlaySequence.current += 1}`
      const currentState =
        window.history.state && typeof window.history.state === 'object'
          ? window.history.state
          : {}

      lastTrigger.current = trigger
      overlayHistoryMarker.current = marker
      window.history.pushState(
        { ...currentState, portfolioOverlay: marker },
        '',
        window.location.href,
      )

      if (type === 'project') {
        setActiveReport(null)
        setActiveProject(item as Project)
      } else {
        setActiveProject(null)
        setActiveReport(item as Report)
      }
    },
    [],
  )

  useEffect(() => {
    const closeOnHistoryNavigation = (event: PopStateEvent) => {
      const marker = overlayHistoryMarker.current
      if (!marker || event.state?.portfolioOverlay === marker) return

      overlayHistoryMarker.current = null
      closeOverlayState()
    }

    window.addEventListener('popstate', closeOnHistoryNavigation)
    return () =>
      window.removeEventListener('popstate', closeOnHistoryNavigation)
  }, [closeOverlayState])

  useEffect(() => {
    const syncShowcaseWithLocation = () => {
      const params = new URLSearchParams(window.location.search)
      setActiveAigcProject(getAigcProject(params.get('showcase')))
    }

    window.addEventListener('popstate', syncShowcaseWithLocation)
    return () =>
      window.removeEventListener('popstate', syncShowcaseWithLocation)
  }, [])

  if (activeAigcProject) {
    return (
      <AigcShowcasePage
        project={activeAigcProject}
        onBack={closeAigcShowcase}
      />
    )
  }

  return (
    <AppShell>
      <main className="app">
        <Hero />
        <Profile />
        <SelectedWork
          onOpenProject={(project, trigger) =>
            openOverlay('project', project, trigger)
          }
        />
        <AigcLab onOpen={openAigcShowcase} />
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
