export default function validateEmail(email) {
  // simple RFC-2822 regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}