import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, User, FolderGit2, Rss, ArrowRight, MapPin, Mail, DollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenServices: () => void
  onOpenPortfolio: () => void
  onOpenContact: () => void
}

export default function SideMenu({ isOpen, onClose, onOpenServices, onOpenPortfolio, onOpenContact }: SideMenuProps) {
  const { t, i18n } = useTranslation()
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)
  
  const currentLang = i18n.language?.split('-')[0] || 'it'

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedArticle) {
          setSelectedArticle(null)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, selectedArticle])

  // Reset selected article when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setSelectedArticle(null), 300)
    }
  }, [isOpen])

  const projects = t('portfolio.projects', { returnObjects: true }) as any[]
  const services = t('services_modal.items', { returnObjects: true }) as any[]
  const blogArticles = t('menu.blog_articles', { returnObjects: true }) as any[]

  const handleProjectClick = () => {
    onClose()
    onOpenPortfolio()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="menu-backdrop-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding Side Drawer */}
          <motion.div
            className="side-menu-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          >
            {/* Header Area */}
            <div className="drawer-header">
              <div className="pulse-badge">
                <span className="pulse-dot"></span>
                <span className="pulse-text">{t('menu.status_available')}</span>
              </div>
              <button 
                className="close-drawer-btn" 
                onClick={selectedArticle ? () => setSelectedArticle(null) : onClose} 
                aria-label={t('menu.close')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Container with AnimatePresence for Blog transitions */}
            <div className="drawer-body">
              <AnimatePresence mode="wait">
                {!selectedArticle ? (
                  <motion.div
                    key="main-menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="drawer-scroll-content"
                  >
                    <h2 className="drawer-nav-title">{t('menu.title')}</h2>

                    {/* Language Switcher */}
                    <div className="menu-block">
                      <h3 className="block-title">
                        <Globe size={18} className="block-icon" />
                        {currentLang === 'it' ? 'Lingua' : currentLang === 'fr' ? 'Langue' : 'Language'}
                      </h3>
                      <div className="menu-language-switcher">
                        <button 
                          onClick={() => changeLanguage('it')} 
                          className={currentLang === 'it' ? 'active' : ''}
                        >
                          🇮🇹 <span className="lang-text">IT</span>
                        </button>
                        <button 
                          onClick={() => changeLanguage('en')} 
                          className={currentLang === 'en' ? 'active' : ''}
                        >
                          🇺🇸 <span className="lang-text">EN</span>
                        </button>
                        <button 
                          onClick={() => changeLanguage('fr')} 
                          className={currentLang === 'fr' ? 'active' : ''}
                        >
                          🇫🇷 <span className="lang-text">FR</span>
                        </button>
                      </div>
                    </div>

                    {/* Chi Sono (About Me) Block */}
                    <div className="menu-block">
                      <h3 className="block-title">
                        <User size={18} className="block-icon" />
                        {t('menu.chi_sono_title')}
                      </h3>
                      <div className="chi-sono-card">
                        <div className="profile-banner">
                          <div className="avatar-placeholder">FL</div>
                          <div>
                            <h4 className="profile-name">Fabrice Logon</h4>
                            <span className="profile-subtitle">{t('menu.chi_sono_subtitle')}</span>
                          </div>
                        </div>
                        <p className="profile-description">{t('menu.chi_sono_desc')}</p>
                        <div className="profile-meta">
                          <div className="meta-item"><MapPin size={12} /> {t('menu.chi_sono_location')}</div>
                          <div className="meta-item"><Mail size={12} /> fabrice.logon@testsitelab.it</div>
                        </div>
                        <button 
                          className="chi-sono-contact-btn" 
                          onClick={onOpenContact}
                          style={{ marginTop: '1.2rem', width: '100%', padding: '0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '14px', color: 'white', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' }}
                        >
                          <Mail size={12} />
                          {t('contact_form.submit_button')}
                        </button>
                      </div>
                    </div>

                    {/* Servizi (Services) Block */}
                    <div className="menu-block">
                      <h3 className="block-title">
                        <DollarSign size={18} className="block-icon" />
                        {t('menu.servizi_title')}
                      </h3>
                      <p className="block-intro">{t('menu.servizi_desc')}</p>
                      <div className="services-mini-list">
                        {Array.isArray(services) && services.slice(0, 3).map((service: any, i: number) => (
                          <div 
                            key={i} 
                            className={`service-mini-item ${service.popular ? 'highlight' : ''}`}
                            onClick={onOpenServices}
                          >
                            <div className="service-info">
                              <span className="service-name">{service.title}</span>
                              {service.discount && <span className="discount-tag">{service.discount}</span>}
                            </div>
                            <span className="service-price">{service.price}</span>
                          </div>
                        ))}
                      </div>
                      <button className="block-link-btn" onClick={onOpenServices}>
                        <span>{t('menu.servizi_cta')}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Portfolio Block */}
                    <div className="menu-block">
                      <h3 className="block-title">
                        <FolderGit2 size={18} className="block-icon" />
                        {t('menu.portfolio_title')}
                      </h3>
                      <p className="block-intro">{t('menu.portfolio_desc')}</p>
                      <div className="portfolio-mini-list">
                        {Array.isArray(projects) && projects.map((project: any, i: number) => (
                          <div 
                            key={i} 
                            className="portfolio-mini-item"
                            onClick={handleProjectClick}
                          >
                            <div>
                              <span className="project-category">{project.category}</span>
                              <h4 className="project-name">{project.title}</h4>
                            </div>
                            <ArrowRight size={14} className="arrow" />
                          </div>
                        ))}
                      </div>
                      <button className="block-link-btn" onClick={handleProjectClick}>
                        <span>{t('menu.scroll_to_portfolio')}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Blog Block */}
                    <div className="menu-block">
                      <h3 className="block-title">
                        <Rss size={18} className="block-icon" />
                        {t('menu.blog_title')}
                      </h3>
                      <p className="block-intro">{t('menu.blog_desc')}</p>
                      <div className="blog-mini-list">
                        {Array.isArray(blogArticles) && blogArticles.map((article: any, i: number) => (
                          <div 
                            key={i} 
                            className="blog-mini-card"
                            onClick={() => setSelectedArticle(article)}
                          >
                            <div className="blog-card-header">
                              <span className="blog-tag">{article.tag}</span>
                              <span className="blog-time">{article.readTime}</span>
                            </div>
                            <h4 className="blog-card-title">{article.title}</h4>
                            <p className="blog-card-intro">{article.intro}</p>
                            <span className="blog-card-cta">
                              {t('menu.blog_read_more')}
                              <ArrowRight size={12} style={{ marginLeft: '4px' }} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Deep-read Article Overlay
                  <motion.div
                    key="blog-article"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="drawer-article-view"
                  >
                    <button 
                      className="back-to-menu-btn" 
                      onClick={() => setSelectedArticle(null)}
                    >
                      <ArrowRight size={14} style={{ transform: 'rotate(180deg)', marginRight: '6px' }} />
                      {t('menu.blog_close')}
                    </button>
                    
                    <div className="article-hero">
                      <span className="article-tag">{selectedArticle.tag}</span>
                      <h2 className="article-title">{selectedArticle.title}</h2>
                      <div className="article-meta">
                        <span>{selectedArticle.date}</span>
                        <span className="separator">•</span>
                        <span>{selectedArticle.readTime}</span>
                      </div>
                    </div>

                    <div className="article-body">
                      {selectedArticle.content.split('\n\n').map((paragraph: string, idx: number) => {
                        // Check if paragraph is list
                        if (paragraph.startsWith('1.')) {
                          return (
                            <ol key={idx} className="article-list">
                              {paragraph.split('\n').map((li, lidx) => (
                                <li key={lidx}>{li.replace(/^\d+\.\s+\*\*(.*?)\*\*:\s*/, '$1: ')}</li>
                              ))}
                            </ol>
                          )
                        }
                        
                        // Parse bold markdown manually **text**
                        const boldRegex = /\*\*(.*?)\*\*/g
                        let htmlContent = paragraph
                        let match
                        while ((match = boldRegex.exec(paragraph)) !== null) {
                          htmlContent = htmlContent.replace(match[0], `<strong>${match[1]}</strong>`)
                        }
                        
                        return (
                          <p 
                            key={idx} 
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                          />
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
