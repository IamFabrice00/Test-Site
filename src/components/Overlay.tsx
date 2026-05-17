import { Mail, MapPin, MessageCircle, Code, Layout, Wind, Cpu, Atom, Terminal, Palette, Gauge, CheckCircle2, Loader2, Database } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LegalModal from './LegalModal'
import CookieBanner from './CookieBanner'
import ServicesModal from './ServicesModal'
import MonitorModal from './MonitorModal'


export default function Overlay() {
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [legalType, setLegalType] = useState<'privacy' | 'cookie' | 'terms' | null>(null)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMonitorOpen, setIsMonitorOpen] = useState(false)
  
  const currentLang = i18n.language?.split('-')[0] || 'it'

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language: currentLang, site_name: 'Test Site Lab' }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Newsletter Error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
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
          <div className="language-switcher">
            <button 
              onClick={() => changeLanguage('it')} 
              className={currentLang === 'it' ? 'active' : ''}
              title="Italiano"
            >
              🇮🇹 IT
            </button>
            <button 
              onClick={() => changeLanguage('en')} 
              className={currentLang === 'en' ? 'active' : ''}
              title="English"
            >
              🇺🇸 EN
            </button>
            <button 
              onClick={() => changeLanguage('fr')} 
              className={currentLang === 'fr' ? 'active' : ''}
              title="Français"
            >
              🇫🇷 FR
            </button>
          </div>
          <div className="badge">{t('header.badge')}</div>
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
            <div className="contact-item">
              <label>{t('contact.consultancy')}</label>
              <span style={{fontWeight: 800, color: '#f43f5e'}}>{t('contact.free')}</span>
            </div>
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
                    >
                      <div className="stack-icon">{item.icon}</div>
                      <div className="stack-name">{item.name}</div>
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

        {/* Portfolio Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <div>
              <div className="badge">{t('portfolio.badge')}</div>
              <h2>{t('portfolio.title')}</h2>
            </div>
            <p className="section-description">{t('portfolio.description')}</p>
          </div>
          <div className="portfolio-grid">
            {(t('portfolio.projects', { returnObjects: true }) as any[]).map((project: any, i: number) => (
              <motion.a 
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card"
                whileHover={{ scale: 1.02 }}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="portfolio-content">
                  <div className="portfolio-category">{project.category}</div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
              </motion.a>
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

        {/* Newsletter Section */}
        <motion.section 
          className="newsletter-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="newsletter-feedback"
              >
                <CheckCircle2 size={64} color="#10b981" />
                <h2>{t('newsletter.success_title')}</h2>
                <p>{t('newsletter.success_desc')}</p>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
              >
                <div>
                  <div className="badge">{t('newsletter.badge')}</div>
                  <h2>{t('newsletter.title')}</h2>
                  <p>{t('newsletter.description')}</p>
                </div>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input 
                    type="email" 
                    placeholder={t('newsletter.placeholder')} 
                    className="newsletter-input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                  <button 
                    className="btn-primary" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : t('newsletter.button')}
                  </button>
                </form>
                {status === 'error' && (
                  <p style={{ color: '#f43f5e', fontSize: '0.875rem' }}>{t('newsletter.error')}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
      />
      <MonitorModal 
        isOpen={isMonitorOpen} 
        onClose={() => setIsMonitorOpen(false)} 
      />
      <CookieBanner />
    </div>
  )
}
