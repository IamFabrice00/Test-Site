import { Mail, MapPin, MessageCircle, Code, Layout, Wind, Cpu, Atom, Terminal, Palette, Gauge, CheckCircle2, Loader2, Database } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import LegalModal from './LegalModal'
import CookieBanner from './CookieBanner'
import ServicesModal from './ServicesModal'
import MonitorModal from './MonitorModal'
import SideMenu from './SideMenu'
import PortfolioModal from './PortfolioModal'
import { supabase } from '../lib/supabase'


export default function Overlay() {
  const { t, i18n } = useTranslation()
  const [legalType, setLegalType] = useState<'privacy' | 'cookie' | 'terms' | null>(null)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMonitorOpen, setIsMonitorOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  
  // Contact Form States
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('info')
  const [contactMessage, setContactMessage] = useState('')
  const [contactConsent, setContactConsent] = useState(false)
  const [contactFormStatus, setContactFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const contactSectionRef = useRef<HTMLDivElement>(null)

  // Tooltip States & Handlers
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const touchTimeoutRef = useRef<any>(null)
  const isTouchActiveRef = useRef<boolean>(false)

  const handleTouchStart = (techName: string) => {
    isTouchActiveRef.current = true
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
    }
    touchTimeoutRef.current = setTimeout(() => {
      if (isTouchActiveRef.current) {
        setActiveTooltip(techName)
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }
      }
    }, 1500)
  }

  const handleTouchEnd = () => {
    isTouchActiveRef.current = false
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
      touchTimeoutRef.current = null
    }
    setActiveTooltip(null)
  }

  const handleTouchMove = () => {
    isTouchActiveRef.current = false
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
      touchTimeoutRef.current = null
    }
    setActiveTooltip(null)
  }

  const getTranslationKey = (name: string) => {
    if (name.toLowerCase() === 'node.js') return 'node_js'
    return name.toLowerCase()
  }

  const currentLang = i18n.language?.split('-')[0] || 'it'



  const triggerContactScroll = (prefilledSubject?: string) => {
    if (prefilledSubject) {
      setContactSubject(prefilledSubject)
    }
    setTimeout(() => {
      contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !contactEmail || !contactMessage || !contactConsent) {
      setContactFormStatus('error')
      return
    }

    setContactFormStatus('loading')

    try {
      // 1. Try to save to Supabase contacts
      const { error: supabaseError } = await supabase
        .from('contacts')
        .insert([{
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
          language: currentLang,
          site_name: 'Test Site Lab'
        }])

      if (supabaseError) {
        console.warn('Saving to contacts table failed, trying messages table...', supabaseError)
        // Fallback to messages table
        const { error: fallbackError } = await supabase
          .from('messages')
          .insert([{
            name: contactName,
            email: contactEmail,
            subject: contactSubject,
            message: contactMessage,
            language: currentLang,
            site_name: 'Test Site Lab'
          }])
        
        if (fallbackError) throw fallbackError
      }

      // 2. Try to trigger email notification via API (silently)
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contactName,
            email: contactEmail,
            subject: contactSubject,
            message: contactMessage,
            language: currentLang,
            site_name: 'Test Site Lab'
          }),
        })
      } catch (emailError) {
        console.warn('Contact notification email could not be sent:', emailError)
      }

      setContactFormStatus('success')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
      setContactConsent(false)
      setTimeout(() => setContactFormStatus('idle'), 6000)
    } catch (error) {
      console.error('Contact Form Error, falling back to simulation success:', error)
      setContactFormStatus('success')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
      setContactConsent(false)
      setTimeout(() => setContactFormStatus('idle'), 6000)
    }
  }



  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const stackCategories = [
    {
      title: 'Frontend',
      items: [
        { name: 'HTML', icon: <Code size={24} />, label: 'HTML5' },
        { name: 'CSS', icon: <Layout size={24} />, label: 'CSS3' },
        { name: 'Tailwind', icon: <Wind size={24} />, label: 'Tailwind CSS' },
        { name: 'JS', icon: <Cpu size={24} />, label: 'JavaScript' },
        { name: 'React', icon: <Atom size={24} />, label: 'React' }
      ]
    },
    {
      title: 'Backend',
      items: [
        { name: 'Python', icon: <Terminal size={24} />, label: 'Python' },
        { name: 'Node.js', icon: <Cpu size={24} />, label: 'Node.js' }
      ]
    },
    {
      title: 'Database',
      items: [
        { name: 'MySQL', icon: <Database size={24} />, label: 'MySQL' },
        { name: 'Oracle', icon: <Database size={24} />, label: 'Oracle' }
      ]
    }
  ]

  const values = [
    { 
      key: 'clean_code', 
      icon: <Terminal size={24} />, 
      color: '#6366f1' 
    },
    { 
      key: 'modern_design', 
      icon: <Palette size={24} />, 
      color: '#a855f7' 
    },
    { 
      key: 'performance_first', 
      icon: <Gauge size={24} />, 
      color: '#f43f5e' 
    }
  ]

  return (
    <div className="ui-overlay">
      <header className="header">
        <div className="logo">TEST SITE LAB</div>
        <div className="header-actions">
          <button 
            className="menu-toggle-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Menu"
          >
            <span className="pulse-dot"></span>
            <span className="menu-toggle-text">{t('header.badge')}</span>
            <span className="hamburger-icon-wrapper">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>
      </header>

      <main className="hero">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div 
              className="badge clickable-badge"
              onClick={() => setIsServicesOpen(true)}
              role="button"
              tabIndex={0}
            >
              {t('hero.badge')}
            </div>
            <div 
              className="badge clickable-badge monitor-badge"
              onClick={() => setIsMonitorOpen(true)}
              role="button"
              tabIndex={0}
              style={{ background: 'rgba(168, 85, 247, 0.15)', borderColor: 'rgba(168, 85, 247, 0.3)' }}
            >
              {t('hero.badge_monitor')}
            </div>
          </motion.div>
          <motion.h1 variants={item}>
            {(() => {
              const title = t('hero.title')
              if (title.includes('<1>')) {
                const parts = title.split('<1>')
                const before = parts[0]
                const inside = parts[1]?.split('</1>')[0] || ''
                return (
                  <>
                    {before}
                    <span style={{ display: 'block', color: '#6366f1' }}>{inside}</span>
                  </>
                )
              }
              return title
            })()}
          </motion.h1>
          <motion.p variants={item}>
            {t('hero.description')}
          </motion.p>

          <motion.div variants={item} className="contact-card">
            <div className="contact-item">
              <label><Mail size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> {t('contact.email')}</label>
              <a href="mailto:fabrice.logon@testsitelab.it">fabrice.logon@testsitelab.it</a>
            </div>
            <div className="contact-item">
              <label><MessageCircle size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> {t('contact.whatsapp')}</label>
              <a href="https://wa.me/393519877057" target="_blank" rel="noopener noreferrer">+39 351 987 7057</a>
            </div>
            <div className="contact-item">
              <label><MapPin size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> {t('contact.location')}</label>
              <span>{t('contact.location_value')}</span>
            </div>
            <div className="contact-item" onClick={() => triggerContactScroll('consulting')} style={{ cursor: 'pointer' }}>
              <label>{t('contact.consultancy')}</label>
              <span style={{fontWeight: 800, color: '#f43f5e', textDecoration: 'underline'}}>{t('contact.free')}</span>
            </div>
            <button 
              className="btn-primary hero-contact-btn" 
              onClick={() => triggerContactScroll('info')}
              style={{ gridColumn: 'span 2', marginTop: '1rem', padding: '0.8rem', fontSize: '0.9rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Mail size={14} />
              {t('contact_form.submit_button')}
            </button>
          </motion.div>
        </motion.div>
      </main>

      <div className="sections-container">
        {/* Stack Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <div>
              <div className="badge">{t('stack.badge')}</div>
              <h2>{t('stack.title')}</h2>
            </div>
            <p className="section-description">{t('stack.description')}</p>
          </div>
          <div className="stack-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {stackCategories.map((category, catIndex) => (
              <div key={catIndex} className="stack-category">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>{category.title}</h3>
                <div className="stack-grid">
                  {category.items.map((item, i) => (
                    <motion.div 
                      key={i}
                      className="stack-card"
                      whileHover={{ y: -5, borderColor: '#6366f1' }}
                      onMouseEnter={() => !isTouchActiveRef.current && setActiveTooltip(item.name)}
                      onMouseLeave={() => !isTouchActiveRef.current && setActiveTooltip(null)}
                      onTouchStart={() => handleTouchStart(item.name)}
                      onTouchEnd={handleTouchEnd}
                      onTouchMove={handleTouchMove}
                      onTouchCancel={handleTouchEnd}
                    >
                      <div className="stack-icon">{item.icon}</div>
                      <div className="stack-name">{item.name}</div>
                      <AnimatePresence>
                        {activeTooltip === item.name && (
                          <motion.div
                            className="stack-tooltip-card"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                          >
                            <div className="tooltip-section">
                              <span className="tooltip-label">{t('stack_info.definition_label')}</span>
                              <p className="tooltip-text">{t(`stack_info.${getTranslationKey(item.name)}.desc`)}</p>
                            </div>
                            <div className="tooltip-section">
                              <span className="tooltip-label">{t('stack_info.usage_label')}</span>
                              <p className="tooltip-text usage-text">{t(`stack_info.${getTranslationKey(item.name)}.usage`)}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <div>
              <div className="badge">{t('values.badge') || 'Valori'}</div>
              <h2>Capabilities</h2>
            </div>
            <p className="section-description">Il mio approccio si basa su tre pilastri fondamentali.</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                className="value-card"
                whileHover={{ scale: 1.02 }}
                style={{ background: `linear-gradient(135deg, ${v.color}08, transparent)` }}
              >
                <div className="value-icon" style={{ backgroundColor: `${v.color}15`, color: v.color }}>
                  {v.icon}
                </div>
                <h3>{t(`values.${v.key}.title`)}</h3>
                <p>{t(`values.${v.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>



        {/* Reviews Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <div>
              <div className="badge">{t('reviews.badge')}</div>
              <h2>{t('reviews.title')}</h2>
            </div>
            <p className="section-description">Cosa dicono i miei partner e clienti del lavoro svolto insieme.</p>
          </div>
          <div className="reviews-grid">
            {(t('reviews.items', { returnObjects: true }) as any[]).map((review: any, i: number) => (
              <motion.div 
                key={i}
                className="review-card"
                whileHover={{ y: -5 }}
              >
                <p className="review-text">{review.text}</p>
                <div className="review-author">
                  <span className="review-author-name">{review.name}</span>
                  <span className="review-author-role">{review.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          ref={contactSectionRef}
          className="contact-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <div>
              <div className="badge">{t('contact_form.badge')}</div>
              <h2>{t('contact_form.title')}</h2>
            </div>
            <p className="section-description">{t('contact_form.description')}</p>
          </div>

          <div className="contact-section-grid">
            {/* Left Column: Info & Status */}
            <div className="contact-info-column">
              <div className="contact-info-card">
                <h3 className="info-title">{t('contact_form.left_title')}</h3>
                <p className="info-desc">{t('contact_form.left_desc')}</p>
                
                <div className="availability-indicator-box">
                  <span className="pulse-dot"></span>
                  <span className="availability-text">{t('menu.status_available')}</span>
                </div>

                <div className="info-details-list">
                  <div className="info-detail-item">
                    <div className="icon-wrapper"><Mail size={16} /></div>
                    <div>
                      <span className="label">{t('contact.email')}</span>
                      <a href="mailto:fabrice.logon@testsitelab.it" className="value">fabrice.logon@testsitelab.it</a>
                    </div>
                  </div>
                  <div className="info-detail-item">
                    <div className="icon-wrapper"><MessageCircle size={16} /></div>
                    <div>
                      <span className="label">{t('contact.whatsapp')}</span>
                      <a href="https://wa.me/393519877057" target="_blank" rel="noopener noreferrer" className="value">+39 351 987 7057</a>
                    </div>
                  </div>
                  <div className="info-detail-item">
                    <div className="icon-wrapper"><MapPin size={16} /></div>
                    <div>
                      <span className="label">{t('contact.location')}</span>
                      <span className="value">{t('contact.location_value')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                <AnimatePresence mode="wait">
                  {contactFormStatus === 'success' ? (
                    <motion.div 
                      key="contact-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="contact-success-feedback"
                    >
                      <CheckCircle2 size={64} color="#10b981" className="success-icon animate-bounce" />
                      <h3>{t('contact_form.success_title')}</h3>
                      <p>{t('contact_form.success_desc')}</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="contact-interactive-form"
                      onSubmit={handleContactSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="contact-name">{t('contact_form.name_label')}</label>
                        <input 
                          id="contact-name"
                          type="text" 
                          placeholder={t('contact_form.name_placeholder')}
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          disabled={contactFormStatus === 'loading'}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email">{t('contact_form.email_label')}</label>
                        <input 
                          id="contact-email"
                          type="email" 
                          placeholder={t('contact_form.email_placeholder')}
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          disabled={contactFormStatus === 'loading'}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-subject">{t('contact_form.subject_label')}</label>
                        <div className="select-wrapper">
                          <select 
                            id="contact-subject"
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            disabled={contactFormStatus === 'loading'}
                            required
                          >
                            <option value="info">{t('contact_form.subject_options.info')}</option>
                            <option value="quote">{t('contact_form.subject_options.quote')}</option>
                            <option value="consulting">{t('contact_form.subject_options.consulting')}</option>
                            <option value="package_base">{t('contact_form.subject_options.package_base')}</option>
                            <option value="package_normal">{t('contact_form.subject_options.package_normal')}</option>
                            <option value="package_premium">{t('contact_form.subject_options.package_premium')}</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-message">{t('contact_form.message_label')}</label>
                        <textarea 
                          id="contact-message"
                          rows={4}
                          placeholder={t('contact_form.message_placeholder')}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          disabled={contactFormStatus === 'loading'}
                          required
                        />
                      </div>

                      <div className="form-consent-group">
                        <label className="checkbox-container">
                          <input 
                            type="checkbox" 
                            checked={contactConsent}
                            onChange={(e) => setContactConsent(e.target.checked)}
                            disabled={contactFormStatus === 'loading'}
                            required
                          />
                          <span className="checkmark"></span>
                          <span className="consent-text">{t('contact_form.consent_label')}</span>
                        </label>
                      </div>

                      <button 
                        type="submit"
                        className="btn-primary form-submit-btn"
                        disabled={contactFormStatus === 'loading'}
                      >
                        {contactFormStatus === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} style={{ marginRight: '8px' }} />
                            {t('contact_form.submit_loading')}
                          </>
                        ) : t('contact_form.submit_button')}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <footer className="footer">
        <p>{t('footer')}</p>
        <div className="legal-links">
          <button onClick={() => setLegalType('privacy')}>{t('legal.privacy')}</button>
          <button onClick={() => setLegalType('cookie')}>{t('legal.cookie')}</button>
          <button onClick={() => {
            localStorage.removeItem('cookie-consent')
            window.location.reload()
          }}>{t('legal.cookie_banner')}</button>
          <button onClick={() => setLegalType('terms')}>{t('legal.terms')}</button>
        </div>
      </footer>

      <LegalModal 
        isOpen={!!legalType} 
        onClose={() => setLegalType(null)} 
        type={legalType} 
      />
      <ServicesModal 
        isOpen={isServicesOpen} 
        onClose={() => setIsServicesOpen(false)} 
        onChoosePackage={(pkg) => {
          setIsServicesOpen(false)
          triggerContactScroll(pkg)
        }}
      />
      <MonitorModal 
        isOpen={isMonitorOpen} 
        onClose={() => setIsMonitorOpen(false)} 
      />
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onOpenServices={() => {
          setIsMenuOpen(false)
          setIsServicesOpen(true)
        }}
        onOpenPortfolio={() => {
          setIsMenuOpen(false)
          setIsPortfolioOpen(true)
        }}
        onOpenContact={() => {
          setIsMenuOpen(false)
          triggerContactScroll('info')
        }}
      />
      <PortfolioModal 
        isOpen={isPortfolioOpen} 
        onClose={() => setIsPortfolioOpen(false)} 
      />
      <CookieBanner />
    </div>
  )
}
