import { apiFetch } from './api'

export async function fetchAdminUsers() {
  return apiFetch('/api/admin/users')
}

export async function fetchAdminPayments() {
  return apiFetch('/api/admin/payments')
}

export async function fetchAdminVideos() {
  return apiFetch('/api/admin/videos')
}

export async function createVideo(payload) {
  return apiFetch('/api/admin/videos', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function updateVideo(id, payload) {
  return apiFetch(`/api/admin/videos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
}

export async function deleteVideo(id) {
  return apiFetch(`/api/admin/videos/${id}`, {
    method: 'DELETE'
  })
}

export async function fetchAdminBundles() {
  return apiFetch('/api/admin/bundles')
}

export async function updateBundle(id, payload) {
  return apiFetch(`/api/admin/bundles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
}

export async function uploadMedia(file) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(`${API_BASE}/api/admin/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  })
  if (!response.ok) {
    throw new Error('Upload failed')
  }
  return response.json()
}
