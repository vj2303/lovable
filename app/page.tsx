'use client'

import type React from 'react'

import { ThemeToggle } from '@/components/theme-toggle'
import { Github, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProjectList } from './components/project-list'
import { QuickStartForm } from './components/quick-start-form'
import type { Project } from './types'
import { createProject, getProjects } from './utils/project-storage'

export default function ProjectsPage() {
  // Project state
  const [projects, setProjects] = useState<Project[]>([])

  // UI state
  const [inputValue, setInputValue] = useState('')

  // Router
  const router = useRouter()

  // Load projects on initial render
  useEffect(() => {
    const loadedProjects = getProjects()
    setProjects(loadedProjects)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Create a new project immediately
    const newProject = createProject(
      `App: ${inputValue.substring(0, 30)}` // Name from prompt
    )

    // Clear input immediately
    setInputValue('')

    // Navigate to the project page immediately with the prompt as a URL parameter
    router.push(
      `/project/${newProject.id}?initialPrompt=${encodeURIComponent(inputValue)}`
    )
  }

  // Handle selecting a project
  const handleSelectProject = (project: Project) => {
    router.push(`/project/${project.id}`)
  }

  // Handle projects change
  const handleProjectsChange = () => {
    // update projects state
    const loadedProjects = getProjects()
    setProjects(loadedProjects)
  }

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-8">
      <Header />

      <WelcomeAndProjectInfo />

      <QuickStartForm
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
      />

      {!!projects.length && (
        <ProjectList
          projects={projects}
          onSelectProject={handleSelectProject}
          onProjectsChange={handleProjectsChange}
        />
      )}
    </div>
  )
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-3xl">Lovable Clone</h1>
      <ThemeToggle />
    </div>
  )
}

function WelcomeAndProjectInfo() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="space-y-4">
      

          <div className="border-t pt-2">
            <p className="text-muted-foreground">
              A React app with a single <code className='bg-muted p-1 rounded-md'>App.tsx</code> file will be generated based on your prompts.
            </p>

         
          </div>
        </div>
      </div>
    </div>
  )
}
