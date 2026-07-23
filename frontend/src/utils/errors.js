export function getApiErrorMessage(err, fallback = 'Something went wrong') {
  if (!err) return fallback

  if (typeof err === 'string') return err

  if (typeof err?.detail === 'string') return err.detail

  if (Array.isArray(err?.detail)) {
    return err.detail.map((d) => d?.msg || 'Invalid input').join(', ')
  }

  return fallback
}
