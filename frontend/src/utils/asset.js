import { API_BASE } from '../services/api'

export function resolveAssetUrl(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${API_BASE}${url}`
}
