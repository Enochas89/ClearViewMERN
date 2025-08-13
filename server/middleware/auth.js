export function protect(req, res, next) {
  // Placeholder auth: accept any request; attach demo user
  req.user = { id: 'u_demo', email: 'demo@clearview.local', name: 'Demo User' }
  next()
}
