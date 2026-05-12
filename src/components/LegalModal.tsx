import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'privacy' | 'cookie' | 'terms' | null
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { t } = useTranslation()

  if (!type) return null

  const titleKey = `legal.${type}`
  const contentKey = `legal.${type}_content`

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
            className="legal-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose} aria-label={t('legal.close')}>
              <X size={20} />
            </button>
            <div className="modal-inner">
              <div className="modal-header">
                <h2>{t(titleKey)}</h2>
                <p className="last-update">{t('legal.last_update')}</p>
              </div>
              <div className="modal-body">
                {t(contentKey).split('\n').map((line, i) => (
                  <p key={i} style={{ marginBottom: line ? '1rem' : '0.5rem' }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
