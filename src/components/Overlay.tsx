import { Mail, MapPin, ExternalLink, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Overlay() {
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

  return (
    <div className="ui-overlay">
      <header className="header">
        <div className="logo">TEST SITE LAB</div>
        <div className="badge">Disponibile per nuovi progetti</div>
      </header>

      <main className="hero">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="badge">Web Design & Sviluppo</motion.div>
          <motion.h1 variants={item}>
            Realizzo Esperienze <br />
            <span style={{color: '#6366f1'}}>Digitali Future.</span>
          </motion.h1>
          <motion.p variants={item}>
            Trasformo le tue idee in siti web ad alte prestazioni, SEO friendly e dal design premium. 
            Basato a Milano, pronto a scalare il tuo business.
          </motion.p>

          <motion.div variants={item} className="contact-card">
            <div className="contact-item">
              <label><Mail size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> Email</label>
              <a href="mailto:fabrice.logon@testsitelab.it">fabrice.logon@testsitelab.it</a>
            </div>
            <div className="contact-item">
              <label><MessageCircle size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> WhatsApp</label>
              <a href="https://wa.me/393519877057" target="_blank" rel="noopener noreferrer">+39 351 987 7057</a>
            </div>
            <div className="contact-item">
              <label><MapPin size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> Sede</label>
              <span>Milano, Italia</span>
            </div>
            <div className="contact-item">
              <label><ExternalLink size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> Consulenza</label>
              <span style={{fontWeight: 700, color: '#f43f5e'}}>GRATIS</span>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <div className="sections-container" style={{ gap: '4rem' }}>
        {/* Newsletter Section */}
        <motion.section 
          className="newsletter-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="badge">Newsletter</div>
            <h2>Rimani aggiornato.</h2>
            <p>Ricevi consigli esclusivi su design e marketing ogni settimana.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="la-tua@email.com" className="newsletter-input" />
            <button className="btn-primary" style={{ width: 'auto' }}>Iscriviti</button>
          </form>
        </motion.section>
      </div>

      <footer className="footer">
        © 2026 Test Site Lab. Creato con passione a Milano.
      </footer>
    </div>
  )
}
