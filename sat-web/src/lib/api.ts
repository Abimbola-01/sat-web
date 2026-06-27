import axios from 'axios'

// Create a reusable axios instance pointed at your backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  timeout: 30000, // 30 seconds before giving up
})

// Automatically handle errors globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

// ── Audit endpoints ──────────────────────────────────────
export const auditApi = {
  // Upload a bank statement PDF/CSV
  uploadStatement: (formData: FormData, token: string) =>
    api.post('/audit/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    }),

  // Get a single audit result by ID
  getAudit: (auditId: string, token: string) =>
    api.get(`/audit/${auditId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Get all audits for the logged-in user
  getUserAudits: (token: string) =>
    api.get('/audit', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Download a PDF report
  downloadReport: (reportId: string, token: string) =>
    api.get(`/report/${reportId}/download`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // tells axios to expect a file
    }),
}

// ── Payment endpoints ────────────────────────────────────
export const paymentApi = {
  // Start a Paystack payment (Nigeria)
  initializePaystack: (planId: string, token: string) =>
    api.post('/payment/paystack/initialize', { planId }, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Start a Stripe payment (International)
  initializeStripe: (planId: string, token: string) =>
    api.post('/payment/stripe/initialize', { planId }, {
      headers: { Authorization: `Bearer ${token}` },
    }),
}

export default api