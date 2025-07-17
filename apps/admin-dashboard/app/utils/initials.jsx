export const getInitials = (name) => {
  if (!name) return ''
  const parts = name.trim().split(' ')
  const initials = parts.map(p => p.charAt(0).toUpperCase()).join('')
  return initials.slice(0, 2)
}