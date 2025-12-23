import { apiFetch } from './api'

export async function login(payload) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function register(payload) {
  return apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function logout() {
  return apiFetch('/api/auth/logout', {
    method: 'POST'
  })
}

export async function fetchMe() {
  return apiFetch('/api/auth/me')
}
