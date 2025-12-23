import { apiFetch } from './api'

export async function fetchVideos() {
  return apiFetch('/api/videos')
}
