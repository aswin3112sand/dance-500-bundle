import { apiFetch } from './api'

export async function fetchActiveBundle() {
  return apiFetch('/api/bundles/active')
}
