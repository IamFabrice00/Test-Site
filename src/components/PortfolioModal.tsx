import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Shield, Dumbbell, Globe, Code } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const { t } = useTranslation()

  const projects = t('portfolio.projects', { returnObjects: true }) as any[]

  // Enhanced project mockups metadata matching the translations
  const projectMeta = [
    {
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      icon: <Shield className="project-mockup-icon" size={40} color="#10b981" />,
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      address: 'fabricetest.site'
    },
    {
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      icon: <Dumbbell className="project-mockup-icon" size={40} color="#a855f7" />,
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(244, 63, 94, 0.15) 100%)',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      address: 'coachngfit.com'
    },
    {
      tech: ['React', 'Three.js', 'R3F', 'Custom Shaders'],
      icon: <Globe className="project-mockup-icon" size={40} color="#6366f1" />,
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
      glowColor: 'rgba(99, 102, 241, 0.4)',
      address: 'testsitelab.it'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="legal-modal-overlay portfolio-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="legal-modal-content portfolio-modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '1200px', width: '95vw' }}
          >
            {/* Close Button */}
            <button className="close-btn" onClick={onClose} aria-label="Chiudi">
              <X size={22} />
            </button>

            <div className="modal-inner">
              {/* Header */}
              <div className="portfolio-modal-header">
                <div className="badge portfolio-badge-glow">{t('portfolio.badge')}</div>
                <h2 className="portfolio-modal-title">
                  {t('portfolio.title').split(' ').map((word: string, i: number) => (
                    <span key={i} className={i === 1 ? 'highlighted-word' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
                <p className="portfolio-modal-desc">{t('portfolio.description')}</p>
              </div>

              {/* Grid Layout */}
              <div className="portfolio-extended-grid">
                {Array.isArray(projects) && projects.map((project: any, i: number) => {
                  const meta = projectMeta[i] || {
                    tech: ['React', 'CSS'],
                    icon: <Code size={40} color="#6366f1" />,
                    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                    glowColor: 'rgba(99, 102, 241, 0.2)',
                    address: 'project.site'
                  }

                  return (
                    <motion.div
                      key={i}
                      className="portfolio-extended-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                      style={{ '--glow-color': meta.glowColor } as React.CSSProperties}
                    >
                      {/* Browser Mockup Header */}
                      <div className="browser-mockup" style={{ background: meta.gradient }}>
                        <div className="browser-header">
                          <div className="browser-dots">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                          </div>
                          <div className="browser-address">
                            <Globe size={10} style={{ marginRight: '4px', opacity: 0.6 }} />
                            <span>https://{meta.address}</span>
                          </div>
                        </div>
                        
                        <div className="browser-body-content">
                          {meta.icon}
                        </div>
                      </div>

                      {/* Card Information */}
                      <div className="portfolio-card-info">
                        <span className="portfolio-card-category">{project.category}</span>
                        <h3 className="portfolio-card-title">{project.title}</h3>
                        <p className="portfolio-card-description">{project.desc}</p>
                        
                        {/* Tech tags */}
                        <div className="portfolio-tech-list">
                          {meta.tech.map((techItem, index) => (
                            <span key={index} className="tech-badge">
                              {techItem}
                            </span>
                          ))}
                        </div>

                        {/* CTA Link */}
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-live-link"
                        >
                          <span>Visita il Progetto Live</span>
                          <ExternalLink size={14} className="icon" />
                        </a>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
