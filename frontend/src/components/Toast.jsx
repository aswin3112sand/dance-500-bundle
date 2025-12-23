import { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  return (
    <div className="toast-root" role="status" aria-live="polite">
      <div className={`toast toast-${type}`}>
        <span>{message}</span>
        <button type="button" aria-label="Close notification" onClick={onClose}>x</button>
      </div>
    </div>
  )
}
