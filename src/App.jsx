import { useState } from 'react'
import { 
  Mail, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Briefcase
} from 'lucide-react'

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

export default function App() {
  const projects = [
    {
      title: "Project Alpha",
      description: "A high-performance modern web application built with React, Vite, and Tailwind CSS.",
      tags: ["React", "Tailwind CSS", "Vite"],
      link: "#",
      github: "#"
    },
    {
      title: "Project Beta",
      description: "Interactive real-time dashboard featuring data visualization and responsive layouts.",
      tags: ["React", "Analytics", "API"],
      link: "#",
      github: "#"
    },
    {
      title: "Project Gamma",
      description: "Full-stack cloud-native solution with authentication, state management, and optimized workflows.",
      tags: ["Node.js", "React", "PostgreSQL"],
      link: "#",
      github: "#"
    }
  ]

  const skills = [
    "JavaScript (ES6+)", "React.js", "TypeScript", "Tailwind CSS",
    "Node.js", "Git & GitHub", "REST APIs", "UI/UX Design",
    "Performance Optimization", "Responsive Design"
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-lg text-white hover:text-indigo-400 transition-colors">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Portfolio</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <a 
            href="#contact" 
            className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-36 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for new opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Building modern, high-impact <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">digital experiences</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Welcome to your new portfolio. Customize this starter with your own story, projects, skills, and branding.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-600/20"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 border-t border-slate-900 bg-slate-900/40">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Layers className="w-6 h-6 text-indigo-400" />
              Skills & Tech Stack
            </h2>
            <p className="text-slate-400 text-sm">Technologies and tools you specialize in</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200 text-sm font-medium hover:border-indigo-500/50 hover:bg-slate-800 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-400" />
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm">A collection of things I've built</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-800/60">
                  <a href={project.link} className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                  <a href={project.github} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-16 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Feel free to reach out for collaborations, project inquiries, or just a friendly chat.
          </p>

          <div className="flex items-center justify-center gap-6 text-slate-400">
            <a href="mailto:example@domain.com" className="hover:text-indigo-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-slate-600 pt-6">
            © {new Date().getFullYear()} Portfolio. Built with Vite, React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
