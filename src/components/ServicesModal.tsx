import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ServicesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="legal-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="legal-modal-content services-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '1100px', width: '95vw' }}
          >
            <button className="close-btn" onClick={onClose} aria-label="Chiudi">
              <X size={20} />
            </button>
            <div className="modal-inner">
              <div className="modal-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '3rem' }}>{t('services_modal.title')}</h2>
              </div>
              <div className="pricing-grid">
                {(t('services_modal.items', { returnObjects: true }) as any[]).map((service: any, i: number) => (
                  <motion.div 
                    key={i} 
                    className={`pricing-card ${service.popular ? 'popular' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    {service.popular && (
                      <div className="popular-badge">{service.popular_text}</div>
                    )}
                    <h3 className="pricing-title">{service.title}</h3>
                    
                    <div className="pricing-price-container">
                      <span className="pricing-original">{service.original_price}</span>
                      <span className="pricing-discount">{service.discount}</span>
                    </div>
                    <div className="pricing-price">{service.price}</div>
                    
                    <ul className="pricing-features">
                      {service.features?.map((feature: string, j: number) => (
                        <li key={j}>
                          <CheckCircle2 size={18} color={service.popular ? "#a855f7" : "#6366f1"} style={{ flexShrink: 0 }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="btn-primary" style={{ marginTop: 'auto', padding: '1rem', width: '100%', fontSize: '1rem' }}>
                      {service.cta || (service.popular ? 'Inizia Ora' : 'Scegli')}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
