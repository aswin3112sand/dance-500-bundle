const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  if (!response.ok) {
    let message = 'Request failed'
    try {
      const data = await response.json()
      message = data.message || message
    } catch (err) {
      // ignore parse errors
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export { API_BASE }
