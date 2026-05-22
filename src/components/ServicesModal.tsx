import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface ServicesModalProps {
  isOpen: boolean
  onClose: () => void
  onChoosePackage: (pkg: string) => void
}

export default function ServicesModal({ isOpen, onClose, onChoosePackage }: ServicesModalProps) {
  const { t } = useTranslation()
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'monthly'>('one-time')

  const getPackagePrice = (index: number) => {
    if (billingCycle === 'one-time') {
      if (index === 0) return { price: '149€', original: '299€', note: t('services_modal.one_time_note') || 'una tantum' }
      if (index === 1) return { price: '239€', original: '399€', note: t('services_modal.one_time_note') || 'una tantum' }
      if (index === 2) return { price: '419€', original: '599€', note: t('services_modal.one_time_note') || 'una tantum' }
    } else {
      // 6 rate mensili
      if (index === 0) return { price: '25€', original: '50€', note: t('services_modal.monthly_note') || '/ mese' }
      if (index === 1) return { price: '40€', original: '67€', note: t('services_modal.monthly_note') || '/ mese' }
      if (index === 2) return { price: '70€', original: '100€', note: t('services_modal.monthly_note') || '/ mese' }
    }
    return { price: '', original: '', note: '' }
  }

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
              <div className="modal-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t('services_modal.title')}</h2>
                
                {/* Segmented Billing Switch */}
                <div className="billing-toggle-container">
                  <button 
                    className={`billing-toggle-btn ${billingCycle === 'one-time' ? 'active' : ''}`}
                    onClick={() => setBillingCycle('one-time')}
                  >
                    {t('services_modal.one_time_label')}
                  </button>
                  <button 
                    className={`billing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    {t('services_modal.monthly_label')}
                  </button>
                </div>
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
                    
                    {(() => {
                      const currentPrice = getPackagePrice(i)
                      return (
                        <>
                          <div className="pricing-price-container">
                            <span className="pricing-original">{currentPrice.original}</span>
                            <span className="pricing-discount">{service.discount}</span>
                          </div>
                          <div className="pricing-price">
                            {currentPrice.price}
                            <span className="pricing-note">{currentPrice.note}</span>
                          </div>
                        </>
                      )
                    })()}
                    
                    <ul className="pricing-features">
                      {service.features?.map((feature: string, j: number) => (
                        <li key={j}>
                          <CheckCircle2 size={18} color={service.popular ? "#a855f7" : "#6366f1"} style={{ flexShrink: 0 }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      className="btn-primary" 
                      style={{ marginTop: 'auto', padding: '1rem', width: '100%', fontSize: '1rem', cursor: 'pointer' }}
                      onClick={() => {
                        const packageKeys = ['package_base', 'package_normal', 'package_premium']
                        onChoosePackage(packageKeys[i] || 'info')
                      }}
                    >
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
