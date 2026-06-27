import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merges Tailwind classes without conflicts
// Usage: className={cn('px-4', isActive && 'bg-emerald-500')}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a number as Nigerian Naira or other currency
// Usage: formatCurrency(47200) → "₦47,200"
export function formatCurrency(
  amount: number,
  currency: 'NGN' | 'USD' | 'GBP' = 'NGN'
) {
  const symbols: Record<string, string> = {
    NGN: '₦',
    USD: '$',
    GBP: '£'
  }
  return `${symbols[currency]}${amount.toLocaleString()}`
}

// Formats a date string for Nigerian locale
// Usage: formatDate('2024-01-15') → "Jan 15, 2024"
export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
}

// Returns a short frequency label
// Usage: getFrequencyLabel('monthly') → "/mo"
export function getFrequencyLabel(freq: string) {
  const labels: Record<string, string> = {
    monthly: '/mo',
    quarterly: '/qtr',
    annual: '/yr',
  }
  return labels[freq] || ''
}