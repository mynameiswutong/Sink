const TOKEN_KEY = 'SinkSiteToken'

export function useAuthToken() {
  function getToken() {
    if (import.meta.client) {
      // Check if token exists and is not expired
      const item = localStorage.getItem(TOKEN_KEY)
      if (item) {
        const payload = JSON.parse(item)
        if (Date.now() < payload.expiresAt) {
          return payload.token
        }
        // Token expired, remove it
        removeToken()
      }
    }
    return null
  }

  function setToken(token: string, expiresIn: number) {
    // Set token with expiration time
    // expiresIn is in seconds
    if (expiresIn <= 0) {
      expiresIn = 24 * 60 * 60 // 1 day
    }
    const payload = {
      token,
      expiresAt: Date.now() + expiresIn * 1000,
    }
    localStorage.setItem(TOKEN_KEY, JSON.stringify(payload))
  }

  function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  }

  return { getToken, setToken, removeToken }
}
