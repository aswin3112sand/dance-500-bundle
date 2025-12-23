import { apiFetch } from './api'

export async function createOrder(bundleId) {
  return apiFetch('/api/payments/create-order', {
    method: 'POST',
    body: JSON.stringify({ bundleId })
  })
}

export async function verifyPayment(payload) {
  return apiFetch('/api/payments/verify', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
